const ROLE_TO_USER_TYPE = {
  STUDENT: "student",
  TEACHER: "teacher",
  DEPT_STAFF: "admin",
  FACULTY_ADMIN: "admin",
  SUPER_ADMIN: "admin",
};

const ACTIVITY_STATUS_TO_API = {
  planned: "OPEN_REGISTRATION",
  inprogress: "IN_PROGRESS",
  completed: "CLOSED",
  cancelled: "CANCELLED",
};

const LEGACY_ATTENDANCE_ACTION = {
  APPLIED: "request-revision",
  APPROVED: "approve",
  REJECTED: "request-revision",
  REVISION_REQUIRED: "request-revision",
  CANCELLED: "request-revision",
  NO_SHOW: "request-revision",
  SUBMITTED: "request-revision",
  COMPLETED: "approve",
  joined: "request-revision",
  accepted: "approve",
  approved: "approve",
  completed: "approve",
  rejected: "request-revision",
  uncompleted: "request-revision",
  Inprogress: "request-revision",
};

function safeString(value) {
  return value === null || value === undefined ? "" : String(value);
}

export function splitFullName(fullname) {
  const clean = safeString(fullname).trim();
  if (!clean) {
    return { firstName: "User", lastName: "" };
  }
  const parts = clean.split(/\s+/);
  const firstName = parts.shift() || "User";
  const lastName = parts.join(" ");
  return { firstName, lastName };
}

export function roleToUserType(role) {
  return ROLE_TO_USER_TYPE[role] || "student";
}

export function mapActivityStatusFromApi(status) {
  return status || "OPEN_REGISTRATION";
}

export function mapActivityStatusToApi(status) {
  return ACTIVITY_STATUS_TO_API[status] || status || undefined;
}

export function mapApplicationStatusFromApi(status) {
  return status || "APPLIED";
}

export function mapLegacyAttendanceAction(status) {
  return LEGACY_ATTENDANCE_ACTION[status] || "request-revision";
}

export function mapEvidenceTypeToTypeActivity(requiredEvidenceType) {
  const mapping = {
    PHOTO: { id: "PHOTO", name: "ใช้รูปภาพ" },
    PDF: { id: "PDF", name: "ใช้ PDF" },
    BOTH: { id: "BOTH", name: "ทั่วไป" },
  };
  return mapping[requiredEvidenceType] || mapping.BOTH;
}

function uniqueById(items) {
  const map = new Map();
  items.forEach((item) => {
    if (item?.id) {
      map.set(item.id, item);
    }
  });
  return Array.from(map.values());
}

function normalizeTargetDepartments(activity) {
  const targetDepartments = Array.isArray(activity?.targetDepartments)
    ? activity.targetDepartments
    : [];

  const mappedTargets = targetDepartments
    .map((item) => ({
      departmentId: item?.departmentId || item?.department?.id || null,
      department: item?.department || null,
    }))
    .filter((item) => item.departmentId);

  if (mappedTargets.length > 0) {
    return mappedTargets;
  }

  if (activity?.ownerDepartmentId || activity?.ownerDepartment?.id) {
    return [
      {
        departmentId: activity.ownerDepartmentId || activity.ownerDepartment?.id,
        department: activity.ownerDepartment || null,
      },
    ];
  }

  return [];
}

function normalizeTargetMajors(activity) {
  const targetMajors = Array.isArray(activity?.targetMajors)
    ? activity.targetMajors
    : Array.isArray(activity?.majorJoins)
      ? activity.majorJoins
      : [];

  return targetMajors
    .map((item) => ({
      majorId: item?.majorId || item?.major?.id || null,
      major: item?.major || null,
    }))
    .filter((item) => item.majorId);
}

export function normalizeUser(user) {
  if (!user) return null;

  const fullNameFromApi = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  const fullname = user.fullname || fullNameFromApi || user.username || user.email || "Unknown";

  const faculty =
    user.faculty ||
    user.studentProfile?.faculty ||
    user.teacherProfile?.faculty ||
    user.staffProfile?.faculty ||
    null;

  const department =
    user.department ||
    user.studentProfile?.department ||
    user.teacherProfile?.department ||
    user.staffProfile?.department ||
    null;

  const major = user.major || user.studentProfile?.major || null;

  const studentCode = user.studentCode || user.studentProfile?.studentCode || null;
  const classYear = user.classYear || user.studentProfile?.classYear || null;
  const academicYear = user.academicYear || user.studentProfile?.academicYear || null;

  return {
    id: user.id,
    role: user.role,
    userType: roleToUserType(user.role),
    username: user.username || null,
    email: user.email || null,
    fullname,
    name: fullname,
    firstName: user.firstName || splitFullName(fullname).firstName,
    lastName: user.lastName || splitFullName(fullname).lastName,
    phone: user.phone || null,
    status: user.status || "ACTIVE",
    studentId: studentCode,
    studentCode,
    classYear,
    academicYear,
    level: classYear,
    facultyId:
      user.facultyId ||
      user.studentProfile?.facultyId ||
      user.teacherProfile?.facultyId ||
      user.staffProfile?.facultyId ||
      faculty?.id ||
      null,
    faculty,
    departmentId:
      user.departmentId ||
      user.studentProfile?.departmentId ||
      user.teacherProfile?.departmentId ||
      user.staffProfile?.departmentId ||
      department?.id ||
      null,
    department,
    majorId: user.majorId || user.studentProfile?.majorId || major?.id || null,
    major,
  };
}

export function normalizeAttendance(application, activity = null) {
  const normalizedUser = normalizeUser(application?.student || application?.user || null);

  return {
    id: application.id,
    activityId: application.activityId || activity?.id || null,
    userId: application.studentUserId || normalizedUser?.id || null,
    status: mapApplicationStatusFromApi(application.status),
    reason: application.remark || null,
    createdAt: application.submittedAt || application.createdAt || null,
    updatedAt: application.updatedAt || null,
    user: normalizedUser,
    activity,
    attendanceId: application.id,
  };
}

export function normalizeActivity(activity) {
  if (!activity) return null;

  const applications = Array.isArray(activity?.applications) ? activity.applications : [];
  const attendances = applications.map((item) => normalizeAttendance(item));

  const peopleCount = applications.filter((item) =>
    ["APPLIED", "APPROVED", "REVISION_REQUIRED"].includes(item.status),
  ).length;

  const typeActivity = activity.activityType
    ? {
        id: activity.activityType.id,
        code: activity.activityType.code,
        name: activity.activityType.name,
      }
    : activity.typeActivity
      ? {
          id: activity.typeActivity.id,
          code: activity.typeActivity.code,
          name: activity.typeActivity.name,
        }
    : mapEvidenceTypeToTypeActivity(activity.requiredEvidenceType);

  const targetDepartments = normalizeTargetDepartments(activity);
  const departments = uniqueById(
    targetDepartments
      .map((item) => item.department)
      .filter((item) => item?.id),
  );
  const departmentIds = targetDepartments.map((item) => item.departmentId).filter(Boolean);
  const department = departments[0] || activity.ownerDepartment || null;

  const majorJoins = normalizeTargetMajors(activity);
  const majors = uniqueById(majorJoins.map((item) => item.major).filter((item) => item?.id));
  const majorIds = majorJoins.map((item) => item.majorId).filter(Boolean);

  const normalizedAttendances = attendances.map((attendance) => ({
    ...attendance,
    activityId: attendance.activityId || activity.id,
  }));

  return {
    id: activity.id,
    name: activity.title,
    title: activity.title,
    description: activity.note || "",
    note: activity.note || "",
    location: activity.location,
    address: activity.location,
    hour: activity.hours,
    hours: activity.hours,
    activityHours: activity.hours,
    maxPeopleCount: activity.capacity,
    maxStudents: activity.capacity,
    peopleCount,
    startDate: activity.startAt,
    endDate: activity.endAt,
    date: activity.applyCloseAt,
    startAt: activity.startAt,
    endAt: activity.endAt,
    applyOpen: activity.applyOpenAt,
    applyClose: activity.applyCloseAt,
    applyOpenAt: activity.applyOpenAt,
    applyCloseAt: activity.applyCloseAt,
    status: mapActivityStatusFromApi(activity.status),
    departmentId: departmentIds[0] || activity.ownerDepartmentId || null,
    departmentIds,
    facultyId: activity.ownerFacultyId || null,
    department,
    departments,
    faculty: activity.ownerFaculty || null,
    activityType: activity.activityType || typeActivity,
    typeActivity,
    typeActivityId: activity.activityTypeId || typeActivity.id,
    requiredEvidenceType: activity.requiredEvidenceType,
    ownerScope: activity.ownerScope,
    attendances: normalizedAttendances,
    applications,
    createdBy: activity.createdBy || null,
    targetDepartments,
    majorJoins,
    targetMajors: majorJoins,
    majorIds,
    majors,
    level: activity.level || null,
    createdAt: activity.createdAt || null,
    updatedAt: activity.updatedAt || null,
    fileActivities: [],
    remarks: activity.note || "",
  };
}
