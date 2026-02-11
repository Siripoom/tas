module.exports = [
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/services/apiClient.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// create axios instance with default config
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
const baseURL = ("TURBOPACK compile-time value", "http://localhost:4556/api") || "http://localhost:4556/api";
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});
const getToken = ()=>("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
const getRefreshToken = ()=>("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
const setTokens = (accessToken, refreshToken)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const clearTokens = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
apiClient.interceptors.request.use((config)=>{
    const token = getToken();
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return config;
}, (error)=>Promise.reject(error));
let isRefreshing = false;
let pendingRequests = [];
const processQueue = (error, token = null)=>{
    pendingRequests.forEach((promise)=>{
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });
    pendingRequests = [];
};
apiClient.interceptors.response.use((response)=>response, async (error)=>{
    const originalRequest = error.config;
    if (error.response?.status !== 401 || originalRequest?._retry) {
        return Promise.reject(error);
    }
    const refreshToken = getRefreshToken();
    if ("TURBOPACK compile-time truthy", 1) {
        clearTokens();
        return Promise.reject(error);
    }
    //TURBOPACK unreachable
    ;
});
const __TURBOPACK__default__export__ = apiClient;
}),
"[project]/src/services/compat.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapActivityStatusFromApi",
    ()=>mapActivityStatusFromApi,
    "mapActivityStatusToApi",
    ()=>mapActivityStatusToApi,
    "mapApplicationStatusFromApi",
    ()=>mapApplicationStatusFromApi,
    "mapEvidenceTypeToTypeActivity",
    ()=>mapEvidenceTypeToTypeActivity,
    "mapLegacyAttendanceAction",
    ()=>mapLegacyAttendanceAction,
    "normalizeActivity",
    ()=>normalizeActivity,
    "normalizeAttendance",
    ()=>normalizeAttendance,
    "normalizeUser",
    ()=>normalizeUser,
    "roleToUserType",
    ()=>roleToUserType,
    "splitFullName",
    ()=>splitFullName
]);
const ROLE_TO_USER_TYPE = {
    STUDENT: "student",
    TEACHER: "teacher",
    DEPT_STAFF: "admin",
    FACULTY_ADMIN: "admin",
    SUPER_ADMIN: "admin"
};
const ACTIVITY_STATUS_TO_API = {
    planned: "OPEN_REGISTRATION",
    inprogress: "IN_PROGRESS",
    completed: "CLOSED",
    cancelled: "CANCELLED"
};
const LEGACY_ATTENDANCE_ACTION = {
    APPLIED: "request-revision",
    APPROVED: "approve",
    REJECTED: "request-revision",
    REVISION_REQUIRED: "request-revision",
    CANCELLED: "request-revision",
    NO_SHOW: "request-revision",
    SUBMITTED: "request-revision",
    COMPLETED: "approve",
    joined: "request-revision",
    accepted: "approve",
    approved: "approve",
    completed: "approve",
    rejected: "request-revision",
    uncompleted: "request-revision",
    Inprogress: "request-revision"
};
function safeString(value) {
    return value === null || value === undefined ? "" : String(value);
}
function splitFullName(fullname) {
    const clean = safeString(fullname).trim();
    if (!clean) {
        return {
            firstName: "User",
            lastName: ""
        };
    }
    const parts = clean.split(/\s+/);
    const firstName = parts.shift() || "User";
    const lastName = parts.join(" ");
    return {
        firstName,
        lastName
    };
}
function roleToUserType(role) {
    return ROLE_TO_USER_TYPE[role] || "student";
}
function mapActivityStatusFromApi(status) {
    return status || "OPEN_REGISTRATION";
}
function mapActivityStatusToApi(status) {
    return ACTIVITY_STATUS_TO_API[status] || status || undefined;
}
function mapApplicationStatusFromApi(status) {
    return status || "APPLIED";
}
function mapLegacyAttendanceAction(status) {
    return LEGACY_ATTENDANCE_ACTION[status] || "request-revision";
}
function mapEvidenceTypeToTypeActivity(requiredEvidenceType) {
    const mapping = {
        PHOTO: {
            id: "PHOTO",
            name: "ใช้รูปภาพ"
        },
        PDF: {
            id: "PDF",
            name: "ใช้ PDF"
        },
        BOTH: {
            id: "BOTH",
            name: "ทั่วไป"
        }
    };
    return mapping[requiredEvidenceType] || mapping.BOTH;
}
function uniqueById(items) {
    const map = new Map();
    items.forEach((item)=>{
        if (item?.id) {
            map.set(item.id, item);
        }
    });
    return Array.from(map.values());
}
function normalizeTargetDepartments(activity) {
    const targetDepartments = Array.isArray(activity?.targetDepartments) ? activity.targetDepartments : [];
    const mappedTargets = targetDepartments.map((item)=>({
            departmentId: item?.departmentId || item?.department?.id || null,
            department: item?.department || null
        })).filter((item)=>item.departmentId);
    if (mappedTargets.length > 0) {
        return mappedTargets;
    }
    if (activity?.ownerDepartmentId || activity?.ownerDepartment?.id) {
        return [
            {
                departmentId: activity.ownerDepartmentId || activity.ownerDepartment?.id,
                department: activity.ownerDepartment || null
            }
        ];
    }
    return [];
}
function normalizeTargetMajors(activity) {
    const targetMajors = Array.isArray(activity?.targetMajors) ? activity.targetMajors : Array.isArray(activity?.majorJoins) ? activity.majorJoins : [];
    return targetMajors.map((item)=>({
            majorId: item?.majorId || item?.major?.id || null,
            major: item?.major || null
        })).filter((item)=>item.majorId);
}
function normalizeUser(user) {
    if (!user) return null;
    const fullNameFromApi = [
        user.firstName,
        user.lastName
    ].filter(Boolean).join(" ").trim();
    const fullname = user.fullname || fullNameFromApi || user.username || user.email || "Unknown";
    const faculty = user.faculty || user.studentProfile?.faculty || user.teacherProfile?.faculty || user.staffProfile?.faculty || null;
    const department = user.department || user.studentProfile?.department || user.teacherProfile?.department || user.staffProfile?.department || null;
    const major = user.major || user.studentProfile?.major || null;
    const studentCode = user.studentCode || user.studentProfile?.studentCode || null;
    const classYear = user.classYear || user.studentProfile?.classYear || null;
    const academicYear = user.academicYear || user.studentProfile?.academicYear || null;
    return {
        id: user.id,
        role: user.role,
        userType: roleToUserType(user.role),
        username: user.username || null,
        email: user.email || null,
        fullname,
        name: fullname,
        firstName: user.firstName || splitFullName(fullname).firstName,
        lastName: user.lastName || splitFullName(fullname).lastName,
        phone: user.phone || null,
        status: user.status || "ACTIVE",
        studentId: studentCode,
        studentCode,
        classYear,
        academicYear,
        level: classYear,
        facultyId: user.facultyId || user.studentProfile?.facultyId || user.teacherProfile?.facultyId || user.staffProfile?.facultyId || faculty?.id || null,
        faculty,
        departmentId: user.departmentId || user.studentProfile?.departmentId || user.teacherProfile?.departmentId || user.staffProfile?.departmentId || department?.id || null,
        department,
        majorId: user.majorId || user.studentProfile?.majorId || major?.id || null,
        major
    };
}
function normalizeAttendance(application, activity = null) {
    const normalizedUser = normalizeUser(application?.student || application?.user || null);
    return {
        id: application.id,
        activityId: application.activityId || activity?.id || null,
        userId: application.studentUserId || normalizedUser?.id || null,
        status: mapApplicationStatusFromApi(application.status),
        reason: application.remark || null,
        createdAt: application.submittedAt || application.createdAt || null,
        updatedAt: application.updatedAt || null,
        user: normalizedUser,
        activity,
        attendanceId: application.id
    };
}
function normalizeActivity(activity) {
    if (!activity) return null;
    const applications = Array.isArray(activity?.applications) ? activity.applications : [];
    const attendances = applications.map((item)=>normalizeAttendance(item));
    const peopleCount = applications.filter((item)=>[
            "APPLIED",
            "APPROVED",
            "REVISION_REQUIRED"
        ].includes(item.status)).length;
    const typeActivity = activity.activityType ? {
        id: activity.activityType.id,
        code: activity.activityType.code,
        name: activity.activityType.name
    } : activity.typeActivity ? {
        id: activity.typeActivity.id,
        code: activity.typeActivity.code,
        name: activity.typeActivity.name
    } : mapEvidenceTypeToTypeActivity(activity.requiredEvidenceType);
    const targetDepartments = normalizeTargetDepartments(activity);
    const departments = uniqueById(targetDepartments.map((item)=>item.department).filter((item)=>item?.id));
    const departmentIds = targetDepartments.map((item)=>item.departmentId).filter(Boolean);
    const department = departments[0] || activity.ownerDepartment || null;
    const majorJoins = normalizeTargetMajors(activity);
    const majors = uniqueById(majorJoins.map((item)=>item.major).filter((item)=>item?.id));
    const majorIds = majorJoins.map((item)=>item.majorId).filter(Boolean);
    const normalizedAttendances = attendances.map((attendance)=>({
            ...attendance,
            activityId: attendance.activityId || activity.id
        }));
    return {
        id: activity.id,
        name: activity.title,
        title: activity.title,
        description: activity.note || "",
        note: activity.note || "",
        location: activity.location,
        address: activity.location,
        hour: activity.hours,
        hours: activity.hours,
        activityHours: activity.hours,
        maxPeopleCount: activity.capacity,
        maxStudents: activity.capacity,
        peopleCount,
        startDate: activity.startAt,
        endDate: activity.endAt,
        date: activity.applyCloseAt,
        startAt: activity.startAt,
        endAt: activity.endAt,
        applyOpen: activity.applyOpenAt,
        applyClose: activity.applyCloseAt,
        applyOpenAt: activity.applyOpenAt,
        applyCloseAt: activity.applyCloseAt,
        status: mapActivityStatusFromApi(activity.status),
        departmentId: departmentIds[0] || activity.ownerDepartmentId || null,
        departmentIds,
        facultyId: activity.ownerFacultyId || null,
        department,
        departments,
        faculty: activity.ownerFaculty || null,
        activityType: activity.activityType || typeActivity,
        typeActivity,
        typeActivityId: activity.activityTypeId || typeActivity.id,
        requiredEvidenceType: activity.requiredEvidenceType,
        ownerScope: activity.ownerScope,
        attendances: normalizedAttendances,
        applications,
        createdBy: activity.createdBy || null,
        targetDepartments,
        majorJoins,
        targetMajors: majorJoins,
        majorIds,
        majors,
        level: activity.level || null,
        createdAt: activity.createdAt || null,
        updatedAt: activity.updatedAt || null,
        fileActivities: [],
        remarks: activity.note || ""
    };
}
}),
"[project]/src/services/activity.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createActivity",
    ()=>createActivity,
    "deleteActivity",
    ()=>deleteActivity,
    "getActivitiesByResponsible",
    ()=>getActivitiesByResponsible,
    "getActivitiesReport",
    ()=>getActivitiesReport,
    "getActivitiesWithQuery",
    ()=>getActivitiesWithQuery,
    "getActivityById",
    ()=>getActivityById,
    "getAllActivities",
    ()=>getAllActivities,
    "updateActivity",
    ()=>updateActivity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/compat.js [app-ssr] (ecmascript)");
;
;
const isFormData = (value)=>typeof FormData !== "undefined" && value instanceof FormData;
const toIsoString = (value, fallback = null)=>{
    if (!value && fallback) return fallback;
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return fallback;
    return date.toISOString();
};
const formDataToObject = (formData)=>{
    const data = {};
    formData.forEach((value, key)=>{
        if (data[key] !== undefined) {
            data[key] = Array.isArray(data[key]) ? [
                ...data[key],
                value
            ] : [
                data[key],
                value
            ];
            return;
        }
        data[key] = value;
    });
    return data;
};
const compact = (obj)=>Object.fromEntries(Object.entries(obj).filter(([, value])=>value !== undefined && value !== null));
const toArray = (value)=>{
    if (value === undefined || value === null || value === "") return [];
    if (Array.isArray(value)) return value.filter(Boolean);
    return [
        value
    ];
};
const normalizeIncomingPayload = (rawData)=>{
    const data = isFormData(rawData) ? formDataToObject(rawData) : {
        ...rawData
    };
    const title = data.title || data.name || data.activityName;
    const startAt = toIsoString(data.startAt || data.startDate || data.date || data.activityDate) || toIsoString(new Date());
    const endAt = toIsoString(data.endAt || data.endDate || data.startDate || data.date) || toIsoString(new Date(Date.now() + 60 * 60 * 1000));
    const applyOpenAt = toIsoString(data.applyOpenAt || data.applyOpenDate || data.applyStart) || toIsoString(new Date());
    const applyCloseAt = toIsoString(data.applyCloseAt || data.activityDeadline || data.date || data.startDate) || startAt;
    const departmentIds = toArray(data.departmentIds || data.departmentId || data.ownerDepartmentId);
    const majorIds = toArray(data.majorIds);
    return compact({
        title,
        startAt,
        endAt,
        location: data.location || data.address,
        hours: Number(data.hours || data.hour || data.activityHours || 1),
        requiredEvidenceType: data.requiredEvidenceType || data.evidenceType || (data.pdfDocument ? "PDF" : "BOTH"),
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
        status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapActivityStatusToApi"])(data.status)
    });
};
const mapListQuery = (params = {})=>{
    const mapped = {
        scope: params.scope,
        department: params.department || params.departmentId,
        status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapActivityStatusToApi"])(params.status),
        dateFrom: params.dateFrom || params.from,
        dateTo: params.dateTo || params.to
    };
    return compact(mapped);
};
const fetchActivityDetail = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/activities/${id}`);
    return response.data;
};
const enrichWithDetails = async (activities)=>{
    const detailed = await Promise.all(activities.map(async (item)=>{
        try {
            return await fetchActivityDetail(item.id);
        } catch (_error) {
            return item;
        }
    }));
    return detailed;
};
const getAllActivities = async (params = {})=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/activities", {
        params: mapListQuery(params)
    });
    const list = Array.isArray(response.data) ? response.data : [];
    const detailed = params.includeDetails === false ? list : await enrichWithDetails(list);
    return detailed.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeActivity"]);
};
const getActivitiesReport = async (params = {})=>{
    return getAllActivities(params);
};
const getActivityById = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/activities/${id}`);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeActivity"])(response.data);
};
const createActivity = async (data)=>{
    const payload = normalizeIncomingPayload(data);
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/activities", payload);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeActivity"])(response.data);
};
const updateActivity = async (id, data)=>{
    const payload = normalizeIncomingPayload(data);
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/activities/${id}`, payload);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeActivity"])(response.data);
};
const deleteActivity = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/activities/${id}`);
    return response.data;
};
const getActivitiesByResponsible = async (userId)=>{
    const activities = await getAllActivities({
        includeDetails: false
    });
    return activities.filter((activity)=>activity.createdBy?.id === userId);
};
const getActivitiesWithQuery = async (queryParams = {})=>{
    const activities = await getAllActivities({
        departmentId: queryParams.departmentId,
        status: queryParams.status
    });
    return {
        activities,
        total: activities.length
    };
};
}),
"[project]/src/services/department.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDepartment",
    ()=>createDepartment,
    "createMajor",
    ()=>createMajor,
    "deleteDepartment",
    ()=>deleteDepartment,
    "deleteMajor",
    ()=>deleteMajor,
    "getAllDepartments",
    ()=>getAllDepartments,
    "getAllFaculties",
    ()=>getAllFaculties,
    "getDepartmentById",
    ()=>getDepartmentById,
    "getMajorsByDepartment",
    ()=>getMajorsByDepartment,
    "updateDepartment",
    ()=>updateDepartment,
    "updateMajor",
    ()=>updateMajor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.js [app-ssr] (ecmascript)");
;
const uniqueById = (items)=>{
    const map = new Map();
    items.forEach((item)=>{
        if (item?.id) map.set(item.id, item);
    });
    return Array.from(map.values());
};
const fromActivitiesFallback = async ()=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/activities");
    const activities = Array.isArray(response.data) ? response.data : [];
    const departments = activities.map((activity)=>activity.ownerDepartment).filter((department)=>department?.id);
    return uniqueById(departments);
};
const isAuthzError = (error)=>[
        401,
        403
    ].includes(error?.response?.status);
const getAllDepartments = async (params = {})=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/departments", {
            params
        });
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        if (isAuthzError(error)) {
            return fromActivitiesFallback();
        }
        throw error;
    }
};
const getDepartmentById = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/departments/${id}`);
    return response.data;
};
const createDepartment = async (payload)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/departments", payload);
    return response.data;
};
const updateDepartment = async (id, payload)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/departments/${id}`, payload);
    return response.data;
};
const deleteDepartment = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/departments/${id}`);
    return response.data;
};
const getAllFaculties = async ()=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/departments/faculties");
    return Array.isArray(response.data) ? response.data : [];
};
const getMajorsByDepartment = async (departmentId)=>{
    if (!departmentId) return [];
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/departments/${departmentId}/majors`);
    return Array.isArray(response.data) ? response.data : [];
};
const createMajor = async (departmentId, payload)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/departments/${departmentId}/majors`, payload);
    return response.data;
};
const updateMajor = async (departmentId, majorId, payload)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/departments/${departmentId}/majors/${majorId}`, payload);
    return response.data;
};
const deleteMajor = async (departmentId, majorId)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/departments/${departmentId}/majors/${majorId}`);
    return response.data;
};
}),
"[project]/src/services/typeActivity.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTypeActivity",
    ()=>createTypeActivity,
    "deleteTypeActivity",
    ()=>deleteTypeActivity,
    "getAllTypeActivities",
    ()=>getAllTypeActivities,
    "getTypeActivityById",
    ()=>getTypeActivityById,
    "updateTypeActivity",
    ()=>updateTypeActivity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.js [app-ssr] (ecmascript)");
;
const getAllTypeActivities = async (params = {})=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/activity-types", {
        params
    });
    return Array.isArray(response.data) ? response.data : [];
};
const getTypeActivityById = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/activity-types/${id}`);
    return response.data;
};
const createTypeActivity = async (payload)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/activity-types", payload);
    return response.data;
};
const updateTypeActivity = async (id, payload)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/activity-types/${id}`, payload);
    return response.data;
};
const deleteTypeActivity = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/activity-types/${id}`);
    return response.data;
};
}),
"[project]/src/app/admin/event/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminEventPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-ssr] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-ssr] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/form/index.js [app-ssr] (ecmascript) <export default as Form>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-ssr] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-ssr] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$popconfirm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Popconfirm$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/popconfirm/index.js [app-ssr] (ecmascript) <export default as Popconfirm>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-ssr] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-ssr] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/spin/index.js [app-ssr] (ecmascript) <export default as Spin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/table/index.js [app-ssr] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-ssr] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-ssr] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-ssr] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/activity.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$department$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/department.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$typeActivity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/typeActivity.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const managerRoles = [
    "FACULTY_ADMIN",
    "SUPER_ADMIN"
];
const activityStatuses = [
    {
        value: "OPEN_REGISTRATION",
        label: "เปิดรับสมัคร"
    },
    {
        value: "IN_PROGRESS",
        label: "กำลังดำเนินการ"
    },
    {
        value: "CLOSED",
        label: "ปิดกิจกรรม"
    },
    {
        value: "CANCELLED",
        label: "ยกเลิกกิจกรรม"
    }
];
const evidenceTypeOptions = [
    {
        value: "BOTH",
        label: "ทั่วไป (รูปภาพหรือ PDF)"
    },
    {
        value: "PHOTO",
        label: "รูปภาพเท่านั้น"
    },
    {
        value: "PDF",
        label: "PDF เท่านั้น"
    }
];
const uniqueById = (items)=>{
    const map = new Map();
    items.forEach((item)=>{
        if (item?.id) map.set(item.id, item);
    });
    return Array.from(map.values());
};
const toArray = (value)=>{
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean);
    return [
        value
    ];
};
const toDateTimeInput = (value)=>{
    if (!value) return undefined;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return undefined;
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
};
const toIso = (value)=>{
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toISOString();
};
const toDepartmentList = (event)=>{
    if (Array.isArray(event.departments) && event.departments.length > 0) {
        return event.departments;
    }
    if (event.department?.id) {
        return [
            event.department
        ];
    }
    return [];
};
const toMajorJoinList = (event)=>{
    if (Array.isArray(event.majorJoins)) {
        return event.majorJoins;
    }
    return [];
};
function AdminEventPage() {
    const [form] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm();
    const watchedDepartmentIds = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useWatch("departmentIds", form);
    const [sessionUser, setSessionUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [departments, setDepartments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [majorOptions, setMajorOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [typeActivities, setTypeActivities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedDepartment, setSelectedDepartment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isFormModalOpen, setIsFormModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isViewModalOpen, setIsViewModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingEvent, setEditingEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [viewingEvent, setViewingEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const isManager = managerRoles.includes(sessionUser?.role);
    const scopedDepartmentId = !isManager ? sessionUser?.departmentId || null : null;
    const loadMajorsByDepartments = async (departmentIds, keepCurrentSelection = true)=>{
        const ids = uniqueById(toArray(departmentIds).map((id)=>({
                id
            }))).map((item)=>item.id);
        if (ids.length === 0) {
            setMajorOptions([]);
            if (!keepCurrentSelection) {
                form.setFieldValue("majorIds", []);
            }
            return;
        }
        try {
            const allMajors = (await Promise.all(ids.map(async (departmentId)=>{
                try {
                    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$department$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMajorsByDepartment"])(departmentId);
                } catch (_error) {
                    return [];
                }
            }))).flat();
            const uniqueMajors = uniqueById(allMajors).sort((a, b)=>String(a.code || "").localeCompare(String(b.code || ""), "th"));
            setMajorOptions(uniqueMajors);
            if (keepCurrentSelection) {
                const selectedMajorIds = toArray(form.getFieldValue("majorIds"));
                const majorSet = new Set(uniqueMajors.map((item)=>item.id));
                form.setFieldValue("majorIds", selectedMajorIds.filter((majorId)=>majorSet.has(majorId)));
            }
        } catch (_error) {
            setMajorOptions([]);
        }
    };
    const fetchData = async ()=>{
        setLoading(true);
        try {
            const user = (()=>{
                const raw = localStorage.getItem("user");
                return raw ? JSON.parse(raw) : null;
            })();
            setSessionUser(user);
            const canListDepartments = managerRoles.includes(user?.role);
            const [activitiesData, typeData, departmentData] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllActivities"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$typeActivity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllTypeActivities"])(),
                canListDepartments ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$department$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllDepartments"])() : Promise.resolve([])
            ]);
            setEvents(Array.isArray(activitiesData) ? activitiesData : []);
            setTypeActivities(Array.isArray(typeData) ? typeData : []);
            if (canListDepartments) {
                setDepartments(Array.isArray(departmentData) ? departmentData : []);
            } else if (user?.department?.id) {
                setDepartments([
                    user.department
                ]);
            } else {
                const eventDepartments = uniqueById((Array.isArray(activitiesData) ? activitiesData : []).flatMap((item)=>toDepartmentList(item)).filter((item)=>item?.id));
                setDepartments(eventDepartments);
            }
        } catch (error) {
            const text = error?.response?.data?.message || "ไม่สามารถโหลดข้อมูลกิจกรรมได้";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(text);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchData();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isFormModalOpen) return;
        loadMajorsByDepartments(toArray(watchedDepartmentIds), true);
    }, [
        watchedDepartmentIds,
        isFormModalOpen
    ]);
    const filteredEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const query = searchQuery.trim().toLowerCase();
        return events.filter((event)=>{
            if (scopedDepartmentId) {
                const scopedDepartmentIds = new Set(toDepartmentList(event).map((item)=>item.id));
                if (!scopedDepartmentIds.has(scopedDepartmentId)) {
                    return false;
                }
            }
            if (query) {
                const departmentNames = toDepartmentList(event).map((item)=>String(item?.name || "")).join(" ").toLowerCase();
                const matchedSearch = String(event.name || event.title || "").toLowerCase().includes(query) || departmentNames.includes(query);
                if (!matchedSearch) return false;
            }
            if (selectedDepartment) {
                const departmentIds = new Set(toDepartmentList(event).map((item)=>item.id));
                if (!departmentIds.has(selectedDepartment)) return false;
            }
            if (selectedCategory) {
                if ((event.typeActivity?.id || event.typeActivityId) !== selectedCategory) {
                    return false;
                }
            }
            return true;
        });
    }, [
        events,
        searchQuery,
        selectedDepartment,
        selectedCategory,
        scopedDepartmentId
    ]);
    const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            totalActivities: filteredEvents.length,
            totalHours: filteredEvents.reduce((sum, event)=>sum + Number(event.hour || event.hours || 0), 0)
        }), [
        filteredEvents
    ]);
    const openCreateModal = async ()=>{
        setEditingEvent(null);
        form.resetFields();
        const defaultDepartmentIds = scopedDepartmentId ? [
            scopedDepartmentId
        ] : [];
        form.setFieldsValue({
            title: "",
            note: "",
            location: "",
            activityTypeId: undefined,
            requiredEvidenceType: "BOTH",
            hours: 1,
            capacity: 1,
            startAt: undefined,
            endAt: undefined,
            applyOpenAt: undefined,
            applyCloseAt: undefined,
            status: "OPEN_REGISTRATION",
            departmentIds: defaultDepartmentIds,
            majorIds: []
        });
        await loadMajorsByDepartments(defaultDepartmentIds, false);
        setIsFormModalOpen(true);
    };
    const openEditModal = async (record)=>{
        setEditingEvent(record);
        const rawDepartmentIds = toArray(record.departmentIds);
        const departmentIds = rawDepartmentIds.length > 0 ? rawDepartmentIds : toDepartmentList(record).map((item)=>item.id);
        const majorIds = toArray(record.majorIds).length > 0 ? toArray(record.majorIds) : toMajorJoinList(record).map((item)=>item.majorId);
        const finalDepartmentIds = scopedDepartmentId ? [
            scopedDepartmentId
        ] : departmentIds;
        form.setFieldsValue({
            title: record.title || record.name || "",
            note: record.note || record.description || "",
            location: record.location || record.address || "",
            activityTypeId: record.typeActivity?.id || record.typeActivityId,
            requiredEvidenceType: record.requiredEvidenceType || "BOTH",
            hours: record.hours || record.hour || 1,
            capacity: record.capacity || record.maxPeopleCount || 1,
            startAt: toDateTimeInput(record.startAt || record.startDate),
            endAt: toDateTimeInput(record.endAt || record.endDate),
            applyOpenAt: toDateTimeInput(record.applyOpenAt || record.applyOpen),
            applyCloseAt: toDateTimeInput(record.applyCloseAt || record.applyClose || record.date),
            status: record.status || "OPEN_REGISTRATION",
            departmentIds: finalDepartmentIds,
            majorIds
        });
        await loadMajorsByDepartments(finalDepartmentIds, false);
        setIsFormModalOpen(true);
    };
    const openViewModal = (record)=>{
        setViewingEvent(record);
        setIsViewModalOpen(true);
    };
    const handleDelete = async (record)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteActivity"])(record.id);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`ลบกิจกรรม "${record.name || record.title}" สำเร็จ`);
            await fetchData();
        } catch (error) {
            const text = error?.response?.data?.message || "ไม่สามารถลบกิจกรรมได้";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(text);
        }
    };
    const buildPayload = (values)=>{
        const selectedDepartmentIds = uniqueById(toArray(values.departmentIds).map((id)=>({
                id
            }))).map((item)=>item.id);
        const departmentIds = scopedDepartmentId && !isManager ? [
            scopedDepartmentId
        ] : selectedDepartmentIds;
        const majorIds = uniqueById(toArray(values.majorIds).map((id)=>({
                id
            }))).map((item)=>item.id);
        return {
            title: values.title,
            note: values.note || "",
            location: values.location,
            activityTypeId: values.activityTypeId,
            requiredEvidenceType: values.requiredEvidenceType || "BOTH",
            hours: Number(values.hours || 1),
            capacity: Number(values.capacity || 1),
            startAt: toIso(values.startAt),
            endAt: toIso(values.endAt),
            applyOpenAt: toIso(values.applyOpenAt || values.startAt),
            applyCloseAt: toIso(values.applyCloseAt || values.startAt),
            status: values.status || "OPEN_REGISTRATION",
            departmentIds,
            majorIds
        };
    };
    const handleSubmit = async (values)=>{
        setSaving(true);
        try {
            const payload = buildPayload(values);
            if (editingEvent) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateActivity"])(editingEvent.id, payload);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("แก้ไขกิจกรรมสำเร็จ");
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createActivity"])(payload);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("เพิ่มกิจกรรมสำเร็จ");
            }
            setIsFormModalOpen(false);
            setEditingEvent(null);
            form.resetFields();
            await fetchData();
        } catch (error) {
            const text = error?.response?.data?.message || (editingEvent ? "ไม่สามารถแก้ไขกิจกรรมได้" : "ไม่สามารถเพิ่มกิจกรรมได้");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(text);
        } finally{
            setSaving(false);
        }
    };
    const departmentFilterOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (departments.length > 0) return departments;
        return uniqueById(events.flatMap((event)=>toDepartmentList(event)));
    }, [
        departments,
        events
    ]);
    const columns = [
        {
            title: "ลำดับ",
            width: 80,
            align: "center",
            render: (_, __, index)=>index + 1
        },
        {
            title: "กิจกรรม",
            dataIndex: "name",
            render: (_, row)=>row.name || row.title || "-"
        },
        {
            title: "ภาควิชา",
            width: 260,
            render: (_, row)=>{
                const departmentList = toDepartmentList(row);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-1",
                    children: departmentList.length > 0 ? departmentList.map((department)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                            color: "blue",
                            children: department.name
                        }, department.id, false, {
                            fileName: "[project]/src/app/admin/event/page.js",
                            lineNumber: 420,
                            columnNumber: 17
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-400",
                        children: "-"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/event/page.js",
                        lineNumber: 425,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/event/page.js",
                    lineNumber: 417,
                    columnNumber: 11
                }, this);
            }
        },
        {
            title: "สาขาวิชา",
            width: 280,
            render: (_, row)=>{
                const majorJoins = toMajorJoinList(row);
                if (majorJoins.length === 0) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-500",
                        children: "ทุกสาขาในภาคที่เลือก"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/event/page.js",
                        lineNumber: 437,
                        columnNumber: 18
                    }, this);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-1",
                    children: majorJoins.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                            color: "#0A894C",
                            children: [
                                item.major?.code ? `${item.major.code} - ` : "",
                                item.major?.name || item.majorId
                            ]
                        }, item.majorId, true, {
                            fileName: "[project]/src/app/admin/event/page.js",
                            lineNumber: 443,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/event/page.js",
                    lineNumber: 441,
                    columnNumber: 11
                }, this);
            }
        },
        {
            title: "ประเภทกิจกรรม",
            width: 180,
            render: (_, row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                    color: "green",
                    children: row.typeActivity?.name || "ยังไม่กำหนดประเภท"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/event/page.js",
                    lineNumber: 456,
                    columnNumber: 9
                }, this)
        },
        {
            title: "นักศึกษา",
            width: 130,
            align: "center",
            render: (_, row)=>{
                const joined = Number(row.peopleCount || 0);
                const max = Number(row.maxPeopleCount || row.maxStudents || 0);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-medium",
                    style: {
                        color: "#0A894C"
                    },
                    children: [
                        joined,
                        "/",
                        max
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/event/page.js",
                    lineNumber: 467,
                    columnNumber: 11
                }, this);
            }
        },
        {
            title: "จัดการ",
            width: 160,
            align: "center",
            render: (_, row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                            type: "text",
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 481,
                                columnNumber: 19
                            }, void 0),
                            onClick: ()=>openViewModal(row),
                            title: "ดูข้อมูล"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/event/page.js",
                            lineNumber: 479,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                            type: "text",
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 487,
                                columnNumber: 19
                            }, void 0),
                            onClick: ()=>openEditModal(row),
                            title: "แก้ไข"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/event/page.js",
                            lineNumber: 485,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$popconfirm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Popconfirm$3e$__["Popconfirm"], {
                            title: "ยืนยันการลบ",
                            description: "ต้องการลบกิจกรรมนี้หรือไม่",
                            onConfirm: ()=>handleDelete(row),
                            okText: "ลบ",
                            cancelText: "ยกเลิก",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                danger: true,
                                type: "text",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 498,
                                    columnNumber: 46
                                }, void 0),
                                title: "ลบ"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 498,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/event/page.js",
                            lineNumber: 491,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/event/page.js",
                    lineNumber: 478,
                    columnNumber: 9
                }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__["Spin"], {
        spinning: loading,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                    className: "mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-12 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-12 lg:col-span-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                    placeholder: "ค้นหาชื่อกิจกรรมหรือภาควิชา",
                                    value: searchQuery,
                                    onChange: (event)=>setSearchQuery(event.target.value),
                                    prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 515,
                                        columnNumber: 25
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 511,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 510,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-12 lg:col-span-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                    allowClear: true,
                                    placeholder: "กรองตามภาควิชา",
                                    value: selectedDepartment,
                                    onChange: setSelectedDepartment,
                                    style: {
                                        width: "100%"
                                    },
                                    options: departmentFilterOptions.map((item)=>({
                                            value: item.id,
                                            label: item.name
                                        }))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 519,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 518,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-12 lg:col-span-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                    allowClear: true,
                                    placeholder: "กรองตามประเภทกิจกรรม",
                                    value: selectedCategory,
                                    onChange: setSelectedCategory,
                                    style: {
                                        width: "100%"
                                    },
                                    options: typeActivities.map((item)=>({
                                            value: item.id,
                                            label: `${item.code} - ${item.name}`
                                        }))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 532,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 531,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-12 lg:col-span-2 flex justify-end",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "primary",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 547,
                                        columnNumber: 23
                                    }, void 0),
                                    onClick: openCreateModal,
                                    style: {
                                        backgroundColor: "#0A894C",
                                        borderColor: "#0A894C"
                                    },
                                    children: "เพิ่มกิจกรรม"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 545,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 544,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/event/page.js",
                        lineNumber: 509,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/event/page.js",
                    lineNumber: 508,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-500",
                                    children: "จำนวนกิจกรรม"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 559,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-3xl font-bold text-[#0A894C]",
                                    children: summary.totalActivities
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 560,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/event/page.js",
                            lineNumber: 558,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-500",
                                    children: "จำนวนชั่วโมงรวม"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 563,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-3xl font-bold text-[#0A894C]",
                                    children: summary.totalHours
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 564,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/event/page.js",
                            lineNumber: 562,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/event/page.js",
                    lineNumber: 557,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                        rowKey: "id",
                        columns: columns,
                        dataSource: filteredEvents,
                        pagination: {
                            pageSize: 10,
                            showSizeChanger: true
                        },
                        scroll: {
                            x: 1200
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/event/page.js",
                        lineNumber: 569,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/event/page.js",
                    lineNumber: 568,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                    title: editingEvent ? "แก้ไขกิจกรรม" : "เพิ่มกิจกรรม",
                    open: isFormModalOpen,
                    onCancel: ()=>{
                        setIsFormModalOpen(false);
                        setEditingEvent(null);
                        form.resetFields();
                    },
                    onOk: ()=>form.submit(),
                    confirmLoading: saving,
                    okText: editingEvent ? "บันทึก" : "สร้าง",
                    cancelText: "ยกเลิก",
                    width: 920,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
                        form: form,
                        layout: "vertical",
                        onFinish: handleSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                label: "ชื่อกิจกรรม",
                                name: "title",
                                rules: [
                                    {
                                        required: true,
                                        message: "กรุณากรอกชื่อกิจกรรม"
                                    }
                                ],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {}, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 598,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 593,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                label: "ประเภทกิจกรรม",
                                name: "activityTypeId",
                                rules: [
                                    {
                                        required: true,
                                        message: "กรุณาเลือกประเภทกิจกรรม"
                                    }
                                ],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                    placeholder: "เลือกประเภทกิจกรรม",
                                    options: typeActivities.map((item)=>({
                                            value: item.id,
                                            label: `${item.code} - ${item.name}`
                                        }))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 606,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 601,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                label: "ภาควิชา (เลือกได้หลายภาควิชา)",
                                name: "departmentIds",
                                rules: [
                                    {
                                        required: true,
                                        message: "กรุณาเลือกภาควิชาอย่างน้อย 1 ภาควิชา"
                                    }
                                ],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                    mode: "multiple",
                                    disabled: !isManager,
                                    placeholder: isManager ? "เลือกภาควิชา" : "ระบบกำหนดภาควิชาตามสิทธิ์",
                                    options: departments.map((item)=>({
                                            value: item.id,
                                            label: `${item.code ? `${item.code} - ` : ""}${item.name}`
                                        }))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 620,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 615,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                label: "สาขาวิชา (ไม่เลือก = ทุกสาขาในภาคที่เลือก)",
                                name: "majorIds",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                    mode: "multiple",
                                    placeholder: "เลือกสาขาวิชา",
                                    options: majorOptions.map((item)=>({
                                            value: item.id,
                                            label: `${item.code} - ${item.name}`
                                        }))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 632,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 631,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                label: "สถานที่",
                                name: "location",
                                rules: [
                                    {
                                        required: true,
                                        message: "กรุณากรอกสถานที่"
                                    }
                                ],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {}, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 647,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 642,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        label: "วันเวลาเริ่มกิจกรรม",
                                        name: "startAt",
                                        rules: [
                                            {
                                                required: true,
                                                message: "กรุณาเลือกวันเวลาเริ่ม"
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            type: "datetime-local"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/event/page.js",
                                            lineNumber: 656,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 651,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        label: "วันเวลาสิ้นสุดกิจกรรม",
                                        name: "endAt",
                                        rules: [
                                            {
                                                required: true,
                                                message: "กรุณาเลือกวันเวลาสิ้นสุด"
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            type: "datetime-local"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/event/page.js",
                                            lineNumber: 663,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 658,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 650,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        label: "วันเวลาเปิดรับสมัคร",
                                        name: "applyOpenAt",
                                        rules: [
                                            {
                                                required: true,
                                                message: "กรุณาเลือกวันเวลาเปิดรับสมัคร"
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            type: "datetime-local"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/event/page.js",
                                            lineNumber: 673,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 668,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        label: "วันเวลาปิดรับสมัคร",
                                        name: "applyCloseAt",
                                        rules: [
                                            {
                                                required: true,
                                                message: "กรุณาเลือกวันเวลาปิดรับสมัคร"
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            type: "datetime-local"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/event/page.js",
                                            lineNumber: 680,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 675,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 667,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        label: "จำนวนชั่วโมงกิจกรรม",
                                        name: "hours",
                                        rules: [
                                            {
                                                required: true,
                                                message: "กรุณากรอกจำนวนชั่วโมง"
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            type: "number",
                                            min: 1
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/event/page.js",
                                            lineNumber: 690,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 685,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        label: "จำนวนนักศึกษาสูงสุด",
                                        name: "capacity",
                                        rules: [
                                            {
                                                required: true,
                                                message: "กรุณากรอกจำนวนรับสูงสุด"
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            type: "number",
                                            min: 1
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/event/page.js",
                                            lineNumber: 697,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 692,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 684,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        label: "หลักฐานที่ต้องใช้",
                                        name: "requiredEvidenceType",
                                        rules: [
                                            {
                                                required: true,
                                                message: "กรุณาเลือกประเภทหลักฐาน"
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                            options: evidenceTypeOptions
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/event/page.js",
                                            lineNumber: 707,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 702,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        label: "สถานะกิจกรรม",
                                        name: "status",
                                        rules: [
                                            {
                                                required: true,
                                                message: "กรุณาเลือกสถานะกิจกรรม"
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                            options: activityStatuses
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/event/page.js",
                                            lineNumber: 714,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 709,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 701,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                label: "รายละเอียดเพิ่มเติม",
                                name: "note",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"].TextArea, {
                                    rows: 4
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/event/page.js",
                                    lineNumber: 719,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 718,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/event/page.js",
                        lineNumber: 592,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/event/page.js",
                    lineNumber: 578,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                    title: "รายละเอียดกิจกรรม",
                    open: isViewModalOpen,
                    onCancel: ()=>{
                        setIsViewModalOpen(false);
                        setViewingEvent(null);
                    },
                    footer: null,
                    width: 780,
                    children: viewingEvent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-gray-500 text-sm",
                                        children: "ชื่อกิจกรรม"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 737,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-medium",
                                        children: viewingEvent.name || viewingEvent.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 738,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 736,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-gray-500 text-sm",
                                        children: "ประเภทกิจกรรม"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 741,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                        color: "green",
                                        children: viewingEvent.typeActivity?.name || "ยังไม่กำหนดประเภท"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 742,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 740,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-gray-500 text-sm",
                                        children: "ภาควิชา"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 745,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-1 mt-1",
                                        children: toDepartmentList(viewingEvent).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                color: "blue",
                                                children: item.name
                                            }, item.id, false, {
                                                fileName: "[project]/src/app/admin/event/page.js",
                                                lineNumber: 748,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 746,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 744,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-gray-500 text-sm",
                                        children: "สาขาวิชา"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 755,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-1 mt-1",
                                        children: toMajorJoinList(viewingEvent).length > 0 ? toMajorJoinList(viewingEvent).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                color: "#0A894C",
                                                children: [
                                                    item.major?.code ? `${item.major.code} - ` : "",
                                                    item.major?.name || item.majorId
                                                ]
                                            }, item.majorId, true, {
                                                fileName: "[project]/src/app/admin/event/page.js",
                                                lineNumber: 759,
                                                columnNumber: 23
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-500 text-sm",
                                            children: "ทุกสาขาในภาคที่เลือก"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/event/page.js",
                                            lineNumber: 765,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 756,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 754,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-500 text-sm",
                                                children: "วันเวลาเริ่มกิจกรรม"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/event/page.js",
                                                lineNumber: 771,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: toDateTimeInput(viewingEvent.startAt || viewingEvent.startDate) || "-"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/event/page.js",
                                                lineNumber: 772,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 770,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-500 text-sm",
                                                children: "วันเวลาสิ้นสุดกิจกรรม"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/event/page.js",
                                                lineNumber: 775,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: toDateTimeInput(viewingEvent.endAt || viewingEvent.endDate) || "-"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/event/page.js",
                                                lineNumber: 776,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 774,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 769,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-gray-500 text-sm",
                                        children: "สถานที่"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 780,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: viewingEvent.location || viewingEvent.address || "-"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 781,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 779,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-gray-500 text-sm",
                                        children: "รายละเอียดเพิ่มเติม"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 784,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: viewingEvent.note || viewingEvent.description || "-"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/event/page.js",
                                        lineNumber: 785,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/event/page.js",
                                lineNumber: 783,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/event/page.js",
                        lineNumber: 735,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/event/page.js",
                    lineNumber: 724,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/event/page.js",
            lineNumber: 507,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/admin/event/page.js",
        lineNumber: 506,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e8b7c1b7._.js.map