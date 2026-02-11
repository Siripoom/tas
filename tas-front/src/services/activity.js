import apiClient from "./apiClient";
import { mapActivityStatusToApi, normalizeActivity } from "./compat";

const isFormData = (value) =>
  typeof FormData !== "undefined" && value instanceof FormData;

const toIsoString = (value, fallback = null) => {
  if (!value && fallback) return fallback;
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toISOString();
};

const formDataToObject = (formData) => {
  const data = {};
  formData.forEach((value, key) => {
    if (data[key] !== undefined) {
      data[key] = Array.isArray(data[key])
        ? [...data[key], value]
        : [data[key], value];
      return;
    }
    data[key] = value;
  });
  return data;
};

const compact = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined && value !== null),
  );

const toArray = (value) => {
  if (value === undefined || value === null || value === "") return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value];
};

const normalizeIncomingPayload = (rawData) => {
  const data = isFormData(rawData) ? formDataToObject(rawData) : { ...rawData };

  const title = data.title || data.name || data.activityName;
  const startAt =
    toIsoString(data.startAt || data.startDate || data.date || data.activityDate) ||
    toIsoString(new Date());
  const endAt =
    toIsoString(data.endAt || data.endDate || data.startDate || data.date) ||
    toIsoString(new Date(Date.now() + 60 * 60 * 1000));

  const applyOpenAt =
    toIsoString(data.applyOpenAt || data.applyOpenDate || data.applyStart) ||
    toIsoString(new Date());

  const applyCloseAt =
    toIsoString(data.applyCloseAt || data.activityDeadline || data.date || data.startDate) ||
    startAt;

  const departmentIds = toArray(data.departmentIds || data.departmentId || data.ownerDepartmentId);
  const majorIds = toArray(data.majorIds);

  return compact({
    title,
    startAt,
    endAt,
    location: data.location || data.address,
    hours: Number(data.hours || data.hour || data.activityHours || 1),
    requiredEvidenceType:
      data.requiredEvidenceType || data.evidenceType || (data.pdfDocument ? "PDF" : "BOTH"),
    activityTypeId: data.activityTypeId || data.typeActivityId || data.category,
    capacity: Number(data.capacity || data.maxPeopleCount || data.maxStudents || 1),
    applyOpenAt,
    applyCloseAt,
    note: data.note || data.description || data.remarks,
    ownerScope: data.ownerScope || (departmentIds.length ? "DEPARTMENT" : "FACULTY"),
    ownerFacultyId: data.ownerFacultyId || data.facultyId,
    ownerDepartmentId: departmentIds[0] || null,
    departmentIds,
    majorIds,
    status: mapActivityStatusToApi(data.status),
  });
};

const mapListQuery = (params = {}) => {
  const mapped = {
    scope: params.scope,
    department: params.department || params.departmentId,
    status: mapActivityStatusToApi(params.status),
    dateFrom: params.dateFrom || params.from,
    dateTo: params.dateTo || params.to,
  };

  return compact(mapped);
};

const fetchActivityDetail = async (id) => {
  const response = await apiClient.get(`/activities/${id}`);
  return response.data;
};

const enrichWithDetails = async (activities) => {
  const detailed = await Promise.all(
    activities.map(async (item) => {
      try {
        return await fetchActivityDetail(item.id);
      } catch (_error) {
        return item;
      }
    }),
  );

  return detailed;
};

export const getAllActivities = async (params = {}) => {
  const response = await apiClient.get("/activities", {
    params: mapListQuery(params),
  });

  const list = Array.isArray(response.data) ? response.data : [];
  const detailed = params.includeDetails === false ? list : await enrichWithDetails(list);

  return detailed.map(normalizeActivity);
};

export const getActivitiesReport = async (params = {}) => {
  return getAllActivities(params);
};

export const getActivityById = async (id) => {
  const response = await apiClient.get(`/activities/${id}`);
  return normalizeActivity(response.data);
};

export const createActivity = async (data) => {
  const payload = normalizeIncomingPayload(data);
  const response = await apiClient.post("/activities", payload);
  return normalizeActivity(response.data);
};

export const updateActivity = async (id, data) => {
  const payload = normalizeIncomingPayload(data);
  const response = await apiClient.patch(`/activities/${id}`, payload);
  return normalizeActivity(response.data);
};

export const deleteActivity = async (id) => {
  const response = await apiClient.delete(`/activities/${id}`);
  return response.data;
};

export const getActivitiesByResponsible = async (userId) => {
  const activities = await getAllActivities({ includeDetails: false });
  return activities.filter((activity) => activity.createdBy?.id === userId);
};

export const getActivitiesWithQuery = async (queryParams = {}) => {
  const activities = await getAllActivities({
    departmentId: queryParams.departmentId,
    status: queryParams.status,
  });

  return {
    activities,
    total: activities.length,
  };
};
