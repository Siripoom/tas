import { getActivityById, getAllActivities } from "./activity";
import apiClient from "./apiClient";
import {
  mapApplicationStatusFromApi,
  mapLegacyAttendanceAction,
  normalizeAttendance,
} from "./compat";

const flattenAttendances = (activities) =>
  activities.flatMap((activity) =>
    (activity.attendances || []).map((attendance) => ({
      ...attendance,
      activityId: attendance.activityId || activity.id,
      activity,
    })),
  );

// Get all attendances
export const getAllAttendances = async () => {
  const activities = await getAllActivities();
  return flattenAttendances(activities);
};

// Get attendance by ID
export const getAttendanceById = async (id) => {
  const attendances = await getAllAttendances();
  return attendances.find((attendance) => attendance.id === id) || null;
};

// Create new attendance
export const createAttendance = async (data) => {
  const activityId = data.activityId;
  if (!activityId) {
    throw new Error("activityId is required");
  }

  const response = await apiClient.post(`/activities/${activityId}/apply`);
  return {
    id: response.data.id,
    activityId: response.data.activityId,
    userId: response.data.studentUserId,
    status: mapApplicationStatusFromApi(response.data.status),
    reason: response.data.remark || null,
    createdAt: response.data.submittedAt,
    updatedAt: response.data.updatedAt,
  };
};

// Update attendance
export const updateAttendance = async (id, data = {}) => {
  const action = mapLegacyAttendanceAction(data.status);
  const endpoint = action === "approve" ? "approve" : "request-revision";

  const response = await apiClient.post(`/approvals/${id}/${endpoint}`, {
    remark: data.remark || data.reason || data.rejectReason,
  });

  return normalizeAttendance(response.data);
};

// Delete attendance (compat)
export const deleteAttendance = async (_id) => {
  return { success: true };
};

// Get attendances by user
export const getAttendancesByUser = async (userId) => {
  const attendances = await getAllAttendances();
  return attendances.filter(
    (attendance) =>
      attendance.userId === userId ||
      attendance.user?.id === userId ||
      attendance.user?.id === String(userId),
  );
};

// Get attendances by activity
export const getAttendancesByActivity = async (activityId) => {
  const activity = await getActivityById(activityId);

  return (activity.attendances || []).map((attendance) => ({
    ...attendance,
    activityId,
    activity,
  }));
};
