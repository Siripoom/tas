import apiClient from "./apiClient";

export const getAllTypeActivities = async (params = {}) => {
  const response = await apiClient.get("/activity-types", { params });
  return Array.isArray(response.data) ? response.data : [];
};

export const getTypeActivityById = async (id) => {
  const response = await apiClient.get(`/activity-types/${id}`);
  return response.data;
};

export const createTypeActivity = async (payload) => {
  const response = await apiClient.post("/activity-types", payload);
  return response.data;
};

export const updateTypeActivity = async (id, payload) => {
  const response = await apiClient.patch(`/activity-types/${id}`, payload);
  return response.data;
};

export const deleteTypeActivity = async (id) => {
  const response = await apiClient.delete(`/activity-types/${id}`);
  return response.data;
};
