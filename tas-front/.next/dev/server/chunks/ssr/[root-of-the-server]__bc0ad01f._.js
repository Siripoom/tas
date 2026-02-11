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
"[project]/src/services/auth.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "changePassword",
    ()=>changePassword,
    "login",
    ()=>login,
    "refresh",
    ()=>refresh,
    "registerStudent",
    ()=>registerStudent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/compat.js [app-ssr] (ecmascript)");
;
;
const login = async (email, password)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/auth/login", {
        email: String(email),
        password: String(password)
    });
    const data = response.data;
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeUser"])(data.user);
    return {
        token: data.accessToken,
        refreshToken: data.refreshToken,
        accessToken: data.accessToken,
        user
    };
};
const refresh = async (refreshToken)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/auth/refresh", {
        refreshToken
    });
    return response.data;
};
const changePassword = async (currentPassword, newPassword)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/auth/change-password", {
        currentPassword,
        newPassword
    });
    return response.data;
};
const registerStudent = async (payload)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/auth/register-student", payload);
    return response.data;
};
}),
"[project]/src/app/student/profile/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentProfilePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-ssr] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-ssr] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-ssr] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-ssr] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/form/index.js [app-ssr] (ecmascript) <export default as Form>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-ssr] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-ssr] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-ssr] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/key-round.js [app-ssr] (ecmascript) <export default as KeyRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/auth.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const toText = (value)=>value === null || value === undefined || value === "" ? "-" : String(value);
function StudentProfilePage() {
    const [passwordForm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm();
    const [savingPassword, setSavingPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userInfo, setUserInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const raw = localStorage.getItem("user");
            const user = raw ? JSON.parse(raw) : null;
            setUserInfo(user);
        } catch (_error) {
            setUserInfo(null);
        }
    }, []);
    const studentData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            fullName: userInfo?.fullname || [
                userInfo?.firstName,
                userInfo?.lastName
            ].filter(Boolean).join(" "),
            studentCode: userInfo?.studentId,
            email: userInfo?.email,
            phone: userInfo?.phone,
            faculty: userInfo?.facultyName || userInfo?.faculty?.name,
            department: userInfo?.departmentName || userInfo?.department?.name,
            major: userInfo?.major?.name,
            classYear: userInfo?.level,
            academicYear: userInfo?.academicYear
        }), [
        userInfo
    ]);
    const handleChangePassword = async (values)=>{
        setSavingPassword(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["changePassword"])(values.currentPassword, values.newPassword);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("เปลี่ยนรหัสผ่านสำเร็จ");
            passwordForm.resetFields();
        } catch (error) {
            const text = error?.response?.data?.message || "ไม่สามารถเปลี่ยนรหัสผ่านได้";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(text);
        } finally{
            setSavingPassword(false);
        }
    };
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
                            children: "โปรไฟล์นักศึกษา"
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/profile/page.js",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm opacity-90",
                            children: "ข้อมูลโปรไฟล์เป็นแบบอ่านอย่างเดียว"
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/profile/page.js",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/student/profile/page.js",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/student/profile/page.js",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                gutter: [
                    16,
                    16
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        lg: 14,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/student/profile/page.js",
                                        lineNumber: 74,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "ข้อมูลส่วนตัว"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/student/profile/page.js",
                                        lineNumber: 75,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/student/profile/page.js",
                                lineNumber: 73,
                                columnNumber: 15
                            }, void 0),
                            children: [
                                !userInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                    className: "mb-4",
                                    type: "warning",
                                    message: "ไม่พบข้อมูลผู้ใช้ในเครื่อง กรุณาเข้าสู่ระบบใหม่"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/student/profile/page.js",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            addonBefore: "ชื่อ-นามสกุล",
                                            value: toText(studentData.fullName),
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/student/profile/page.js",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            addonBefore: "รหัสนิสิต",
                                            value: toText(studentData.studentCode),
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/student/profile/page.js",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            addonBefore: "อีเมล",
                                            value: toText(studentData.email),
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/student/profile/page.js",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            addonBefore: "เบอร์โทร",
                                            value: toText(studentData.phone),
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/student/profile/page.js",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            addonBefore: "คณะ",
                                            value: toText(studentData.faculty),
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/student/profile/page.js",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            addonBefore: "ภาควิชา",
                                            value: toText(studentData.department),
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/student/profile/page.js",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            addonBefore: "สาขา",
                                            value: toText(studentData.major),
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/student/profile/page.js",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            addonBefore: "ชั้นปี",
                                            value: toText(studentData.classYear),
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/student/profile/page.js",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                            addonBefore: "ปีการศึกษา",
                                            value: toText(studentData.academicYear),
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/student/profile/page.js",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/student/profile/page.js",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/student/profile/page.js",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/student/profile/page.js",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        lg: 10,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__["KeyRound"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/student/profile/page.js",
                                        lineNumber: 105,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "เปลี่ยนรหัสผ่าน"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/student/profile/page.js",
                                        lineNumber: 106,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/student/profile/page.js",
                                lineNumber: 104,
                                columnNumber: 15
                            }, void 0),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
                                form: passwordForm,
                                layout: "vertical",
                                onFinish: handleChangePassword,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        label: "รหัสผ่านปัจจุบัน",
                                        name: "currentPassword",
                                        rules: [
                                            {
                                                required: true,
                                                message: "กรุณากรอกรหัสผ่านปัจจุบัน"
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"].Password, {}, void 0, false, {
                                            fileName: "[project]/src/app/student/profile/page.js",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/student/profile/page.js",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        label: "รหัสผ่านใหม่",
                                        name: "newPassword",
                                        rules: [
                                            {
                                                required: true,
                                                message: "กรุณากรอกรหัสผ่านใหม่"
                                            },
                                            {
                                                min: 8,
                                                message: "รหัสผ่านใหม่ต้องยาวอย่างน้อย 8 ตัวอักษร"
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"].Password, {}, void 0, false, {
                                            fileName: "[project]/src/app/student/profile/page.js",
                                            lineNumber: 127,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/student/profile/page.js",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        label: "ยืนยันรหัสผ่านใหม่",
                                        name: "confirmPassword",
                                        dependencies: [
                                            "newPassword"
                                        ],
                                        rules: [
                                            {
                                                required: true,
                                                message: "กรุณายืนยันรหัสผ่านใหม่"
                                            },
                                            ({ getFieldValue })=>({
                                                    validator (_, value) {
                                                        if (!value || getFieldValue("newPassword") === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error("รหัสผ่านใหม่ไม่ตรงกัน"));
                                                    }
                                                })
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"].Password, {}, void 0, false, {
                                            fileName: "[project]/src/app/student/profile/page.js",
                                            lineNumber: 146,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/student/profile/page.js",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                        type: "primary",
                                        htmlType: "submit",
                                        loading: savingPassword,
                                        style: {
                                            backgroundColor: "#0A894C",
                                            borderColor: "#0A894C"
                                        },
                                        children: "บันทึกรหัสผ่านใหม่"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/student/profile/page.js",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/student/profile/page.js",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/student/profile/page.js",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/student/profile/page.js",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/student/profile/page.js",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/student/profile/page.js",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bc0ad01f._.js.map