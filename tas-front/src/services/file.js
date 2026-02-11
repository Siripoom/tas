import apiClient from "./apiClient";

const normalizeFile = (file, user = null) => ({
  id: file.id,
  fileName: file.originalName || file.fileName || "file",
  fileType: file.fileType,
  ownerType: file.ownerType,
  ownerId: file.ownerId,
  mimeType: file.mimeType,
  sizeBytes: file.sizeBytes,
  uploadedAt: file.uploadedAt || file.createdAt,
  user,
  downloadUrl: `/files/${file.id}/download`,
});

export const getFilesByOwner = async (ownerType, ownerId) => {
  const response = await apiClient.get("/files", {
    params: {
      ownerType,
      ownerId,
    },
  });

  return Array.isArray(response.data)
    ? response.data.map((item) => normalizeFile(item))
    : [];
};

// Get all files
export const getAllFiles = async (params = {}) => {
  const response = await apiClient.get("/files", { params });
  return Array.isArray(response.data) ? response.data.map((item) => normalizeFile(item)) : [];
};

// Get file by ID
export const getFileById = async (id) => {
  const files = await getAllFiles();
  return files.find((file) => file.id === id) || null;
};

// Upload single file (compat)
export const uploadFileActivity = async (file, ownerId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("ownerType", "RECORD");
  formData.append("ownerId", ownerId);

  const response = await apiClient.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return normalizeFile(response.data);
};

export const uploadFileAttendance = async (file, attendanceId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("ownerType", "APPLICATION");
  formData.append("ownerId", attendanceId);

  const response = await apiClient.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return normalizeFile(response.data);
};

export const downloadAttendanceFile = async (attendanceId) => {
  const files = await getFilesByOwner("APPLICATION", attendanceId);
  if (!files.length) {
    throw new Error("No evidence file found");
  }

  const response = await apiClient.get(`/files/${files[0].id}/download`, {
    responseType: "blob",
  });
  return response.data;
};

// Upload multiple files (compat)
export const uploadMultipleFiles = async (files, attendanceId) => {
  const uploaded = await Promise.all(
    files.slice(0, 3).map((file) => uploadFileAttendance(file, attendanceId)),
  );
  return uploaded;
};

// Upload students CSV (deprecated in new API contract)
export const uploadStudentsCSV = async () => {
  throw new Error("CSV upload is not supported in this build. Use /admin/import/students JSON payload.");
};

// Delete file
export const deleteFile = async (id) => {
  const response = await apiClient.delete(`/files/${id}`);
  return response.data;
};

// Download file
export const downloadFile = async (id) => {
  const response = await apiClient.get(`/files/${id}/download`, {
    responseType: "blob",
  });
  return response.data;
};

// Get files by activity
export const getFilesByActivity = async (activityId) => {
  const detailResponse = await apiClient.get(`/activities/${activityId}`);
  const activity = detailResponse.data;
  const applications = Array.isArray(activity.applications) ? activity.applications : [];

  const batches = await Promise.all(
    applications.map(async (application) => {
      const files = await getFilesByOwner("APPLICATION", application.id);
      return files.map((file) => ({ ...file, user: application.student || null }));
    }),
  );

  return batches.flat();
};

export const getFilesByApplication = async (applicationId) => {
  return getFilesByOwner("APPLICATION", applicationId);
};
