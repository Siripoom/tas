import apiClient from "./apiClient";

const uniqueById = (items) => {
  const map = new Map();
  items.forEach((item) => {
    if (item?.id) map.set(item.id, item);
  });
  return Array.from(map.values());
};

const fromActivitiesFallback = async () => {
  const response = await apiClient.get("/activities");
  const activities = Array.isArray(response.data) ? response.data : [];
  const departments = activities
    .map((activity) => activity.ownerDepartment)
    .filter((department) => department?.id);

  return uniqueById(departments);
};

const isAuthzError = (error) =>
  [401, 403].includes(error?.response?.status);

export const getAllDepartments = async (params = {}) => {
  try {
    const response = await apiClient.get("/departments", { params });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    if (isAuthzError(error)) {
      return fromActivitiesFallback();
    }
    throw error;
  }
};

export const getDepartmentById = async (id) => {
  const response = await apiClient.get(`/departments/${id}`);
  return response.data;
};

export const createDepartment = async (payload) => {
  const response = await apiClient.post("/departments", payload);
  return response.data;
};

export const updateDepartment = async (id, payload) => {
  const response = await apiClient.patch(`/departments/${id}`, payload);
  return response.data;
};

export const deleteDepartment = async (id) => {
  const response = await apiClient.delete(`/departments/${id}`);
  return response.data;
};

export const getAllFaculties = async () => {
  const response = await apiClient.get("/departments/faculties");
  return Array.isArray(response.data) ? response.data : [];
};

export const getMajorsByDepartment = async (departmentId) => {
  if (!departmentId) return [];
  try {
    const response = await apiClient.get(`/departments/${departmentId}/majors`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    if (isAuthzError(error)) {
      const response = await apiClient.get(`/activities/departments/${departmentId}/majors`);
      return Array.isArray(response.data) ? response.data : [];
    }
    throw error;
  }
};

export const createMajor = async (departmentId, payload) => {
  const response = await apiClient.post(`/departments/${departmentId}/majors`, payload);
  return response.data;
};

export const updateMajor = async (departmentId, majorId, payload) => {
  const response = await apiClient.patch(
    `/departments/${departmentId}/majors/${majorId}`,
    payload,
  );
  return response.data;
};

export const deleteMajor = async (departmentId, majorId) => {
  const response = await apiClient.delete(`/departments/${departmentId}/majors/${majorId}`);
  return response.data;
};
