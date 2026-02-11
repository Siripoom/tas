import apiClient from "./apiClient";

export const getMyProgress = async () => {
  const response = await apiClient.get("/students/me/progress");
  return response.data;
};
