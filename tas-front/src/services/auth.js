import apiClient from "./apiClient";
import { normalizeUser } from "./compat";

export const login = async (email, password) => {
  const response = await apiClient.post("/auth/login", {
    email: String(email),
    password: String(password),
  });

  const data = response.data;
  const user = normalizeUser(data.user);

  return {
    token: data.accessToken,
    refreshToken: data.refreshToken,
    accessToken: data.accessToken,
    user,
  };
};

export const refresh = async (refreshToken) => {
  const response = await apiClient.post("/auth/refresh", { refreshToken });
  return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const response = await apiClient.post("/auth/change-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};

export const registerStudent = async (payload) => {
  const response = await apiClient.post("/auth/register-student", payload);
  return response.data;
};
