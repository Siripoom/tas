(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/participation/SearchFilterBar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
"use client";
;
;
;
const { Option } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"];
const SearchFilterBar = ({ onSearch, onFilterChange, onReset })=>{
    const departments = [
        "คอมพิวเตอร์ศึกษา",
        "ครุศาสตร์โยธา",
        "ครุศาสตร์ไฟฟ้า",
        "ครุศาสตร์เครื่องกล",
        "ครุศาสตร์เทคโนโลยีและสารสนเทศ",
        "บริหารเทคนิคศึกษา"
    ];
    const majors = [
        "TCT",
        "CED"
    ];
    const years = [
        "1",
        "2",
        "3",
        "4"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 rounded-lg mb-4",
        style: {
            background: "#ffffff",
            border: "1px solid #e8f5e9",
            boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
            gutter: [
                16,
                16
            ],
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    xs: 24,
                    md: 8,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                        placeholder: "Search by student ID, name, or activity name",
                        prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            size: 16,
                            style: {
                                color: "#0A894C"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/participation/SearchFilterBar.js",
                            lineNumber: 36,
                            columnNumber: 21
                        }, void 0),
                        onChange: (e)=>onSearch(e.target.value),
                        size: "large",
                        style: {
                            borderColor: "#0A894C"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/SearchFilterBar.js",
                        lineNumber: 34,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/SearchFilterBar.js",
                    lineNumber: 33,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    xs: 24,
                    md: 5,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                        placeholder: "เลือกภาควิชา",
                        onChange: (value)=>onFilterChange("department", value),
                        allowClear: true,
                        size: "large",
                        style: {
                            width: "100%"
                        },
                        children: departments.map((dept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                value: dept,
                                children: dept
                            }, dept, false, {
                                fileName: "[project]/src/components/participation/SearchFilterBar.js",
                                lineNumber: 55,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/SearchFilterBar.js",
                        lineNumber: 47,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/SearchFilterBar.js",
                    lineNumber: 46,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    xs: 24,
                    md: 4,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                        placeholder: "เลือกสาขาวิชา",
                        onChange: (value)=>onFilterChange("major", value),
                        allowClear: true,
                        size: "large",
                        style: {
                            width: "100%"
                        },
                        children: majors.map((major)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                value: major,
                                children: major
                            }, major, false, {
                                fileName: "[project]/src/components/participation/SearchFilterBar.js",
                                lineNumber: 72,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/SearchFilterBar.js",
                        lineNumber: 64,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/SearchFilterBar.js",
                    lineNumber: 63,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    xs: 24,
                    md: 4,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                        placeholder: "เลือกชั้นปี",
                        onChange: (value)=>onFilterChange("year", value),
                        allowClear: true,
                        size: "large",
                        style: {
                            width: "100%"
                        },
                        children: years.map((year)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                value: year,
                                children: [
                                    "ปี ",
                                    year
                                ]
                            }, year, true, {
                                fileName: "[project]/src/components/participation/SearchFilterBar.js",
                                lineNumber: 89,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/SearchFilterBar.js",
                        lineNumber: 81,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/SearchFilterBar.js",
                    lineNumber: 80,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                    xs: 24,
                    md: 3,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/participation/SearchFilterBar.js",
                            lineNumber: 99,
                            columnNumber: 19
                        }, void 0),
                        onClick: onReset,
                        size: "large",
                        style: {
                            width: "100%",
                            backgroundColor: "#0A894C",
                            borderColor: "#0A894C",
                            color: "#ffffff"
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.backgroundColor = "#086b3d";
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.backgroundColor = "#0A894C";
                        },
                        children: "รีเซ็ต"
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/SearchFilterBar.js",
                        lineNumber: 98,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/SearchFilterBar.js",
                    lineNumber: 97,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/participation/SearchFilterBar.js",
            lineNumber: 31,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/participation/SearchFilterBar.js",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = SearchFilterBar;
const __TURBOPACK__default__export__ = SearchFilterBar;
var _c;
__turbopack_context__.k.register(_c, "SearchFilterBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/participation/ParticipationTable.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/table/index.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
"use client";
;
;
;
const ParticipationTable = ({ data, onView, showParticipationCount = false, showEvidenceCount = false })=>{
    const columns = [
        {
            title: "ลำดับ",
            dataIndex: "index",
            key: "index",
            width: 80,
            align: "center",
            render: (text, record, index)=>index + 1
        },
        {
            title: "กิจกรรม",
            key: "activityName",
            ellipsis: true,
            render: (_, record)=>record.name || record.activityName
        },
        {
            title: "ภาควิชา",
            key: "department",
            width: 180,
            render: (_, record)=>record.department?.name || record.department || "-"
        },
        {
            title: "สาขาวิชา",
            key: "major",
            width: 150,
            align: "center",
            render: (_, record)=>{
                // Handle API data with majorJoins
                if (record.majorJoins && record.majorJoins.length > 0) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1 justify-center",
                        children: record.majorJoins.map((mj, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                color: "#0A894C",
                                style: {
                                    borderRadius: 8,
                                    fontWeight: 500
                                },
                                children: mj.major?.name
                            }, idx, false, {
                                fileName: "[project]/src/components/participation/ParticipationTable.js",
                                lineNumber: 44,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/ParticipationTable.js",
                        lineNumber: 42,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                }
                // Handle mock data
                if (record.major) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                        color: "#0A894C",
                        style: {
                            borderRadius: 8,
                            fontWeight: 500
                        },
                        children: record.major
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/ParticipationTable.js",
                        lineNumber: 61,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-400",
                    children: "ทุกสาขา"
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/ParticipationTable.js",
                    lineNumber: 72,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            }
        },
        {
            title: showParticipationCount ? "จำนวนผู้เข้าร่วม" : showEvidenceCount ? "จำนวนส่งหลักฐาน" : "จำนวนนักศึกษา",
            key: "studentCount",
            width: 150,
            align: "center",
            render: (_, record)=>{
                // Determine which count to show
                let count, max;
                if (showParticipationCount) {
                    count = record.participationCount || 0;
                    max = record.maxPeopleCount || record.maxStudents || 0;
                } else if (showEvidenceCount) {
                    count = record.evidenceCount || 0;
                    max = record.maxPeopleCount || record.maxStudents || 0;
                } else {
                    count = record.studentCount || record.peopleCount || 0;
                    max = record.maxStudents || record.maxPeopleCount || 0;
                }
                const percentage = max > 0 ? count / max * 100 : 0;
                const color = percentage >= 80 ? "#f5222d" : percentage >= 50 ? "#fa8c16" : "#0A894C";
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        color: color,
                        fontWeight: "600",
                        fontSize: "14px"
                    },
                    children: [
                        count,
                        "/",
                        max
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/participation/ParticipationTable.js",
                    lineNumber: 104,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            }
        },
        {
            title: "การจัดการ",
            key: "action",
            width: 120,
            align: "center",
            render: (_, record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                        type: "text",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/participation/ParticipationTable.js",
                            lineNumber: 125,
                            columnNumber: 19
                        }, void 0),
                        onClick: ()=>onView(record),
                        style: {
                            color: "#0A894C"
                        },
                        title: "ดูรายละเอียด"
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/ParticipationTable.js",
                        lineNumber: 123,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/ParticipationTable.js",
                    lineNumber: 122,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
        columns: columns,
        dataSource: data,
        rowKey: "id",
        pagination: {
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total)=>`ทั้งหมด ${total} รายการ`
        },
        scroll: {
            x: 800
        },
        style: {
            backgroundColor: "#ffffff",
            borderRadius: 8
        }
    }, void 0, false, {
        fileName: "[project]/src/components/participation/ParticipationTable.js",
        lineNumber: 136,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ParticipationTable;
const __TURBOPACK__default__export__ = ParticipationTable;
var _c;
__turbopack_context__.k.register(_c, "ParticipationTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/participation/StudentListModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tabs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tabs/index.js [app-client] (ecmascript) <export default as Tabs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/table/index.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/avatar/index.js [app-client] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const { TextArea } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"];
const StudentListModal = ({ visible, onClose, activity, onApprove, onReject })=>{
    _s();
    const [selectedRowKeys, setSelectedRowKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rejectModalVisible, setRejectModalVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rejectReason, setRejectReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [studentsToReject, setStudentsToReject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Process attendances data from activity
    const getStudentsFromAttendances = ()=>{
        if (!activity?.attendances) {
            return {
                approved: [],
                pending: [],
                rejected: []
            };
        }
        const approved = [];
        const pending = [];
        const rejected = [];
        activity.attendances.forEach((attendance)=>{
            const student = {
                ...attendance,
                studentId: attendance.user?.studentId || "-",
                name: attendance.user?.fullname || "Unknown",
                department: attendance.user?.department?.name || "-",
                major: attendance.user?.major?.name || "-",
                year: attendance.user?.level || "-"
            };
            if (attendance.status === "APPROVED") {
                approved.push(student);
            } else if ([
                "APPLIED",
                "REVISION_REQUIRED",
                "SUBMITTED"
            ].includes(attendance.status)) {
                pending.push(student);
            } else if (attendance.status === "REJECTED") {
                rejected.push(student);
            }
        });
        return {
            approved,
            pending,
            rejected
        };
    };
    const students = getStudentsFromAttendances();
    const handleBulkApprove = ()=>{
        const selectedStudents = students.pending.filter((student)=>selectedRowKeys.includes(student.id));
        selectedStudents.forEach((student)=>onApprove(student));
        setSelectedRowKeys([]);
    };
    const handleRejectClick = (student = null)=>{
        if (student) {
            setStudentsToReject([
                student
            ]);
        } else {
            const selectedStudents = students.pending.filter((student)=>selectedRowKeys.includes(student.id));
            setStudentsToReject(selectedStudents);
        }
        setRejectModalVisible(true);
    };
    const handleConfirmReject = ()=>{
        if (!rejectReason.trim()) {
            alert("กรุณาระบุเหตุผลในการไม่อนุมัติ");
            return;
        }
        studentsToReject.forEach((student)=>{
            onReject({
                ...student,
                rejectReason
            });
        });
        setRejectModalVisible(false);
        setRejectReason("");
        setStudentsToReject([]);
        setSelectedRowKeys([]);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys)=>{
            setSelectedRowKeys(selectedKeys);
        }
    };
    const columns = [
        {
            title: "ลำดับ",
            dataIndex: "index",
            key: "index",
            width: 70,
            align: "center",
            render: (text, record, index)=>index + 1
        },
        {
            title: "นักศึกษา",
            dataIndex: "name",
            key: "name",
            render: (name, record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                            size: 32,
                            style: {
                                backgroundColor: "#0A894C"
                            },
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/src/components/participation/StudentListModal.js",
                                lineNumber: 108,
                                columnNumber: 19
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/participation/StudentListModal.js",
                            lineNumber: 105,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-medium",
                                    children: name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/participation/StudentListModal.js",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-500",
                                    children: record.studentId
                                }, void 0, false, {
                                    fileName: "[project]/src/components/participation/StudentListModal.js",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/participation/StudentListModal.js",
                            lineNumber: 110,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/participation/StudentListModal.js",
                    lineNumber: 104,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
        },
        {
            title: "ภาควิชา",
            dataIndex: "department",
            key: "department",
            width: 180
        },
        {
            title: "สาขา",
            dataIndex: "major",
            key: "major",
            width: 100,
            align: "center",
            render: (major)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                    color: "#0A894C",
                    style: {
                        borderRadius: 8
                    },
                    children: major
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/StudentListModal.js",
                    lineNumber: 130,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
        },
        {
            title: "ชั้นปี",
            dataIndex: "year",
            key: "year",
            width: 80,
            align: "center",
            render: (year)=>`ปี ${year}`
        }
    ];
    const approvedColumns = [
        ...columns
    ];
    const pendingColumns = [
        ...columns,
        {
            title: "การจัดการ",
            key: "action",
            width: 120,
            align: "center",
            render: (_, record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                        size: "small",
                        danger: true,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/participation/StudentListModal.js",
                            lineNumber: 159,
                            columnNumber: 19
                        }, void 0),
                        onClick: ()=>handleRejectClick(record),
                        children: "ไม่อนุมัติ"
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/StudentListModal.js",
                        lineNumber: 156,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/StudentListModal.js",
                    lineNumber: 155,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
        }
    ];
    const rejectedColumns = [
        ...columns
    ];
    const tabItems = [
        {
            key: "approved",
            label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/StudentListModal.js",
                        lineNumber: 176,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    "อนุมัติแล้ว (",
                    students.approved.length,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/participation/StudentListModal.js",
                lineNumber: 175,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                columns: approvedColumns,
                dataSource: students.approved,
                rowKey: "id",
                pagination: {
                    pageSize: 5
                },
                scroll: {
                    x: 600
                }
            }, void 0, false, {
                fileName: "[project]/src/components/participation/StudentListModal.js",
                lineNumber: 181,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        },
        {
            key: "pending",
            label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/StudentListModal.js",
                        lineNumber: 194,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    "รออนุมัติ (",
                    students.pending.length,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/participation/StudentListModal.js",
                lineNumber: 193,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    selectedRowKeys.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "primary",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/participation/StudentListModal.js",
                                    lineNumber: 204,
                                    columnNumber: 23
                                }, void 0),
                                onClick: handleBulkApprove,
                                style: {
                                    backgroundColor: "#0A894C",
                                    borderColor: "#0A894C"
                                },
                                children: [
                                    "อนุมัติที่เลือก (",
                                    selectedRowKeys.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/participation/StudentListModal.js",
                                lineNumber: 202,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                danger: true,
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/participation/StudentListModal.js",
                                    lineNumber: 215,
                                    columnNumber: 23
                                }, void 0),
                                onClick: ()=>handleRejectClick(),
                                children: [
                                    "ไม่อนุมัติที่เลือก (",
                                    selectedRowKeys.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/participation/StudentListModal.js",
                                lineNumber: 213,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/participation/StudentListModal.js",
                        lineNumber: 201,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                        columns: pendingColumns,
                        dataSource: students.pending,
                        rowKey: "id",
                        rowSelection: rowSelection,
                        pagination: {
                            pageSize: 5
                        },
                        scroll: {
                            x: 600
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/StudentListModal.js",
                        lineNumber: 222,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/participation/StudentListModal.js",
                lineNumber: 199,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        },
        {
            key: "rejected",
            label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/StudentListModal.js",
                        lineNumber: 237,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    "ไม่อนุมัติ (",
                    students.rejected.length,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/participation/StudentListModal.js",
                lineNumber: 236,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                columns: rejectedColumns,
                dataSource: students.rejected,
                rowKey: "id",
                pagination: {
                    pageSize: 5
                },
                scroll: {
                    x: 600
                }
            }, void 0, false, {
                fileName: "[project]/src/components/participation/StudentListModal.js",
                lineNumber: 242,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "jsx-1521a40544afcfbd",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    style: {
                        color: "#0A894C"
                    },
                    className: "jsx-1521a40544afcfbd" + " " + "text-lg font-semibold",
                    children: "รายการนักศึกษา"
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/StudentListModal.js",
                    lineNumber: 257,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "jsx-1521a40544afcfbd" + " " + "text-sm text-gray-500 mt-1",
                    children: activity?.name || activity?.activityName || "กิจกรรม"
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/StudentListModal.js",
                    lineNumber: 260,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/participation/StudentListModal.js",
            lineNumber: 256,
            columnNumber: 9
        }, void 0),
        open: visible,
        onCancel: onClose,
        width: 900,
        footer: null,
        styles: {
            header: {
                borderBottom: "2px solid #0A894C",
                paddingBottom: 16
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tabs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__["Tabs"], {
                defaultActiveKey: "approved",
                items: tabItems,
                className: "custom-tabs"
            }, void 0, false, {
                fileName: "[project]/src/components/participation/StudentListModal.js",
                lineNumber: 276,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "1521a40544afcfbd",
                children: ".custom-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{color:#0a894c!important}.custom-tabs .ant-tabs-ink-bar{background:#0a894c!important}.custom-tabs .ant-tabs-tab:hover{color:#0a894c!important}"
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                title: "เหตุผลในการไม่อนุมัติ",
                open: rejectModalVisible,
                onCancel: ()=>{
                    setRejectModalVisible(false);
                    setRejectReason("");
                    setStudentsToReject([]);
                },
                onOk: handleConfirmReject,
                okText: "ยืนยัน",
                cancelText: "ยกเลิก",
                okButtonProps: {
                    style: {
                        backgroundColor: "#f5222d",
                        borderColor: "#f5222d"
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-1521a40544afcfbd" + " " + "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-1521a40544afcfbd" + " " + "text-gray-600 mb-2",
                            children: [
                                "นักศึกษาที่จะไม่อนุมัติ: ",
                                studentsToReject.map((s)=>s.name).join(", ")
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/participation/StudentListModal.js",
                            lineNumber: 310,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextArea, {
                            rows: 4,
                            placeholder: "กรุณาระบุเหตุผลในการไม่อนุมัติ...",
                            value: rejectReason,
                            onChange: (e)=>setRejectReason(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/components/participation/StudentListModal.js",
                            lineNumber: 313,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/participation/StudentListModal.js",
                    lineNumber: 309,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/participation/StudentListModal.js",
                lineNumber: 294,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/participation/StudentListModal.js",
        lineNumber: 254,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(StudentListModal, "NKnZelHRKEve9KzupdRx4N0rFdw=");
_c = StudentListModal;
const __TURBOPACK__default__export__ = StudentListModal;
var _c;
__turbopack_context__.k.register(_c, "StudentListModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/participation/EvidenceListModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/table/index.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/avatar/index.js [app-client] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$image$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/image/index.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const { TextArea } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"];
const EvidenceListModal = ({ visible, onClose, activity, onApprove, onReject })=>{
    _s();
    const [previewVisible, setPreviewVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [previewImage, setPreviewImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedRowKeys, setSelectedRowKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rejectModalVisible, setRejectModalVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rejectReason, setRejectReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [studentsToReject, setStudentsToReject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Process attendances data from activity for evidence
    const getStudentsWithEvidence = ()=>{
        if (!activity?.attendances) {
            return [];
        }
        return activity.attendances.filter((attendance)=>[
                "SUBMITTED",
                "APPROVED",
                "COMPLETED",
                "REVISION_REQUIRED",
                "REJECTED"
            ].includes(attendance.status)).map((attendance)=>({
                ...attendance,
                studentId: attendance.user?.studentId || "-",
                name: attendance.user?.fullname || "Unknown",
                department: attendance.user?.department?.name || "-",
                major: attendance.user?.major?.name || "-",
                year: attendance.user?.level || "-",
                evidenceUrl: attendance.evidenceUrl,
                uploadDate: attendance.updatedAt?.split("T")[0] || "-",
                status: attendance.status === "COMPLETED" || attendance.status === "APPROVED" ? "approved" : attendance.status === "REJECTED" ? "rejected" : "pending"
            }));
    };
    const studentsWithEvidence = getStudentsWithEvidence();
    const handlePreview = (imageUrl)=>{
        setPreviewImage(imageUrl);
        setPreviewVisible(true);
    };
    const handleBulkApprove = ()=>{
        const selectedStudents = studentsWithEvidence.filter((student)=>selectedRowKeys.includes(student.id) && student.status === "pending");
        selectedStudents.forEach((student)=>onApprove(student));
        setSelectedRowKeys([]);
    };
    const handleRejectClick = (student = null)=>{
        if (student) {
            setStudentsToReject([
                student
            ]);
        } else {
            const selectedStudents = studentsWithEvidence.filter((student)=>selectedRowKeys.includes(student.id) && student.status === "pending");
            setStudentsToReject(selectedStudents);
        }
        setRejectModalVisible(true);
    };
    const handleConfirmReject = ()=>{
        if (!rejectReason.trim()) {
            alert("กรุณาระบุเหตุผลในการไม่อนุมัติ");
            return;
        }
        studentsToReject.forEach((student)=>{
            onReject({
                ...student,
                rejectReason
            });
        });
        setRejectModalVisible(false);
        setRejectReason("");
        setStudentsToReject([]);
        setSelectedRowKeys([]);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys)=>{
            setSelectedRowKeys(selectedKeys);
        },
        getCheckboxProps: (record)=>({
                disabled: record.status !== "pending"
            })
    };
    const columns = [
        {
            title: "No.",
            dataIndex: "index",
            key: "index",
            width: 70,
            align: "center",
            render: (text, record, index)=>index + 1
        },
        {
            title: "Student",
            dataIndex: "name",
            key: "name",
            render: (name, record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                            size: 32,
                            style: {
                                backgroundColor: "#0A894C"
                            },
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/src/components/participation/EvidenceListModal.js",
                                lineNumber: 124,
                                columnNumber: 19
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/participation/EvidenceListModal.js",
                            lineNumber: 121,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-medium",
                                    children: name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-500",
                                    children: record.studentId
                                }, void 0, false, {
                                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/participation/EvidenceListModal.js",
                            lineNumber: 126,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                    lineNumber: 120,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
            width: 180
        },
        {
            title: "Major",
            dataIndex: "major",
            key: "major",
            width: 100,
            align: "center",
            render: (major)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                    color: "#0A894C",
                    style: {
                        borderRadius: 8
                    },
                    children: major
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                    lineNumber: 146,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
        },
        {
            title: "Year",
            dataIndex: "year",
            key: "year",
            width: 80,
            align: "center",
            render: (year)=>`Year ${year}`
        },
        {
            title: "Upload Date",
            dataIndex: "uploadDate",
            key: "uploadDate",
            width: 120,
            align: "center"
        },
        {
            title: "Evidence",
            dataIndex: "evidenceUrl",
            key: "evidenceUrl",
            width: 100,
            align: "center",
            render: (url)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                    size: "small",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/EvidenceListModal.js",
                        lineNumber: 175,
                        columnNumber: 17
                    }, void 0),
                    onClick: ()=>handlePreview(url),
                    style: {
                        backgroundColor: "#0A894C",
                        borderColor: "#0A894C",
                        color: "#ffffff"
                    },
                    children: "View"
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                    lineNumber: 173,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 120,
            align: "center",
            render: (status)=>{
                const statusConfig = {
                    pending: {
                        color: "#fa8c16",
                        text: "Pending"
                    },
                    approved: {
                        color: "#0A894C",
                        text: "Approved"
                    },
                    rejected: {
                        color: "#f5222d",
                        text: "Rejected"
                    }
                };
                const config = statusConfig[status] || statusConfig.pending;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                    color: config.color,
                    style: {
                        borderRadius: 8,
                        fontWeight: 500
                    },
                    children: config.text
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                    lineNumber: 201,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            }
        },
        {
            title: "Actions",
            key: "action",
            width: 120,
            align: "center",
            render: (_, record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 justify-center",
                    children: record.status === "pending" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                        size: "small",
                        danger: true,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/participation/EvidenceListModal.js",
                            lineNumber: 221,
                            columnNumber: 21
                        }, void 0),
                        onClick: ()=>handleRejectClick(record),
                        children: "Reject"
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/EvidenceListModal.js",
                        lineNumber: 218,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-500",
                        children: record.status === "approved" ? "Already approved" : "Already rejected"
                    }, void 0, false, {
                        fileName: "[project]/src/components/participation/EvidenceListModal.js",
                        lineNumber: 227,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                    lineNumber: 216,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            style: {
                                color: "#0A894C"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                    size: 20,
                                    className: "inline mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                                    lineNumber: 244,
                                    columnNumber: 15
                                }, void 0),
                                "Evidence Review"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/participation/EvidenceListModal.js",
                            lineNumber: 243,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500 mt-1",
                            children: activity?.name || activity?.activityName || "กิจกรรม"
                        }, void 0, false, {
                            fileName: "[project]/src/components/participation/EvidenceListModal.js",
                            lineNumber: 247,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                    lineNumber: 242,
                    columnNumber: 11
                }, void 0),
                open: visible,
                onCancel: onClose,
                width: 1100,
                footer: null,
                styles: {
                    header: {
                        borderBottom: "2px solid #0A894C",
                        paddingBottom: 16
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4",
                    children: [
                        selectedRowKeys.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "primary",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/participation/EvidenceListModal.js",
                                        lineNumber: 268,
                                        columnNumber: 23
                                    }, void 0),
                                    onClick: handleBulkApprove,
                                    style: {
                                        backgroundColor: "#0A894C",
                                        borderColor: "#0A894C"
                                    },
                                    children: [
                                        "Approve Selected (",
                                        selectedRowKeys.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                                    lineNumber: 266,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    danger: true,
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/participation/EvidenceListModal.js",
                                        lineNumber: 279,
                                        columnNumber: 23
                                    }, void 0),
                                    onClick: ()=>handleRejectClick(),
                                    children: [
                                        "Reject Selected (",
                                        selectedRowKeys.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                                    lineNumber: 277,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/participation/EvidenceListModal.js",
                            lineNumber: 265,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                            columns: columns,
                            dataSource: studentsWithEvidence,
                            rowKey: "id",
                            rowSelection: rowSelection,
                            pagination: {
                                pageSize: 5
                            },
                            scroll: {
                                x: 900
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/participation/EvidenceListModal.js",
                            lineNumber: 286,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                    lineNumber: 263,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/participation/EvidenceListModal.js",
                lineNumber: 240,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                open: previewVisible,
                title: "Evidence Preview",
                footer: null,
                onCancel: ()=>setPreviewVisible(false),
                width: 600,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$image$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                    src: previewImage,
                    alt: "Evidence",
                    style: {
                        width: "100%"
                    },
                    preview: false
                }, void 0, false, {
                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                    lineNumber: 305,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/participation/EvidenceListModal.js",
                lineNumber: 298,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                title: "Rejection Reason",
                open: rejectModalVisible,
                onCancel: ()=>{
                    setRejectModalVisible(false);
                    setRejectReason("");
                    setStudentsToReject([]);
                },
                onOk: handleConfirmReject,
                okText: "Confirm",
                cancelText: "Cancel",
                okButtonProps: {
                    style: {
                        backgroundColor: "#f5222d",
                        borderColor: "#f5222d"
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 mb-2",
                            children: [
                                "Students to reject: ",
                                studentsToReject.map((s)=>s.name).join(", ")
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/participation/EvidenceListModal.js",
                            lineNumber: 330,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextArea, {
                            rows: 4,
                            placeholder: "Please provide a reason for rejection...",
                            value: rejectReason,
                            onChange: (e)=>setRejectReason(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/components/participation/EvidenceListModal.js",
                            lineNumber: 333,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/participation/EvidenceListModal.js",
                    lineNumber: 329,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/participation/EvidenceListModal.js",
                lineNumber: 314,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(EvidenceListModal, "Gq97Xm42OLY/CQ9SXLxYhhK5N4g=");
_c = EvidenceListModal;
const __TURBOPACK__default__export__ = EvidenceListModal;
var _c;
__turbopack_context__.k.register(_c, "EvidenceListModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/apiClient.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// create axios instance with default config
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const baseURL = ("TURBOPACK compile-time value", "http://localhost:4556/api") || "http://localhost:4556/api";
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});
const getToken = ()=>("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("token") : "TURBOPACK unreachable";
const getRefreshToken = ()=>("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("refreshToken") : "TURBOPACK unreachable";
const setTokens = (accessToken, refreshToken)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (accessToken) localStorage.setItem("token", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
};
const clearTokens = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
};
apiClient.interceptors.request.use((config)=>{
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
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
    if (!refreshToken) {
        clearTokens();
        return Promise.reject(error);
    }
    if (isRefreshing) {
        return new Promise((resolve, reject)=>{
            pendingRequests.push({
                resolve,
                reject
            });
        }).then((token)=>{
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
        }).catch((refreshError)=>Promise.reject(refreshError));
    }
    originalRequest._retry = true;
    isRefreshing = true;
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${baseURL}/auth/refresh`, {
            refreshToken
        });
        const newAccessToken = response.data?.accessToken;
        const newRefreshToken = response.data?.refreshToken || refreshToken;
        setTokens(newAccessToken, newRefreshToken);
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
    } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem("user");
        }
        return Promise.reject(refreshError);
    } finally{
        isRefreshing = false;
    }
});
const __TURBOPACK__default__export__ = apiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/compat.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/activity.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/compat.js [app-client] (ecmascript)");
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
        status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapActivityStatusToApi"])(data.status)
    });
};
const mapListQuery = (params = {})=>{
    const mapped = {
        scope: params.scope,
        department: params.department || params.departmentId,
        status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapActivityStatusToApi"])(params.status),
        dateFrom: params.dateFrom || params.from,
        dateTo: params.dateTo || params.to
    };
    return compact(mapped);
};
const fetchActivityDetail = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/activities/${id}`);
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
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/activities", {
        params: mapListQuery(params)
    });
    const list = Array.isArray(response.data) ? response.data : [];
    const detailed = params.includeDetails === false ? list : await enrichWithDetails(list);
    return detailed.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeActivity"]);
};
const getActivitiesReport = async (params = {})=>{
    return getAllActivities(params);
};
const getActivityById = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/activities/${id}`);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeActivity"])(response.data);
};
const createActivity = async (data)=>{
    const payload = normalizeIncomingPayload(data);
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/activities", payload);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeActivity"])(response.data);
};
const updateActivity = async (id, data)=>{
    const payload = normalizeIncomingPayload(data);
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`/activities/${id}`, payload);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeActivity"])(response.data);
};
const deleteActivity = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/activities/${id}`);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/attendance.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/activity.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/compat.js [app-client] (ecmascript)");
;
;
;
const flattenAttendances = (activities)=>activities.flatMap((activity)=>(activity.attendances || []).map((attendance)=>({
                ...attendance,
                activityId: attendance.activityId || activity.id,
                activity
            })));
const getAllAttendances = async ()=>{
    const activities = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllActivities"])();
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
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/activities/${activityId}/apply`);
    return {
        id: response.data.id,
        activityId: response.data.activityId,
        userId: response.data.studentUserId,
        status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapApplicationStatusFromApi"])(response.data.status),
        reason: response.data.remark || null,
        createdAt: response.data.submittedAt,
        updatedAt: response.data.updatedAt
    };
};
const updateAttendance = async (id, data = {})=>{
    const action = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapLegacyAttendanceAction"])(data.status);
    const endpoint = action === "approve" ? "approve" : "request-revision";
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/approvals/${id}/${endpoint}`, {
        remark: data.remark || data.reason || data.rejectReason
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$compat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAttendance"])(response.data);
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
    const activity = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActivityById"])(activityId);
    return (activity.attendances || []).map((attendance)=>({
            ...attendance,
            activityId,
            activity
        }));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/admin/participation/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParticipationPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tabs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tabs/index.js [app-client] (ecmascript) <export default as Tabs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/spin/index.js [app-client] (ecmascript) <export default as Spin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-check.js [app-client] (ecmascript) <export default as FileCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$participation$2f$SearchFilterBar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/participation/SearchFilterBar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$participation$2f$ParticipationTable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/participation/ParticipationTable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$participation$2f$StudentListModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/participation/StudentListModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$participation$2f$EvidenceListModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/participation/EvidenceListModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/activity.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/attendance.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
function ParticipationPage() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("participation");
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        department: null,
        major: null,
        year: null
    });
    const [modalVisible, setModalVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [evidenceModalVisible, setEvidenceModalVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedActivity, setSelectedActivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activities, setActivities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [attendances, setAttendances] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Fetch data from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ParticipationPage.useEffect": ()=>{
            fetchData();
        }
    }["ParticipationPage.useEffect"], []);
    const fetchData = async ()=>{
        setLoading(true);
        try {
            const [activitiesData, attendancesData] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllActivities"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllAttendances"])()
            ]);
            setActivities(activitiesData);
            setAttendances(attendancesData);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("ไม่สามารถโหลดข้อมูลการเข้าร่วมได้");
            console.error("Error fetching data:", error);
        } finally{
            setLoading(false);
        }
    };
    // Get activities with attendance counts
    const getActivitiesWithAttendances = ()=>{
        return activities.map((activity)=>{
            // Count attendances for this activity
            const activityAttendances = attendances.filter((att)=>att.activityId === activity.id);
            // For participation tab - count APPLIED/APPROVED/REVISION_REQUIRED
            const participationCount = activityAttendances.filter((att)=>[
                    "APPLIED",
                    "APPROVED",
                    "REVISION_REQUIRED"
                ].includes(att.status)).length;
            // For evidence tab - count submitted/finalized
            const evidenceCount = activityAttendances.filter((att)=>[
                    "SUBMITTED",
                    "APPROVED",
                    "COMPLETED",
                    "REJECTED"
                ].includes(att.status)).length;
            return {
                ...activity,
                participationCount,
                evidenceCount,
                attendances: activityAttendances
            };
        });
    };
    // Filter and search data
    const getFilteredData = ()=>{
        let filtered = getActivitiesWithAttendances();
        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((item)=>item.name?.toLowerCase().includes(query) || item.department?.name?.toLowerCase().includes(query));
        }
        // Apply department filter
        if (filters.department) {
            filtered = filtered.filter((item)=>item.department?.name === filters.department);
        }
        // Apply major filter
        if (filters.major) {
            filtered = filtered.filter((item)=>item.majorJoins?.some((mj)=>mj.major?.name === filters.major));
        }
        // Apply year filter
        if (filters.year) {
            filtered = filtered.filter((item)=>item.level === `ปี ${filters.year}`);
        }
        return filtered;
    };
    const handleSearch = (value)=>{
        setSearchQuery(value);
    };
    const handleFilterChange = (type, value)=>{
        setFilters((prev)=>({
                ...prev,
                [type]: value
            }));
    };
    const handleReset = ()=>{
        setSearchQuery("");
        setFilters({
            department: null,
            major: null,
            year: null
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Reset filters successfully");
    };
    const handleView = (record)=>{
        setSelectedActivity(record);
        setModalVisible(true);
    };
    const handleViewEvidence = (record)=>{
        setSelectedActivity(record);
        setEvidenceModalVisible(true);
    };
    const handleEdit = (record)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].info(`Edit activity: ${record.activityName}`);
    };
    const handleDelete = (record)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Deleted activity: ${record.activityName}`);
    };
    const handleApprove = async (attendance)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAttendance"])(attendance.id, {
                status: "APPROVED"
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`อนุมัติการเข้าร่วมสำเร็จ`);
            fetchData(); // Refresh data
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("ไม่สามารถอนุมัติการเข้าร่วมได้");
            console.error("Error approving attendance:", error);
        }
    };
    const handleReject = async (attendance)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAttendance"])(attendance.id, {
                status: "REJECTED"
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(`ปฏิเสธการเข้าร่วมสำเร็จ`);
            fetchData(); // Refresh data
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("ไม่สามารถปฏิเสธการเข้าร่วมได้");
            console.error("Error rejecting attendance:", error);
        }
    };
    const handleApproveEvidence = async (attendance)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAttendance"])(attendance.id, {
                status: "APPROVED"
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`อนุมัติหลักฐานสำเร็จ`);
            fetchData(); // Refresh data
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("ไม่สามารถอนุมัติหลักฐานได้");
            console.error("Error approving evidence:", error);
        }
    };
    const handleRejectEvidence = async (attendance)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$attendance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAttendance"])(attendance.id, {
                status: "REVISION_REQUIRED"
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(`ปฏิเสธหลักฐานสำเร็จ`);
            fetchData(); // Refresh data
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("ไม่สามารถปฏิเสธหลักฐานได้");
            console.error("Error rejecting evidence:", error);
        }
    };
    const tabItems = [
        {
            key: "participation",
            label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/participation/page.js",
                        lineNumber: 202,
                        columnNumber: 11
                    }, this),
                    "Event Participation"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/participation/page.js",
                lineNumber: 201,
                columnNumber: 9
            }, this),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$participation$2f$SearchFilterBar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onSearch: handleSearch,
                        onFilterChange: handleFilterChange,
                        onReset: handleReset
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/participation/page.js",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                        style: {
                            borderRadius: 8,
                            border: "1px solid #e8f5e9",
                            boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__["Spin"], {
                            spinning: loading,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$participation$2f$ParticipationTable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                data: getFilteredData(),
                                onView: handleView,
                                onEdit: handleEdit,
                                onDelete: handleDelete,
                                showParticipationCount: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/participation/page.js",
                                lineNumber: 221,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/participation/page.js",
                            lineNumber: 220,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/participation/page.js",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/participation/page.js",
                lineNumber: 207,
                columnNumber: 9
            }, this)
        },
        {
            key: "evidence",
            label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck$3e$__["FileCheck"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/participation/page.js",
                        lineNumber: 237,
                        columnNumber: 11
                    }, this),
                    "Participation Evidence"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/participation/page.js",
                lineNumber: 236,
                columnNumber: 9
            }, this),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$participation$2f$SearchFilterBar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onSearch: handleSearch,
                        onFilterChange: handleFilterChange,
                        onReset: handleReset
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/participation/page.js",
                        lineNumber: 243,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                        style: {
                            borderRadius: 8,
                            border: "1px solid #e8f5e9",
                            boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__["Spin"], {
                            spinning: loading,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$participation$2f$ParticipationTable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                data: getFilteredData(),
                                onView: handleViewEvidence,
                                onEdit: handleEdit,
                                onDelete: handleDelete,
                                showEvidenceCount: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/participation/page.js",
                                lineNumber: 256,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/participation/page.js",
                            lineNumber: 255,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/participation/page.js",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/participation/page.js",
                lineNumber: 242,
                columnNumber: 9
            }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-ddb748a2f4573329",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tabs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__["Tabs"], {
                activeKey: activeTab,
                onChange: setActiveTab,
                items: tabItems,
                size: "large",
                className: "custom-main-tabs"
            }, void 0, false, {
                fileName: "[project]/src/app/admin/participation/page.js",
                lineNumber: 272,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$participation$2f$StudentListModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                visible: modalVisible,
                onClose: ()=>setModalVisible(false),
                activity: selectedActivity,
                onApprove: handleApprove,
                onReject: handleReject
            }, void 0, false, {
                fileName: "[project]/src/app/admin/participation/page.js",
                lineNumber: 280,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$participation$2f$EvidenceListModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                visible: evidenceModalVisible,
                onClose: ()=>setEvidenceModalVisible(false),
                activity: selectedActivity,
                onApprove: handleApproveEvidence,
                onReject: handleRejectEvidence
            }, void 0, false, {
                fileName: "[project]/src/app/admin/participation/page.js",
                lineNumber: 288,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "ddb748a2f4573329",
                children: ".custom-main-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{color:#0a894c!important;font-weight:600!important}.custom-main-tabs .ant-tabs-ink-bar{background:#0a894c!important;height:3px!important}.custom-main-tabs .ant-tabs-tab:hover{color:#0a894c!important}.custom-main-tabs .ant-tabs-nav{margin-bottom:24px!important}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/participation/page.js",
        lineNumber: 271,
        columnNumber: 5
    }, this);
}
_s(ParticipationPage, "GkPnNfo5UobettvlsRfZiLfDekE=");
_c = ParticipationPage;
var _c;
__turbopack_context__.k.register(_c, "ParticipationPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_35149d93._.js.map