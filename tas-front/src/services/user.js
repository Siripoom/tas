import apiClient from "./apiClient";
import { normalizeUser, roleToUserType } from "./compat";
import { getAllActivities } from "./activity";

const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch (_error) {
    return null;
  }
};

const normalizeUserList = (items) =>
  items.map((item) => {
    const user = normalizeUser(item);
    return {
      ...user,
      userType: roleToUserType(item.role),
      department: user.department,
      major: user.major,
      departmentId: user.departmentId,
      majorId: user.majorId,
      level: user.level,
      studentId: user.studentId,
      role: item.role,
      studentProfile: item.studentProfile || null,
      teacherProfile: item.teacherProfile || null,
      staffProfile: item.staffProfile || null,
    };
  });

const buildCreatePayload = (userData = {}) => {
  const currentUser = getCurrentUser();
  const role = userData.role || "STUDENT";

  const payload = {
    username:
      userData.username ||
      userData.email ||
      userData.studentProfile?.studentCode ||
      `user_${Date.now()}`,
    email: userData.email || undefined,
    password: userData.password || "ChangeMe123!",
    firstName: userData.firstName,
    lastName: userData.lastName || "",
    phone: userData.phone || undefined,
    role,
    status: userData.status || "ACTIVE",
  };

  const fallbackFacultyId = currentUser?.facultyId || userData.facultyId;

  if (role === "STUDENT") {
    payload.studentProfile = {
      studentCode: userData.studentProfile?.studentCode || userData.studentCode,
      facultyId:
        userData.studentProfile?.facultyId ||
        userData.facultyId ||
        fallbackFacultyId,
      departmentId: userData.studentProfile?.departmentId || userData.departmentId,
      majorId: userData.studentProfile?.majorId || userData.majorId,
      classYear:
        Number(userData.studentProfile?.classYear || userData.classYear || userData.level) || 1,
      academicYear:
        Number(userData.studentProfile?.academicYear || userData.academicYear) || 2568,
      registrarVerified: Boolean(userData.studentProfile?.registrarVerified ?? true),
    };
  }

  if (role === "TEACHER") {
    payload.teacherProfile = {
      employeeCode: userData.teacherProfile?.employeeCode || userData.employeeCode || undefined,
      facultyId:
        userData.teacherProfile?.facultyId ||
        userData.facultyId ||
        fallbackFacultyId,
      departmentId: userData.teacherProfile?.departmentId || userData.departmentId,
    };
  }

  if (role === "DEPT_STAFF" || role === "FACULTY_ADMIN") {
    const staffType = role === "FACULTY_ADMIN" ? "FACULTY_ADMIN" : "DEPT_STAFF";
    payload.staffProfile = {
      staffType,
      facultyId:
        userData.staffProfile?.facultyId ||
        userData.facultyId ||
        fallbackFacultyId,
      departmentId:
        staffType === "FACULTY_ADMIN"
          ? null
          : userData.staffProfile?.departmentId || userData.departmentId,
    };
  }

  return payload;
};

const buildUpdatePayload = (userData = {}) => {
  const role = userData.role;

  const payload = {
    username: userData.username,
    email: userData.email,
    password: userData.password || undefined,
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone,
    status: userData.status,
  };

  if (role === "STUDENT") {
    payload.studentProfile = userData.studentProfile || {
      studentCode: userData.studentCode,
      facultyId: userData.facultyId,
      departmentId: userData.departmentId,
      majorId: userData.majorId,
      classYear: userData.classYear || userData.level,
      academicYear: userData.academicYear,
      registrarVerified: userData.registrarVerified,
    };
  }

  if (role === "TEACHER") {
    payload.teacherProfile = userData.teacherProfile || {
      employeeCode: userData.employeeCode,
      facultyId: userData.facultyId,
      departmentId: userData.departmentId,
    };
  }

  if (role === "DEPT_STAFF" || role === "FACULTY_ADMIN") {
    const staffType = role === "FACULTY_ADMIN" ? "FACULTY_ADMIN" : "DEPT_STAFF";
    payload.staffProfile = userData.staffProfile || {
      staffType,
      facultyId: userData.facultyId,
      departmentId: staffType === "FACULTY_ADMIN" ? null : userData.departmentId,
    };
  }

  return payload;
};

const compact = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  );

export const getAllUsers = async (params = {}) => {
  const response = await apiClient.get("/users", { params });
  const data = Array.isArray(response.data) ? response.data : [];
  return normalizeUserList(data);
};

export const getUsersByType = async (userType) => {
  try {
    const users = await getAllUsers();
    return users.filter((user) => user.userType === userType);
  } catch (error) {
    if (userType !== "student") {
      throw error;
    }

    const activities = await getAllActivities();
    const seen = new Map();

    activities.forEach((activity) => {
      (activity.attendances || []).forEach((attendance) => {
        const user = attendance.user;
        if (!user?.id || seen.has(user.id)) return;
        seen.set(user.id, {
          ...user,
          userType: "student",
        });
      });
    });

    return Array.from(seen.values());
  }
};

export const getUserById = async (userId) => {
  const response = await apiClient.get(`/users/${userId}`);
  return normalizeUser(response.data);
};

export const createUser = async (userData) => {
  const payload = buildCreatePayload(userData);
  const response = await apiClient.post("/users", payload);
  return normalizeUser(response.data);
};

export const updateUser = async (userId, userData) => {
  const payload = compact(buildUpdatePayload(userData));
  if (payload.studentProfile) payload.studentProfile = compact(payload.studentProfile);
  if (payload.teacherProfile) payload.teacherProfile = compact(payload.teacherProfile);
  if (payload.staffProfile) payload.staffProfile = compact(payload.staffProfile);

  const response = await apiClient.patch(`/users/${userId}`, payload);
  return normalizeUser(response.data);
};

export const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};
