import { PrismaClient, StaffType, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const defaultPassword = process.env.DEFAULT_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  const faculty = await prisma.faculty.upsert({
    where: { code: "FITED" },
    update: { name: "คณะครุศาสตร์อุตสาหกรรม" },
    create: {
      code: "FITED",
      name: "คณะครุศาสตร์อุตสาหกรรม",
    },
  });

  const department = await prisma.department.upsert({
    where: { facultyId_code: { facultyId: faculty.id, code: "EDTECH" } },
    update: { name: "ภาควิชาเทคโนโลยีการศึกษา" },
    create: {
      facultyId: faculty.id,
      code: "EDTECH",
      name: "ภาควิชาเทคโนโลยีการศึกษา",
    },
  });

  const major = await prisma.major.upsert({
    where: { departmentId_code: { departmentId: department.id, code: "TCT" } },
    update: { name: "เทคโนโลยีและคอมพิวเตอร์ศึกษา" },
    create: {
      departmentId: department.id,
      code: "TCT",
      name: "เทคโนโลยีและคอมพิวเตอร์ศึกษา",
    },
  });

  const activityTypeSeeds = [
    { code: "ACADEMIC", name: "วิชาการ" },
    { code: "SPORT", name: "กีฬา" },
    { code: "VOLUNTEER", name: "จิตอาสา" },
    { code: "STUDENT_REL", name: "นิสิตสัมพันธ์" },
    { code: "ART_CULTURE", name: "ศิลปวัฒนธรรม" },
    { code: "ETHICS", name: "คุณธรรม" },
  ];

  await Promise.all(
    activityTypeSeeds.map((item) =>
      prisma.activityType.upsert({
        where: { code: item.code },
        update: { name: item.name },
        create: item,
      }),
    ),
  );

  await prisma.registrarStudent.upsert({
    where: { studentCode: "6500000001" },
    update: {
      firstName: "Demo",
      lastName: "Student",
      facultyCode: faculty.code,
      facultyName: faculty.name,
      departmentCode: department.code,
      departmentName: department.name,
      majorCode: major.code,
      majorName: major.name,
      classYear: 4,
      academicYear: 2568,
      isActive: true,
    },
    create: {
      studentCode: "6500000001",
      firstName: "Demo",
      lastName: "Student",
      email: "6500000001@example.com",
      facultyCode: faculty.code,
      facultyName: faculty.name,
      departmentCode: department.code,
      departmentName: department.name,
      majorCode: major.code,
      majorName: major.name,
      classYear: 4,
      academicYear: 2568,
      isActive: true,
    },
  });

  const superAdmin = await prisma.user.upsert({
    where: { username: "superadmin" },
    update: {
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      firstName: "System",
      lastName: "Admin",
      status: "ACTIVE",
    },
    create: {
      username: "superadmin",
      email: "superadmin@tas.local",
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      firstName: "System",
      lastName: "Admin",
      status: "ACTIVE",
    },
  });

  const teacher = await prisma.user.upsert({
    where: { username: "teacher1" },
    update: {
      passwordHash,
      role: UserRole.TEACHER,
      firstName: "Demo",
      lastName: "Teacher",
      status: "ACTIVE",
    },
    create: {
      username: "teacher1",
      email: "teacher1@tas.local",
      passwordHash,
      role: UserRole.TEACHER,
      firstName: "Demo",
      lastName: "Teacher",
      status: "ACTIVE",
    },
  });

  await prisma.teacherProfile.upsert({
    where: { userId: teacher.id },
    update: {
      facultyId: faculty.id,
      departmentId: department.id,
      employeeCode: "T-001",
    },
    create: {
      userId: teacher.id,
      facultyId: faculty.id,
      departmentId: department.id,
      employeeCode: "T-001",
    },
  });

  const deptStaff = await prisma.user.upsert({
    where: { username: "deptstaff1" },
    update: {
      passwordHash,
      role: UserRole.DEPT_STAFF,
      firstName: "Demo",
      lastName: "DeptStaff",
      status: "ACTIVE",
    },
    create: {
      username: "deptstaff1",
      email: "deptstaff1@tas.local",
      passwordHash,
      role: UserRole.DEPT_STAFF,
      firstName: "Demo",
      lastName: "DeptStaff",
      status: "ACTIVE",
    },
  });

  await prisma.staffProfile.upsert({
    where: { userId: deptStaff.id },
    update: {
      staffType: StaffType.DEPT_STAFF,
      facultyId: faculty.id,
      departmentId: department.id,
    },
    create: {
      userId: deptStaff.id,
      staffType: StaffType.DEPT_STAFF,
      facultyId: faculty.id,
      departmentId: department.id,
    },
  });

  const facultyAdmin = await prisma.user.upsert({
    where: { username: "facultyadmin1" },
    update: {
      passwordHash,
      role: UserRole.FACULTY_ADMIN,
      firstName: "Demo",
      lastName: "FacultyAdmin",
      status: "ACTIVE",
    },
    create: {
      username: "facultyadmin1",
      email: "facultyadmin1@tas.local",
      passwordHash,
      role: UserRole.FACULTY_ADMIN,
      firstName: "Demo",
      lastName: "FacultyAdmin",
      status: "ACTIVE",
    },
  });

  await prisma.staffProfile.upsert({
    where: { userId: facultyAdmin.id },
    update: {
      staffType: StaffType.FACULTY_ADMIN,
      facultyId: faculty.id,
      departmentId: null,
    },
    create: {
      userId: facultyAdmin.id,
      staffType: StaffType.FACULTY_ADMIN,
      facultyId: faculty.id,
      departmentId: null,
    },
  });

  console.log("Seed completed", {
    superAdmin: superAdmin.username,
    defaultPassword,
  });
}

main()
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
