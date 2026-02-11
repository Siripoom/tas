import apiClient from "./apiClient";

export const downloadDepartmentReport = async () => {
  const response = await apiClient.get("/reports/department.xlsx", {
    responseType: "blob",
  });
  return response.data;
};
