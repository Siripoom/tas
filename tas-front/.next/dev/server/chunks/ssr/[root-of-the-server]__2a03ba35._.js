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
"[project]/src/services/attendance.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAttendance",
    ()=>createAttendance,
    "deleteAttendance",
    ()=>deleteAttendance,
    "getAllAttendances",
    ()=>getAllAttendances,
    "getAttendanceById",
    ()=>getAttendanceById,
    "getAttendancesByActivity",
    ()=>getAttendancesByActivity,
    "getAttendancesByUser",
    ()=>getAttendancesByUser,
    "updateAttendance",
    ()=>updateAttendance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/activity.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/compat.js [app-ssr] (ecmascript)");
;
;
;
const flattenAttendances = (activities)=>activities.flatMap((activity)=>(activity.attendances || []).map((attendance)=>({
                ...attendance,
                activityId: attendance.activityId || activity.id,
                activity
            })));
const getAllAttendances = async ()=>{
    const activities = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllActivities"])();
    return flattenAttendances(activities);
};
const getAttendanceById = async (id)=>{
    const attendances = await getAllAttendances();
    return attendances.find((attendance)=>attendance.id === id) || null;
};
const createAttendance = async (data)=>{
    const activityId = data.activityId;
    if (!activityId) {
        throw new Error("activityId is required");
    }
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/activities/${activityId}/apply`);
    return {
        id: response.data.id,
        activityId: response.data.activityId,
        userId: response.data.studentUserId,
        status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapApplicationStatusFromApi"])(response.data.status),
        reason: response.data.remark || null,
        createdAt: response.data.submittedAt,
        updatedAt: response.data.updatedAt
    };
};
const updateAttendance = async (id, data = {})=>{
    const action = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapLegacyAttendanceAction"])(data.status);
    const endpoint = action === "approve" ? "approve" : "request-revision";
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/approvals/${id}/${endpoint}`, {
        remark: data.remark || data.reason || data.rejectReason
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeAttendance"])(response.data);
};
const deleteAttendance = async (_id)=>{
    return {
        success: true
    };
};
const getAttendancesByUser = async (userId)=>{
    const attendances = await getAllAttendances();
    return attendances.filter((attendance)=>attendance.userId === userId || attendance.user?.id === userId || attendance.user?.id === String(userId));
};
const getAttendancesByActivity = async (activityId)=>{
    const activity = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getActivityById"])(activityId);
    return (activity.attendances || []).map((attendance)=>({
            ...attendance,
            activityId,
            activity
        }));
};
}),
"[project]/src/services/file.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteFile",
    ()=>deleteFile,
    "downloadAttendanceFile",
    ()=>downloadAttendanceFile,
    "downloadFile",
    ()=>downloadFile,
    "getAllFiles",
    ()=>getAllFiles,
    "getFileById",
    ()=>getFileById,
    "getFilesByActivity",
    ()=>getFilesByActivity,
    "getFilesByApplication",
    ()=>getFilesByApplication,
    "getFilesByOwner",
    ()=>getFilesByOwner,
    "uploadFileActivity",
    ()=>uploadFileActivity,
    "uploadFileAttendance",
    ()=>uploadFileAttendance,
    "uploadMultipleFiles",
    ()=>uploadMultipleFiles,
    "uploadStudentsCSV",
    ()=>uploadStudentsCSV
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.js [app-ssr] (ecmascript)");
;
const normalizeFile = (file, user = null)=>({
        id: file.id,
        fileName: file.originalName || file.fileName || "file",
        fileType: file.fileType,
        ownerType: file.ownerType,
        ownerId: file.ownerId,
        mimeType: file.mimeType,
        sizeBytes: file.sizeBytes,
        uploadedAt: file.uploadedAt || file.createdAt,
        user,
        downloadUrl: `/files/${file.id}/download`
    });
const getFilesByOwner = async (ownerType, ownerId)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/files", {
        params: {
            ownerType,
            ownerId
        }
    });
    return Array.isArray(response.data) ? response.data.map((item)=>normalizeFile(item)) : [];
};
const getAllFiles = async (params = {})=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/files", {
        params
    });
    return Array.isArray(response.data) ? response.data.map((item)=>normalizeFile(item)) : [];
};
const getFileById = async (id)=>{
    const files = await getAllFiles();
    return files.find((file)=>file.id === id) || null;
};
const uploadFileActivity = async (file, ownerId)=>{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ownerType", "RECORD");
    formData.append("ownerId", ownerId);
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/files/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return normalizeFile(response.data);
};
const uploadFileAttendance = async (file, attendanceId)=>{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ownerType", "APPLICATION");
    formData.append("ownerId", attendanceId);
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/files/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return normalizeFile(response.data);
};
const downloadAttendanceFile = async (attendanceId)=>{
    const files = await getFilesByOwner("APPLICATION", attendanceId);
    if (!files.length) {
        throw new Error("No evidence file found");
    }
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/files/${files[0].id}/download`, {
        responseType: "blob"
    });
    return response.data;
};
const uploadMultipleFiles = async (files, attendanceId)=>{
    const uploaded = await Promise.all(files.slice(0, 3).map((file)=>uploadFileAttendance(file, attendanceId)));
    return uploaded;
};
const uploadStudentsCSV = async ()=>{
    throw new Error("CSV upload is not supported in this build. Use /admin/import/students JSON payload.");
};
const deleteFile = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/files/${id}`);
    return response.data;
};
const downloadFile = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/files/${id}/download`, {
        responseType: "blob"
    });
    return response.data;
};
const getFilesByActivity = async (activityId)=>{
    const detailResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/activities/${activityId}`);
    const activity = detailResponse.data;
    const applications = Array.isArray(activity.applications) ? activity.applications : [];
    const batches = await Promise.all(applications.map(async (application)=>{
        const files = await getFilesByOwner("APPLICATION", application.id);
        return files.map((file)=>({
                ...file,
                user: application.student || null
            }));
    }));
    return batches.flat();
};
const getFilesByApplication = async (applicationId)=>{
    return getFilesByOwner("APPLICATION", applicationId);
};
}),
"[project]/src/app/student/participation/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentParticipationPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-ssr] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-ssr] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-ssr] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-ssr] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-ssr] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-ssr] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-ssr] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/spin/index.js [app-ssr] (ecmascript) <export default as Spin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/table/index.js [app-ssr] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-ssr] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$upload$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/upload/index.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-ssr] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/attendance.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/file.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const { Search } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"];
const statusOptions = [
    {
        value: "APPLIED",
        label: "สมัครแล้ว"
    },
    {
        value: "APPROVED",
        label: "อนุมัติแล้ว"
    },
    {
        value: "REJECTED",
        label: "ไม่อนุมัติ"
    },
    {
        value: "REVISION_REQUIRED",
        label: "ขอแก้ไข"
    },
    {
        value: "SUBMITTED",
        label: "ส่งตรวจแล้ว"
    },
    {
        value: "COMPLETED",
        label: "สำเร็จแล้ว"
    },
    {
        value: "CANCELLED",
        label: "ยกเลิก"
    },
    {
        value: "NO_SHOW",
        label: "ไม่เข้าร่วม"
    }
];
const canUploadStatuses = new Set([
    "APPLIED",
    "APPROVED",
    "REVISION_REQUIRED"
]);
const canReapplyStatuses = new Set([
    "REVISION_REQUIRED",
    "REJECTED"
]);
const canDownloadStatuses = new Set([
    "APPROVED",
    "COMPLETED"
]);
const toDateText = (value)=>{
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};
const toTimeText = (startAt, endAt)=>{
    if (!startAt || !endAt) return "ไม่ระบุเวลา";
    const start = new Date(startAt);
    const end = new Date(endAt);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "ไม่ระบุเวลา";
    return `${start.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit"
    })} - ${end.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit"
    })}`;
};
const statusConfig = {
    APPLIED: {
        color: "blue",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/app/student/participation/page.js",
            lineNumber: 76,
            columnNumber: 35
        }, ("TURBOPACK compile-time value", void 0)),
        text: "สมัครแล้ว"
    },
    APPROVED: {
        color: "green",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/app/student/participation/page.js",
            lineNumber: 77,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0)),
        text: "อนุมัติแล้ว"
    },
    REJECTED: {
        color: "red",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/app/student/participation/page.js",
            lineNumber: 78,
            columnNumber: 35
        }, ("TURBOPACK compile-time value", void 0)),
        text: "ไม่อนุมัติ"
    },
    REVISION_REQUIRED: {
        color: "orange",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/app/student/participation/page.js",
            lineNumber: 79,
            columnNumber: 47
        }, ("TURBOPACK compile-time value", void 0)),
        text: "ขอแก้ไข"
    },
    COMPLETED: {
        color: "green",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/app/student/participation/page.js",
            lineNumber: 80,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0)),
        text: "สำเร็จแล้ว"
    },
    SUBMITTED: {
        color: "gold",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/app/student/participation/page.js",
            lineNumber: 81,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0)),
        text: "ส่งตรวจแล้ว"
    },
    CANCELLED: {
        color: "red",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/app/student/participation/page.js",
            lineNumber: 82,
            columnNumber: 36
        }, ("TURBOPACK compile-time value", void 0)),
        text: "ยกเลิก"
    },
    NO_SHOW: {
        color: "volcano",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/app/student/participation/page.js",
            lineNumber: 83,
            columnNumber: 38
        }, ("TURBOPACK compile-time value", void 0)),
        text: "ไม่เข้าร่วม"
    }
};
const getStatusTag = (status)=>{
    const config = statusConfig[status] || statusConfig.APPLIED;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
        color: config.color,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex items-center gap-1",
            children: [
                config.icon,
                config.text
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/student/participation/page.js",
            lineNumber: 90,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/student/participation/page.js",
        lineNumber: 89,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const getEvidenceStatusTag = (hasFiles)=>hasFiles ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
        color: "blue",
        children: "อัพโหลดแล้ว"
    }, void 0, false, {
        fileName: "[project]/src/app/student/participation/page.js",
        lineNumber: 99,
        columnNumber: 14
    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
        children: "ยังไม่ได้อัพโหลด"
    }, void 0, false, {
        fileName: "[project]/src/app/student/participation/page.js",
        lineNumber: 99,
        columnNumber: 52
    }, ("TURBOPACK compile-time value", void 0));
function StudentParticipationPage() {
    const [userInfo, setUserInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activities, setActivities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reapplyingId, setReapplyingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [downloadingId, setDownloadingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [detailModalVisible, setDetailModalVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [evidenceModalVisible, setEvidenceModalVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedActivity, setSelectedActivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploadFileList, setUploadFileList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const loadActivities = async (user)=>{
        if (!user?.id) return;
        setLoading(true);
        try {
            const attendances = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAttendancesByUser"])(user.id);
            const mapped = await Promise.all(attendances.map(async (attendance)=>{
                const activity = attendance.activity || {};
                const evidenceFiles = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFilesByApplication"])(attendance.id);
                return {
                    id: attendance.id,
                    applicationId: attendance.id,
                    activityId: attendance.activityId || activity.id,
                    name: activity.name || activity.title || "-",
                    category: activity.typeActivity?.name || "ไม่ระบุประเภท",
                    date: toDateText(activity.startAt || activity.startDate),
                    time: toTimeText(activity.startAt || activity.startDate, activity.endAt || activity.endDate),
                    location: activity.location || activity.address || "ไม่ระบุสถานที่",
                    hours: activity.hours || activity.hour || 0,
                    status: attendance.status,
                    remark: attendance.reason || null,
                    evidenceFiles,
                    hasEvidence: evidenceFiles.length > 0
                };
            }));
            setActivities(mapped);
        } catch (error) {
            const text = error?.response?.data?.message || "ไม่สามารถโหลดข้อมูลกิจกรรมได้";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(text);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const raw = localStorage.getItem("user");
            const user = raw ? JSON.parse(raw) : null;
            setUserInfo(user);
            if (user?.id) {
                loadActivities(user);
            } else {
                setLoading(false);
            }
        } catch (_error) {
            setLoading(false);
        }
    }, []);
    const filteredActivities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const query = searchQuery.trim().toLowerCase();
        return activities.filter((activity)=>{
            if (query && !activity.name.toLowerCase().includes(query)) return false;
            if (statusFilter && activity.status !== statusFilter) return false;
            return true;
        });
    }, [
        activities,
        searchQuery,
        statusFilter
    ]);
    const handleRefresh = async ()=>{
        if (userInfo?.id) {
            await loadActivities(userInfo);
        }
    };
    const handleViewDetails = (record)=>{
        setSelectedActivity(record);
        setDetailModalVisible(true);
    };
    const handleOpenUpload = (record)=>{
        setSelectedActivity(record);
        setUploadFileList([]);
        setEvidenceModalVisible(true);
    };
    const handleSubmitEvidence = async ()=>{
        if (!selectedActivity?.applicationId) return;
        if (!uploadFileList.length) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].warning("กรุณาเลือกไฟล์หลักฐาน");
            return;
        }
        const file = uploadFileList[0]?.originFileObj || uploadFileList[0];
        if (!file) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].warning("ไม่พบไฟล์ที่เลือก");
            return;
        }
        setUploading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadFileAttendance"])(file, selectedActivity.applicationId);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("อัพโหลดหลักฐานสำเร็จ");
            setEvidenceModalVisible(false);
            setSelectedActivity(null);
            setUploadFileList([]);
            await handleRefresh();
        } catch (error) {
            const text = error?.response?.data?.message || "อัพโหลดหลักฐานไม่สำเร็จ";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(text);
        } finally{
            setUploading(false);
        }
    };
    const handleReapply = async (record)=>{
        if (!record?.activityId) return;
        setReapplyingId(record.id);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createAttendance"])({
                activityId: record.activityId
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`ขอลงทะเบียนอีกรอบสำหรับ "${record.name}" สำเร็จ`);
            await handleRefresh();
        } catch (error) {
            const text = error?.response?.data?.message || "ไม่สามารถขอลงทะเบียนอีกรอบได้";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(text);
        } finally{
            setReapplyingId(null);
        }
    };
    const handleDownloadEvidence = async (record)=>{
        const file = record?.evidenceFiles?.[0];
        if (!file?.id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].warning("ไม่พบไฟล์หลักฐานสำหรับดาวน์โหลด");
            return;
        }
        setDownloadingId(record.id);
        try {
            const blob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["downloadFile"])(file.id);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = file.fileName || `${record.name || "evidence"}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            const text = error?.response?.data?.message || "ไม่สามารถดาวน์โหลดไฟล์หลักฐานได้";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(text);
        } finally{
            setDownloadingId(null);
        }
    };
    const columns = [
        {
            title: "ชื่อกิจกรรม",
            dataIndex: "name",
            key: "name",
            width: 300,
            render: (text, record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-semibold text-gray-800",
                            children: text
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 275,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-500",
                            children: record.category
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/student/participation/page.js",
                    lineNumber: 274,
                    columnNumber: 9
                }, this)
        },
        {
            title: "วันที่และเวลา",
            key: "datetime",
            width: 260,
            render: (_, record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 mb-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                    size: 14,
                                    className: "text-gray-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 287,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: record.date
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 286,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    size: 14,
                                    className: "text-gray-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 291,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-600",
                                    children: record.time
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 292,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/student/participation/page.js",
                    lineNumber: 285,
                    columnNumber: 9
                }, this)
        },
        {
            title: "ชั่วโมง",
            dataIndex: "hours",
            key: "hours",
            width: 110,
            align: "center",
            render: (hours)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                    color: "blue",
                    children: [
                        hours,
                        " ชม."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/student/participation/page.js",
                    lineNumber: 303,
                    columnNumber: 26
                }, this)
        },
        {
            title: "สถานะ",
            dataIndex: "status",
            key: "status",
            width: 150,
            render: (status)=>getStatusTag(status)
        },
        {
            title: "หลักฐาน",
            key: "evidence",
            width: 130,
            render: (_, record)=>getEvidenceStatusTag(record.hasEvidence)
        },
        {
            title: "การจัดการ",
            key: "actions",
            width: 220,
            align: "center",
            render: (_, record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                    size: "small",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                            type: "link",
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/student/participation/page.js",
                                lineNumber: 327,
                                columnNumber: 19
                            }, void 0),
                            onClick: ()=>handleViewDetails(record),
                            style: {
                                color: "#0A894C",
                                padding: 0
                            },
                            title: "ดูรายละเอียด"
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 325,
                            columnNumber: 11
                        }, this),
                        canUploadStatuses.has(record.status) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                            type: "link",
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/student/participation/page.js",
                                lineNumber: 335,
                                columnNumber: 21
                            }, void 0),
                            onClick: ()=>handleOpenUpload(record),
                            style: {
                                color: "#0A894C",
                                padding: 0
                            },
                            title: "อัพโหลดหลักฐาน"
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 333,
                            columnNumber: 13
                        }, this),
                        canReapplyStatuses.has(record.status) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                            type: "link",
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/student/participation/page.js",
                                lineNumber: 344,
                                columnNumber: 21
                            }, void 0),
                            loading: reapplyingId === record.id,
                            onClick: ()=>handleReapply(record),
                            style: {
                                color: "#1890ff",
                                padding: 0
                            },
                            title: "ขอลงทะเบียนอีกรอบ"
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 342,
                            columnNumber: 13
                        }, this),
                        canDownloadStatuses.has(record.status) && record.hasEvidence && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                            type: "link",
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/student/participation/page.js",
                                lineNumber: 354,
                                columnNumber: 21
                            }, void 0),
                            loading: downloadingId === record.id,
                            onClick: ()=>handleDownloadEvidence(record),
                            style: {
                                color: "#0A894C",
                                padding: 0
                            },
                            title: "ดาวน์โหลดหลักฐาน"
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 352,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/student/participation/page.js",
                    lineNumber: 324,
                    columnNumber: 9
                }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                className: "mb-6 shadow-sm",
                style: {
                    background: "linear-gradient(135deg, #0A894C 0%, #0ea258 100%)",
                    border: "none"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold mb-1",
                            children: "กิจกรรมของฉัน"
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 376,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm opacity-90",
                            children: "ติดตามสถานะการสมัครและการส่งหลักฐาน"
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 377,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/student/participation/page.js",
                    lineNumber: 375,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/student/participation/page.js",
                lineNumber: 368,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                className: "mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row gap-3 md:items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Search, {
                                placeholder: "ค้นหากิจกรรม...",
                                allowClear: true,
                                value: searchQuery,
                                onChange: (event)=>setSearchQuery(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/src/app/student/participation/page.js",
                                lineNumber: 384,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 383,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full md:w-52",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                placeholder: "กรองตามสถานะ",
                                allowClear: true,
                                value: statusFilter,
                                onChange: setStatusFilter,
                                style: {
                                    width: "100%"
                                },
                                options: statusOptions
                            }, void 0, false, {
                                fileName: "[project]/src/app/student/participation/page.js",
                                lineNumber: 392,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 391,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/student/participation/page.js",
                                lineNumber: 401,
                                columnNumber: 25
                            }, void 0),
                            onClick: handleRefresh,
                            loading: loading,
                            children: "รีเฟรช"
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 401,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/student/participation/page.js",
                    lineNumber: 382,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/student/participation/page.js",
                lineNumber: 381,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                    rowKey: "id",
                    columns: columns,
                    dataSource: filteredActivities,
                    loading: loading,
                    pagination: {
                        pageSize: 10,
                        showTotal: (total)=>`ทั้งหมด ${total} กิจกรรม`
                    },
                    scroll: {
                        x: 1000
                    },
                    locale: {
                        emptyText: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__["Spin"], {}, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 419,
                            columnNumber: 34
                        }, void 0) : "ไม่พบข้อมูลกิจกรรม"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/student/participation/page.js",
                    lineNumber: 408,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/student/participation/page.js",
                lineNumber: 407,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                title: "รายละเอียดกิจกรรม",
                open: detailModalVisible,
                onCancel: ()=>{
                    setDetailModalVisible(false);
                    setSelectedActivity(null);
                },
                footer: null,
                children: selectedActivity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: selectedActivity.name
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 435,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                            color: "green",
                            children: selectedActivity.category
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 436,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                    size: 16,
                                    className: "inline mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 438,
                                    columnNumber: 15
                                }, this),
                                selectedActivity.date
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 437,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    size: 16,
                                    className: "inline mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 442,
                                    columnNumber: 15
                                }, this),
                                selectedActivity.time,
                                " (",
                                selectedActivity.hours,
                                " ชั่วโมง)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 441,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                    size: 16,
                                    className: "inline mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 446,
                                    columnNumber: 15
                                }, this),
                                selectedActivity.location
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 445,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-700 mr-2",
                                    children: "สถานะ:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 450,
                                    columnNumber: 15
                                }, this),
                                getStatusTag(selectedActivity.status)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 449,
                            columnNumber: 13
                        }, this),
                        (selectedActivity.status === "REVISION_REQUIRED" || selectedActivity.status === "REJECTED") && selectedActivity.remark && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                            type: selectedActivity.status === "REJECTED" ? "error" : "warning",
                            message: selectedActivity.status === "REJECTED" ? "ไม่อนุมัติ" : "ต้องแก้ไขหลักฐาน",
                            description: selectedActivity.remark
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 456,
                            columnNumber: 17
                        }, this),
                        canReapplyStatuses.has(selectedActivity.status) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/student/participation/page.js",
                                lineNumber: 465,
                                columnNumber: 23
                            }, void 0),
                            onClick: ()=>handleReapply(selectedActivity),
                            loading: reapplyingId === selectedActivity.id,
                            children: "ขอลงทะเบียนอีกรอบ"
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 464,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/student/participation/page.js",
                    lineNumber: 434,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/student/participation/page.js",
                lineNumber: 424,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                title: "อัพโหลดหลักฐานกิจกรรม",
                open: evidenceModalVisible,
                onOk: handleSubmitEvidence,
                onCancel: ()=>{
                    setEvidenceModalVisible(false);
                    setSelectedActivity(null);
                    setUploadFileList([]);
                },
                okText: "บันทึก",
                cancelText: "ยกเลิก",
                confirmLoading: uploading,
                okButtonProps: {
                    style: {
                        backgroundColor: "#0A894C",
                        borderColor: "#0A894C"
                    }
                },
                children: selectedActivity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-semibold",
                                    children: selectedActivity.name
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 495,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600",
                                    children: selectedActivity.category
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 496,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 494,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$upload$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"].Dragger, {
                            accept: ".pdf",
                            fileList: uploadFileList,
                            maxCount: 1,
                            beforeUpload: (file)=>{
                                const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name || "");
                                if (!isPdf) {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("รองรับเฉพาะไฟล์ PDF เท่านั้น");
                                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$upload$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"].LIST_IGNORE;
                                }
                                return false;
                            },
                            onChange: ({ fileList })=>setUploadFileList(fileList),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "ant-upload-drag-icon flex justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        size: 44,
                                        style: {
                                            color: "#0A894C"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/student/participation/page.js",
                                        lineNumber: 514,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 513,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "ant-upload-text",
                                    children: "คลิกหรือลากไฟล์มาเพื่ออัพโหลด"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 516,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "ant-upload-hint",
                                    children: "รองรับเฉพาะไฟล์ PDF เท่านั้น"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 517,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 499,
                            columnNumber: 13
                        }, this),
                        selectedActivity.evidenceFiles?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                    className: "font-medium mb-2",
                                    children: "ไฟล์ที่มีอยู่แล้ว"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 522,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: selectedActivity.evidenceFiles.map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2 rounded border bg-gray-50 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                    size: 15,
                                                    className: "inline mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/student/participation/page.js",
                                                    lineNumber: 526,
                                                    columnNumber: 23
                                                }, this),
                                                file.fileName
                                            ]
                                        }, file.id, true, {
                                            fileName: "[project]/src/app/student/participation/page.js",
                                            lineNumber: 525,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/participation/page.js",
                                    lineNumber: 523,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/student/participation/page.js",
                            lineNumber: 521,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/student/participation/page.js",
                    lineNumber: 493,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/student/participation/page.js",
                lineNumber: 476,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/student/participation/page.js",
        lineNumber: 367,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2a03ba35._.js.map