const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch (_error) {
    return null;
  }
};

export const getSessionUser = () => {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("user");
  if (!raw) return null;

  const user = safeParse(raw);
  if (!user || typeof user !== "object") return null;

  const role = user.role || null;
  const faculty = user.faculty || null;
  const department = user.department || null;

  const facultyId = user.facultyId || faculty?.id || null;
  const departmentId = user.departmentId || department?.id || null;

  return {
    ...user,
    role,
    faculty,
    department,
    facultyId,
    departmentId,
    facultyName: faculty?.name || user.facultyName || "",
    departmentName: department?.name || user.departmentName || "",
  };
};

export const getUserScope = () => {
  const user = getSessionUser();
  if (!user) return null;

  return {
    id: user.id || null,
    role: user.role || null,
    facultyId: user.facultyId || null,
    departmentId: user.departmentId || null,
    facultyName: user.facultyName || "",
    departmentName: user.departmentName || "",
  };
};
