import { UserRole } from "@prisma/client";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/api-error";
import { getUserScope } from "../../utils/scope";

export async function buildStudentReportPdf(studentUserId: string) {
  const [records, applications, student] = await Promise.all([
    prisma.studentActivityRecord.findMany({
      where: {
        studentUserId,
        status: "COMPLETED",
      },
      orderBy: { joinStart: "asc" },
    }),
    prisma.activityApplication.findMany({
      where: {
        studentUserId,
        status: "APPROVED",
      },
      include: {
        activity: true,
      },
      orderBy: { submittedAt: "asc" },
    }),
    prisma.user.findUnique({
      where: { id: studentUserId },
      include: {
        studentProfile: {
          include: {
            faculty: true,
            department: true,
            major: true,
          },
        },
      },
    }),
  ]);

  if (!student?.studentProfile) {
    throw new ApiError(404, "404_NOT_FOUND", "Student profile not found");
  }

  const doc = new PDFDocument({ size: "A4", margin: 40 });
  const chunks: Buffer[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));

  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  doc.fontSize(18).text("Student Activity Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(11);
  doc.text(`Student: ${student.firstName} ${student.lastName}`);
  doc.text(`Student Code: ${student.studentProfile.studentCode}`);
  doc.text(`Faculty: ${student.studentProfile.faculty.name}`);
  doc.text(`Department: ${student.studentProfile.department.name}`);
  doc.text(`Major: ${student.studentProfile.major.name}`);
  doc.moveDown();

  doc.fontSize(13).text("Completed Self-recorded Activities");
  doc.moveDown(0.5);
  if (!records.length) {
    doc.fontSize(10).text("- No completed records");
  } else {
    records.forEach((record, index) => {
      doc
        .fontSize(10)
        .text(
          `${index + 1}. ${record.title} | ${record.hours} hrs | ${record.joinStart.toISOString().slice(0, 10)} - ${record.joinEnd.toISOString().slice(0, 10)}`,
        );
    });
  }

  doc.moveDown();
  doc.fontSize(13).text("Approved Organized Activities");
  doc.moveDown(0.5);
  if (!applications.length) {
    doc.fontSize(10).text("- No approved applications");
  } else {
    applications.forEach((application, index) => {
      doc
        .fontSize(10)
        .text(
          `${index + 1}. ${application.activity.title} | ${application.activity.hours} hrs | ${application.activity.startAt.toISOString().slice(0, 10)}`,
        );
    });
  }

  const totalHours =
    records.reduce((sum, item) => sum + item.hours, 0) +
    applications.reduce((sum, item) => sum + item.activity.hours, 0);

  doc.moveDown();
  doc.fontSize(12).text(`Total hours: ${totalHours}`, { align: "right" });

  doc.end();

  return done;
}

function addApplicationsSheet(
  workbook: ExcelJS.Workbook,
  data: Array<{
    studentCode: string;
    studentName: string;
    faculty: string;
    department: string;
    major: string;
    classYear: number;
    academicYear: number;
    activity: string;
    status: string;
    hours: number;
    submittedAt: Date;
  }>,
) {
  const sheet = workbook.addWorksheet("applications");
  sheet.columns = [
    { header: "Student Code", key: "studentCode", width: 20 },
    { header: "Student Name", key: "studentName", width: 28 },
    { header: "Faculty", key: "faculty", width: 22 },
    { header: "Department", key: "department", width: 25 },
    { header: "Major", key: "major", width: 22 },
    { header: "Class Year", key: "classYear", width: 12 },
    { header: "Academic Year", key: "academicYear", width: 14 },
    { header: "Activity", key: "activity", width: 30 },
    { header: "Status", key: "status", width: 16 },
    { header: "Hours", key: "hours", width: 10 },
    { header: "Submitted At", key: "submittedAt", width: 18 },
  ];

  data.forEach((row) => sheet.addRow(row));
}

function addRecordsSheet(
  workbook: ExcelJS.Workbook,
  data: Array<{
    studentCode: string;
    studentName: string;
    faculty: string;
    department: string;
    major: string;
    classYear: number;
    academicYear: number;
    title: string;
    status: string;
    hours: number;
    submittedAt: Date | null;
  }>,
) {
  const sheet = workbook.addWorksheet("records");
  sheet.columns = [
    { header: "Student Code", key: "studentCode", width: 20 },
    { header: "Student Name", key: "studentName", width: 28 },
    { header: "Faculty", key: "faculty", width: 22 },
    { header: "Department", key: "department", width: 25 },
    { header: "Major", key: "major", width: 22 },
    { header: "Class Year", key: "classYear", width: 12 },
    { header: "Academic Year", key: "academicYear", width: 14 },
    { header: "Record Title", key: "title", width: 30 },
    { header: "Status", key: "status", width: 16 },
    { header: "Hours", key: "hours", width: 10 },
    { header: "Submitted At", key: "submittedAt", width: 18 },
  ];

  data.forEach((row) => sheet.addRow(row));
}

export async function buildDepartmentReportXlsx(
  actor: { id: string; role: UserRole },
  filters: {
    year?: string;
    classYear?: string;
    major?: string;
  },
) {
  if (!["TEACHER", "DEPT_STAFF", "FACULTY_ADMIN", "SUPER_ADMIN"].includes(actor.role)) {
    throw new ApiError(403, "403_FORBIDDEN", "No permission to generate department report");
  }

  const scope = await getUserScope(actor.id, actor.role);

  const profileFilter = {
    classYear: filters.classYear ? Number(filters.classYear) : undefined,
    academicYear: filters.year ? Number(filters.year) : undefined,
    ...(filters.major ? { major: { code: filters.major } } : {}),
    ...(actor.role === "SUPER_ADMIN"
      ? {}
      : actor.role === "FACULTY_ADMIN"
        ? { facultyId: scope.facultyId! }
        : { departmentId: scope.departmentId! }),
  };

  const [applications, records] = await Promise.all([
    prisma.activityApplication.findMany({
      where: {
        student: {
          studentProfile: profileFilter,
        },
      },
      include: {
        activity: true,
        student: {
          include: {
            studentProfile: {
              include: {
                faculty: true,
                department: true,
                major: true,
              },
            },
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    }),
    prisma.studentActivityRecord.findMany({
      where: {
        student: {
          studentProfile: profileFilter,
        },
      },
      include: {
        student: {
          include: {
            studentProfile: {
              include: {
                faculty: true,
                department: true,
                major: true,
              },
            },
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    }),
  ]);

  const workbook = new ExcelJS.Workbook();

  addApplicationsSheet(
    workbook,
    applications.map((item) => ({
      studentCode: item.student.studentProfile?.studentCode || "-",
      studentName: `${item.student.firstName} ${item.student.lastName}`,
      faculty: item.student.studentProfile?.faculty.name || "-",
      department: item.student.studentProfile?.department.name || "-",
      major: item.student.studentProfile?.major.name || "-",
      classYear: item.student.studentProfile?.classYear || 0,
      academicYear: item.student.studentProfile?.academicYear || 0,
      activity: item.activity.title,
      status: item.status,
      hours: item.activity.hours,
      submittedAt: item.submittedAt,
    })),
  );

  addRecordsSheet(
    workbook,
    records.map((item) => ({
      studentCode: item.student.studentProfile?.studentCode || "-",
      studentName: `${item.student.firstName} ${item.student.lastName}`,
      faculty: item.student.studentProfile?.faculty.name || "-",
      department: item.student.studentProfile?.department.name || "-",
      major: item.student.studentProfile?.major.name || "-",
      classYear: item.student.studentProfile?.classYear || 0,
      academicYear: item.student.studentProfile?.academicYear || 0,
      title: item.title,
      status: item.status,
      hours: item.hours,
      submittedAt: item.submittedAt,
    })),
  );

  return workbook.xlsx.writeBuffer();
}

export async function buildAdminReportXlsx(filters: {
  departmentId?: string;
  majorId?: string;
  status?: string;
  activityId?: string;
  dateFrom?: string;
  dateTo?: string;
  classYear?: string;
  academicYear?: string;
}) {
  const [applications, records] = await Promise.all([
    prisma.activityApplication.findMany({
      where: {
        status: filters.status as any,
        activityId: filters.activityId,
        submittedAt:
          filters.dateFrom || filters.dateTo
            ? {
                gte: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
                lte: filters.dateTo ? new Date(filters.dateTo) : undefined,
              }
            : undefined,
        student: {
          studentProfile: {
            departmentId: filters.departmentId,
            majorId: filters.majorId,
            classYear: filters.classYear ? Number(filters.classYear) : undefined,
            academicYear: filters.academicYear ? Number(filters.academicYear) : undefined,
          },
        },
      },
      include: {
        activity: true,
        student: {
          include: {
            studentProfile: {
              include: {
                faculty: true,
                department: true,
                major: true,
              },
            },
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    }),
    prisma.studentActivityRecord.findMany({
      where: {
        status: filters.status as any,
        submittedAt:
          filters.dateFrom || filters.dateTo
            ? {
                gte: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
                lte: filters.dateTo ? new Date(filters.dateTo) : undefined,
              }
            : undefined,
        student: {
          studentProfile: {
            departmentId: filters.departmentId,
            majorId: filters.majorId,
            classYear: filters.classYear ? Number(filters.classYear) : undefined,
            academicYear: filters.academicYear ? Number(filters.academicYear) : undefined,
          },
        },
      },
      include: {
        student: {
          include: {
            studentProfile: {
              include: {
                faculty: true,
                department: true,
                major: true,
              },
            },
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    }),
  ]);

  const workbook = new ExcelJS.Workbook();

  addApplicationsSheet(
    workbook,
    applications.map((item) => ({
      studentCode: item.student.studentProfile?.studentCode || "-",
      studentName: `${item.student.firstName} ${item.student.lastName}`,
      faculty: item.student.studentProfile?.faculty.name || "-",
      department: item.student.studentProfile?.department.name || "-",
      major: item.student.studentProfile?.major.name || "-",
      classYear: item.student.studentProfile?.classYear || 0,
      academicYear: item.student.studentProfile?.academicYear || 0,
      activity: item.activity.title,
      status: item.status,
      hours: item.activity.hours,
      submittedAt: item.submittedAt,
    })),
  );

  addRecordsSheet(
    workbook,
    records.map((item) => ({
      studentCode: item.student.studentProfile?.studentCode || "-",
      studentName: `${item.student.firstName} ${item.student.lastName}`,
      faculty: item.student.studentProfile?.faculty.name || "-",
      department: item.student.studentProfile?.department.name || "-",
      major: item.student.studentProfile?.major.name || "-",
      classYear: item.student.studentProfile?.classYear || 0,
      academicYear: item.student.studentProfile?.academicYear || 0,
      title: item.title,
      status: item.status,
      hours: item.hours,
      submittedAt: item.submittedAt,
    })),
  );

  return workbook.xlsx.writeBuffer();
}
