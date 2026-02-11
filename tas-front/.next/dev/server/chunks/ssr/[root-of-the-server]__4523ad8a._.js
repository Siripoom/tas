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
"[project]/src/services/user.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createUser",
    ()=>createUser,
    "deleteUser",
    ()=>deleteUser,
    "getAllUsers",
    ()=>getAllUsers,
    "getUserById",
    ()=>getUserById,
    "getUsersByType",
    ()=>getUsersByType,
    "updateUser",
    ()=>updateUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/compat.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/activity.js [app-ssr] (ecmascript)");
;
;
;
const getCurrentUser = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
};
const normalizeUserList = (items)=>items.map((item)=>{
        const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeUser"])(item);
        return {
            ...user,
            userType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["roleToUserType"])(item.role),
            department: user.department,
            major: user.major,
            departmentId: user.departmentId,
            majorId: user.majorId,
            level: user.level,
            studentId: user.studentId,
            role: item.role,
            studentProfile: item.studentProfile || null,
            teacherProfile: item.teacherProfile || null,
            staffProfile: item.staffProfile || null
        };
    });
const buildCreatePayload = (userData = {})=>{
    const currentUser = getCurrentUser();
    const role = userData.role || "STUDENT";
    const payload = {
        username: userData.username || userData.email || userData.studentProfile?.studentCode || `user_${Date.now()}`,
        email: userData.email || undefined,
        password: userData.password || "ChangeMe123!",
        firstName: userData.firstName,
        lastName: userData.lastName || "",
        phone: userData.phone || undefined,
        role,
        status: userData.status || "ACTIVE"
    };
    const fallbackFacultyId = currentUser?.facultyId || userData.facultyId;
    if (role === "STUDENT") {
        payload.studentProfile = {
            studentCode: userData.studentProfile?.studentCode || userData.studentCode,
            facultyId: userData.studentProfile?.facultyId || userData.facultyId || fallbackFacultyId,
            departmentId: userData.studentProfile?.departmentId || userData.departmentId,
            majorId: userData.studentProfile?.majorId || userData.majorId,
            classYear: Number(userData.studentProfile?.classYear || userData.classYear || userData.level) || 1,
            academicYear: Number(userData.studentProfile?.academicYear || userData.academicYear) || 2568,
            registrarVerified: Boolean(userData.studentProfile?.registrarVerified ?? true)
        };
    }
    if (role === "TEACHER") {
        payload.teacherProfile = {
            employeeCode: userData.teacherProfile?.employeeCode || userData.employeeCode || undefined,
            facultyId: userData.teacherProfile?.facultyId || userData.facultyId || fallbackFacultyId,
            departmentId: userData.teacherProfile?.departmentId || userData.departmentId
        };
    }
    if (role === "DEPT_STAFF" || role === "FACULTY_ADMIN") {
        const staffType = role === "FACULTY_ADMIN" ? "FACULTY_ADMIN" : "DEPT_STAFF";
        payload.staffProfile = {
            staffType,
            facultyId: userData.staffProfile?.facultyId || userData.facultyId || fallbackFacultyId,
            departmentId: staffType === "FACULTY_ADMIN" ? null : userData.staffProfile?.departmentId || userData.departmentId
        };
    }
    return payload;
};
const buildUpdatePayload = (userData = {})=>{
    const role = userData.role;
    const payload = {
        username: userData.username,
        email: userData.email,
        password: userData.password || undefined,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        status: userData.status
    };
    if (role === "STUDENT") {
        payload.studentProfile = userData.studentProfile || {
            studentCode: userData.studentCode,
            facultyId: userData.facultyId,
            departmentId: userData.departmentId,
            majorId: userData.majorId,
            classYear: userData.classYear || userData.level,
            academicYear: userData.academicYear,
            registrarVerified: userData.registrarVerified
        };
    }
    if (role === "TEACHER") {
        payload.teacherProfile = userData.teacherProfile || {
            employeeCode: userData.employeeCode,
            facultyId: userData.facultyId,
            departmentId: userData.departmentId
        };
    }
    if (role === "DEPT_STAFF" || role === "FACULTY_ADMIN") {
        const staffType = role === "FACULTY_ADMIN" ? "FACULTY_ADMIN" : "DEPT_STAFF";
        payload.staffProfile = userData.staffProfile || {
            staffType,
            facultyId: userData.facultyId,
            departmentId: staffType === "FACULTY_ADMIN" ? null : userData.departmentId
        };
    }
    return payload;
};
const compact = (obj)=>Object.fromEntries(Object.entries(obj).filter(([, value])=>value !== undefined));
const getAllUsers = async (params = {})=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/users", {
        params
    });
    const data = Array.isArray(response.data) ? response.data : [];
    return normalizeUserList(data);
};
const getUsersByType = async (userType)=>{
    try {
        const users = await getAllUsers();
        return users.filter((user)=>user.userType === userType);
    } catch (error) {
        if (userType !== "student") {
            throw error;
        }
        const activities = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllActivities"])();
        const seen = new Map();
        activities.forEach((activity)=>{
            (activity.attendances || []).forEach((attendance)=>{
                const user = attendance.user;
                if (!user?.id || seen.has(user.id)) return;
                seen.set(user.id, {
                    ...user,
                    userType: "student"
                });
            });
        });
        return Array.from(seen.values());
    }
};
const getUserById = async (userId)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/users/${userId}`);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeUser"])(response.data);
};
const createUser = async (userData)=>{
    const payload = buildCreatePayload(userData);
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/users", payload);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeUser"])(response.data);
};
const updateUser = async (userId, userData)=>{
    const payload = compact(buildUpdatePayload(userData));
    if (payload.studentProfile) payload.studentProfile = compact(payload.studentProfile);
    if (payload.teacherProfile) payload.teacherProfile = compact(payload.teacherProfile);
    if (payload.staffProfile) payload.staffProfile = compact(payload.staffProfile);
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/users/${userId}`, payload);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeUser"])(response.data);
};
const deleteUser = async (userId)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/users/${userId}`);
    return response.data;
};
}),
"[project]/src/app/admin/home/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminHome
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-ssr] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-ssr] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-ssr] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-ssr] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$progress$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Progress$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/progress/index.js [app-ssr] (ecmascript) <export default as Progress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-ssr] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/spin/index.js [app-ssr] (ecmascript) <export default as Spin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-ssr] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/user.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/activity.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const { Option } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"];
const categoryPalette = [
    {
        color: "#0A894C",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/app/admin/home/page.js",
            lineNumber: 20,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        color: "#1890ff",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/app/admin/home/page.js",
            lineNumber: 21,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        color: "#fa8c16",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/app/admin/home/page.js",
            lineNumber: 22,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        color: "#52c41a",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/app/admin/home/page.js",
            lineNumber: 23,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        color: "#eb2f96",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/app/admin/home/page.js",
            lineNumber: 24,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        color: "#722ed1",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/app/admin/home/page.js",
            lineNumber: 25,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0))
    }
];
const hashText = (value = "")=>Array.from(String(value)).reduce((sum, char)=>sum + char.charCodeAt(0), 0);
function AdminHome() {
    const themeColor = "#0A894C";
    const [selectedDepartment, setSelectedDepartment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activities, setActivities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categoryActivities, setCategoryActivities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [departments, setDepartments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Fetch data from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchData();
    }, []);
    const fetchData = async ()=>{
        setLoading(true);
        try {
            const [usersData, activitiesData] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllUsers"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllActivities"])()
            ]);
            setUsers(usersData);
            setActivities(activitiesData);
            const departmentMap = new Map();
            activitiesData.forEach((activity)=>{
                const activityDepartments = Array.isArray(activity.departments) && activity.departments.length > 0 ? activity.departments : activity.department?.id ? [
                    activity.department
                ] : [];
                activityDepartments.forEach((department)=>{
                    if (department?.id) {
                        departmentMap.set(department.id, department);
                    }
                });
            });
            const departmentList = Array.from(departmentMap.values()).sort((a, b)=>String(a.name || "").localeCompare(String(b.name || ""), "th"));
            setDepartments(departmentList);
            if (departmentList.length > 0 && !selectedDepartment) {
                setSelectedDepartment(departmentList[0].id);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally{
            setLoading(false);
        }
    };
    // Fetch category activities when department changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchCategoryActivities = async ()=>{
            if (!selectedDepartment) {
                setCategoryActivities([]);
                return;
            }
            try {
                setLoading(true);
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getActivitiesWithQuery"])({
                    departmentId: selectedDepartment
                });
                setCategoryActivities(data.activities || []);
            } catch (error) {
                console.error("Error fetching category activities:", error);
                setCategoryActivities([]);
            } finally{
                setLoading(false);
            }
        };
        if (departments.length > 0) {
            fetchCategoryActivities();
        }
    }, [
        selectedDepartment,
        departments
    ]);
    // Calculate stats from real data
    const getStats = ()=>{
        const totalUsers = users.length;
        const totalEvents = activities.length;
        const activeEvents = activities.filter((a)=>a.status === "IN_PROGRESS").length;
        const pendingReports = activities.filter((a)=>a.status === "OPEN_REGISTRATION").length;
        return [
            {
                title: "Total Users",
                value: totalUsers,
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                    size: 24,
                    style: {
                        color: themeColor
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/home/page.js",
                    lineNumber: 129,
                    columnNumber: 15
                }, this),
                color: themeColor
            },
            {
                title: "Total Events",
                value: totalEvents,
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                    size: 24,
                    style: {
                        color: "#0db359"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/home/page.js",
                    lineNumber: 135,
                    columnNumber: 15
                }, this),
                color: "#0db359"
            },
            {
                title: "Pending Reports",
                value: pendingReports,
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                    size: 24,
                    style: {
                        color: "#086b3d"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/home/page.js",
                    lineNumber: 141,
                    columnNumber: 15
                }, this),
                color: "#086b3d"
            },
            {
                title: "Active Events",
                value: activeEvents,
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                    size: 24,
                    style: {
                        color: "#05c168"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/home/page.js",
                    lineNumber: 147,
                    columnNumber: 15
                }, this),
                color: "#05c168"
            }
        ];
    };
    // Get current activity data based on selected department
    const getCurrentActivityData = ()=>{
        const filteredActivities = categoryActivities;
        const categoryMap = new Map();
        filteredActivities.forEach((activity)=>{
            const categoryId = activity.typeActivity?.id || activity.typeActivityId || "unknown";
            const categoryName = activity.typeActivity?.name || "ยังไม่กำหนดประเภท";
            const palette = categoryPalette[hashText(categoryId) % categoryPalette.length];
            if (!categoryMap.has(categoryId)) {
                categoryMap.set(categoryId, {
                    id: categoryId,
                    name: categoryName,
                    nameEn: categoryName,
                    eventsCount: 0,
                    currentHours: 0,
                    targetHours: 60,
                    color: palette.color,
                    icon: palette.icon
                });
            }
            const category = categoryMap.get(categoryId);
            category.eventsCount += 1;
            category.currentHours += activity.hour || 0;
        });
        return Array.from(categoryMap.values());
    };
    // Get recent activities
    const getRecentActivities = ()=>{
        return activities.sort((a, b)=>new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)).slice(0, 4);
    };
    const selectedDepartmentName = departments.find((department)=>department.id === selectedDepartment)?.name || "-";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__["Spin"], {
        spinning: loading,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                    gutter: [
                        16,
                        16
                    ],
                    children: getStats().map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                            xs: 24,
                            sm: 12,
                            lg: 6,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                hoverable: true,
                                className: "shadow-sm",
                                styles: {
                                    body: {
                                        padding: "24px"
                                    }
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-500 text-sm mb-1",
                                                    children: stat.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                    lineNumber: 213,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-2xl font-bold",
                                                    style: {
                                                        color: stat.color
                                                    },
                                                    children: stat.value
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                    lineNumber: 214,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/home/page.js",
                                            lineNumber: 212,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3 rounded-full",
                                            style: {
                                                backgroundColor: `${stat.color}15`
                                            },
                                            children: stat.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/home/page.js",
                                            lineNumber: 221,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/home/page.js",
                                    lineNumber: 211,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/home/page.js",
                                lineNumber: 204,
                                columnNumber: 15
                            }, this)
                        }, index, false, {
                            fileName: "[project]/src/app/admin/home/page.js",
                            lineNumber: 203,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/home/page.js",
                    lineNumber: 201,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                    fileName: "[project]/src/app/admin/home/page.js",
                    lineNumber: 232,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                    className: "mt-6 shadow-sm",
                    styles: {
                        header: {
                            backgroundColor: "#e8f5e9",
                            borderBottom: "2px solid #0A894C",
                            color: "#086b3d",
                            fontWeight: "600"
                        }
                    },
                    title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 ",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                size: 20,
                                style: {
                                    color: "#0A894C"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/home/page.js",
                                lineNumber: 246,
                                columnNumber: 15
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "จำนวนชั่วโมงกิจกรรมตามประเภท"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/home/page.js",
                                lineNumber: 247,
                                columnNumber: 15
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/home/page.js",
                        lineNumber: 245,
                        columnNumber: 13
                    }, void 0),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: "ภาควิชา (Department)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/home/page.js",
                                        lineNumber: 254,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        value: selectedDepartment,
                                        onChange: setSelectedDepartment,
                                        style: {
                                            width: "100%"
                                        },
                                        size: "large",
                                        children: departments.map((dept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: dept.id,
                                                children: dept.name
                                            }, dept.id, false, {
                                                fileName: "[project]/src/app/admin/home/page.js",
                                                lineNumber: 264,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/home/page.js",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/home/page.js",
                                lineNumber: 253,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/home/page.js",
                            lineNumber: 252,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                            gutter: [
                                16,
                                16
                            ],
                            children: getCurrentActivityData().map((category)=>{
                                const percentage = Math.round(category.currentHours / category.targetHours * 100);
                                const remainingHours = category.targetHours - category.currentHours;
                                const isComplete = category.currentHours >= category.targetHours;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    xs: 24,
                                    md: 12,
                                    lg: 8,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                        hoverable: true,
                                        className: "h-full",
                                        style: {
                                            borderLeft: `4px solid ${category.color}`,
                                            backgroundColor: "#fafafa"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-2 rounded-lg",
                                                                    style: {
                                                                        backgroundColor: `${category.color}15`,
                                                                        color: category.color
                                                                    },
                                                                    children: category.icon
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 296,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                            className: "font-semibold text-sm mb-1",
                                                                            style: {
                                                                                color: category.color
                                                                            },
                                                                            children: category.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/admin/home/page.js",
                                                                            lineNumber: 306,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-gray-500",
                                                                            children: category.nameEn
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/admin/home/page.js",
                                                                            lineNumber: 312,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 305,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/home/page.js",
                                                            lineNumber: 295,
                                                            columnNumber: 25
                                                        }, this),
                                                        isComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-1 rounded-full",
                                                            style: {
                                                                backgroundColor: "#52c41a15"
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                size: 16,
                                                                style: {
                                                                    color: "#52c41a"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/home/page.js",
                                                                lineNumber: 322,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/home/page.js",
                                                            lineNumber: 318,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                    lineNumber: 294,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-3 gap-2 pt-2 border-t",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-500 mb-1",
                                                                    children: "กิจกรรม"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 333,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-lg font-bold text-gray-800",
                                                                    children: category.eventsCount
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 334,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/home/page.js",
                                                            lineNumber: 332,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-center border-l border-r",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-500 mb-1",
                                                                    children: "ชั่วโมง"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 339,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-lg font-bold",
                                                                    style: {
                                                                        color: isComplete ? "#52c41a" : category.color
                                                                    },
                                                                    children: category.currentHours
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 340,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/home/page.js",
                                                            lineNumber: 338,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-500 mb-1",
                                                                    children: remainingHours > 0 ? "ขาด" : "เกิน"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 350,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-lg font-bold",
                                                                    style: {
                                                                        color: remainingHours > 0 ? "#fa8c16" : remainingHours < 0 ? "#52c41a" : "#0A894C"
                                                                    },
                                                                    children: Math.abs(remainingHours)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 353,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/home/page.js",
                                                            lineNumber: 349,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                    lineNumber: 331,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-600",
                                                                    children: "ความคืบหน้า"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 372,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold",
                                                                    style: {
                                                                        color: isComplete ? "#52c41a" : category.color
                                                                    },
                                                                    children: [
                                                                        category.currentHours,
                                                                        "/",
                                                                        category.targetHours,
                                                                        " ชม."
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 373,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/home/page.js",
                                                            lineNumber: 371,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$progress$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Progress$3e$__["Progress"], {
                                                            percent: percentage,
                                                            strokeColor: isComplete ? "#52c41a" : percentage >= 80 ? category.color : percentage >= 50 ? "#fa8c16" : "#f5222d",
                                                            showInfo: false,
                                                            size: "small"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/home/page.js",
                                                            lineNumber: 382,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-xs text-gray-500",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "0%"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 397,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium",
                                                                    children: [
                                                                        percentage,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 398,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "100%"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                                    lineNumber: 399,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/home/page.js",
                                                            lineNumber: 396,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                    lineNumber: 370,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-2 border-t",
                                                    children: isComplete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center gap-2 py-1 px-3 rounded-full bg-green-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                size: 14,
                                                                style: {
                                                                    color: "#52c41a"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/home/page.js",
                                                                lineNumber: 407,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-medium text-green-700",
                                                                children: "ครบชั่วโมงแล้ว"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/home/page.js",
                                                                lineNumber: 411,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/home/page.js",
                                                        lineNumber: 406,
                                                        columnNumber: 27
                                                    }, this) : remainingHours <= 10 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center gap-2 py-1 px-3 rounded-full bg-orange-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                                size: 14,
                                                                style: {
                                                                    color: "#fa8c16"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/home/page.js",
                                                                lineNumber: 417,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-medium text-orange-700",
                                                                children: "ใกล้ครบชั่วโมง"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/home/page.js",
                                                                lineNumber: 421,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/home/page.js",
                                                        lineNumber: 416,
                                                        columnNumber: 27
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center gap-2 py-1 px-3 rounded-full bg-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                size: 14,
                                                                style: {
                                                                    color: "#666"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/home/page.js",
                                                                lineNumber: 427,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-medium text-gray-600",
                                                                children: "ดำเนินการต่อ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/home/page.js",
                                                                lineNumber: 428,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/home/page.js",
                                                        lineNumber: 426,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                    lineNumber: 404,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/home/page.js",
                                            lineNumber: 292,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/home/page.js",
                                        lineNumber: 284,
                                        columnNumber: 19
                                    }, this)
                                }, category.id, false, {
                                    fileName: "[project]/src/app/admin/home/page.js",
                                    lineNumber: 283,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/home/page.js",
                            lineNumber: 273,
                            columnNumber: 11
                        }, this),
                        getCurrentActivityData().length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 p-4 rounded-lg bg-green-50 border border-green-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between flex-wrap gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2 rounded-full",
                                                style: {
                                                    backgroundColor: "#0A894C"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                    size: 20,
                                                    style: {
                                                        color: "white"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/home/page.js",
                                                    lineNumber: 450,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/home/page.js",
                                                lineNumber: 446,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-gray-800",
                                                        children: [
                                                            "สรุปภาพรวม ",
                                                            selectedDepartmentName
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/home/page.js",
                                                        lineNumber: 453,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-600",
                                                        children: [
                                                            "จำนวนกิจกรรมทั้งหมด:",
                                                            " ",
                                                            getCurrentActivityData().reduce((sum, cat)=>sum + cat.eventsCount, 0),
                                                            " ",
                                                            "กิจกรรม | ชั่วโมงรวม:",
                                                            " ",
                                                            getCurrentActivityData().reduce((sum, cat)=>sum + cat.currentHours, 0),
                                                            "/",
                                                            getCurrentActivityData().reduce((sum, cat)=>sum + cat.targetHours, 0),
                                                            " ",
                                                            "ชั่วโมง"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/home/page.js",
                                                        lineNumber: 456,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/home/page.js",
                                                lineNumber: 452,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/home/page.js",
                                        lineNumber: 445,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-600",
                                                children: "ความคืบหน้ารวม:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/home/page.js",
                                                lineNumber: 477,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-bold",
                                                style: {
                                                    color: "#0A894C"
                                                },
                                                children: [
                                                    Math.round(getCurrentActivityData().reduce((sum, cat)=>sum + cat.currentHours, 0) / getCurrentActivityData().reduce((sum, cat)=>sum + cat.targetHours, 0) * 100),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/home/page.js",
                                                lineNumber: 478,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/home/page.js",
                                        lineNumber: 476,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/home/page.js",
                                lineNumber: 444,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/home/page.js",
                            lineNumber: 443,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/home/page.js",
                    lineNumber: 234,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                    gutter: [
                        16,
                        16
                    ],
                    className: "mt-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        lg: 16,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            title: "Recent Activities",
                            className: "shadow-sm",
                            styles: {
                                header: {
                                    backgroundColor: "#e8f5e9",
                                    borderBottom: "2px solid #0A894C",
                                    color: "#086b3d",
                                    fontWeight: "600"
                                }
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: getRecentActivities().map((activity, index)=>{
                                    const timeAgo = activity.updatedAt ? new Date(activity.updatedAt).toLocaleDateString("th-TH") : new Date(activity.createdAt).toLocaleDateString("th-TH");
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between p-3 rounded-lg transition-colors",
                                        style: {
                                            backgroundColor: "#f1f8f4",
                                            borderLeft: "3px solid #0A894C"
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.backgroundColor = "#e8f5e9";
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.backgroundColor = "#f1f8f4";
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 rounded-full",
                                                        style: {
                                                            backgroundColor: "#0A894C"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/home/page.js",
                                                        lineNumber: 537,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-gray-800",
                                                                children: activity.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/home/page.js",
                                                                lineNumber: 542,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500",
                                                                children: [
                                                                    activity.department?.name,
                                                                    " • ",
                                                                    timeAgo
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/home/page.js",
                                                                lineNumber: 545,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/home/page.js",
                                                        lineNumber: 541,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/home/page.js",
                                                lineNumber: 536,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                color: activity.status === "CLOSED" ? "green" : activity.status === "IN_PROGRESS" ? "blue" : activity.status === "CANCELLED" ? "red" : "orange",
                                                children: activity.status
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/home/page.js",
                                                lineNumber: 550,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, activity.id, true, {
                                        fileName: "[project]/src/app/admin/home/page.js",
                                        lineNumber: 522,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/home/page.js",
                                lineNumber: 515,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/home/page.js",
                            lineNumber: 503,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/home/page.js",
                        lineNumber: 502,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/home/page.js",
                    lineNumber: 501,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/home/page.js",
            lineNumber: 200,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/admin/home/page.js",
        lineNumber: 199,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4523ad8a._.js.map