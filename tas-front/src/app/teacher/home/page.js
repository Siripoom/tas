"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, Col, Empty, Progress, Row, Spin, Tag, message } from "antd";
import {
  Activity,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import { getAllActivities } from "@/services/activity";
import { getUserScope } from "@/utils/sessionUser";

const categoryPalette = [
  { color: "#0A894C", icon: <FileText size={20} /> },
  { color: "#1890ff", icon: <Activity size={20} /> },
  { color: "#fa8c16", icon: <Calendar size={20} /> },
  { color: "#52c41a", icon: <Users size={20} /> },
  { color: "#eb2f96", icon: <TrendingUp size={20} /> },
  { color: "#722ed1", icon: <CheckCircle size={20} /> },
];

const ACTIVITY_STATUS_LABEL = {
  OPEN_REGISTRATION: "เปิดรับสมัคร",
  IN_PROGRESS: "กำลังดำเนินการ",
  CLOSED: "ปิดกิจกรรม",
  CANCELLED: "ยกเลิกกิจกรรม",
};

const hashText = (value = "") =>
  Array.from(String(value)).reduce((sum, char) => sum + char.charCodeAt(0), 0);

const getActivityDepartments = (activity) => {
  if (Array.isArray(activity?.departments) && activity.departments.length > 0) {
    return activity.departments;
  }
  if (activity?.department?.id) {
    return [activity.department];
  }
  return [];
};

const isInDepartmentScope = (activity, departmentId) => {
  if (!departmentId) return false;
  return getActivityDepartments(activity).some((department) => department?.id === departmentId);
};

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("th-TH");
};

export default function TeacherHome() {
  const [loading, setLoading] = useState(false);
  const [scope, setScope] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const sessionScope = getUserScope();
    setScope(sessionScope);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!scope?.departmentId) {
        message.error("ไม่พบข้อมูลภาควิชาของผู้ใช้");
        return;
      }

      setLoading(true);
      try {
        const data = await getAllActivities({ departmentId: scope.departmentId });
        setActivities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching teacher home data:", error);
        message.error("ไม่สามารถโหลดข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [scope]);

  const departmentActivities = useMemo(
    () =>
      (Array.isArray(activities) ? activities : []).filter((activity) =>
        isInDepartmentScope(activity, scope?.departmentId),
      ),
    [activities, scope?.departmentId],
  );

  const uniqueStudentCount = useMemo(() => {
    const ids = new Set();
    departmentActivities.forEach((activity) => {
      (activity.attendances || []).forEach((attendance) => {
        if (attendance?.user?.id) {
          ids.add(attendance.user.id);
        }
      });
    });
    return ids.size;
  }, [departmentActivities]);

  const pendingApprovals = useMemo(
    () =>
      departmentActivities.reduce((sum, activity) => {
        const pending = (activity.attendances || []).filter((attendance) =>
          ["APPLIED", "REVISION_REQUIRED"].includes(attendance.status),
        ).length;
        return sum + pending;
      }, 0),
    [departmentActivities],
  );

  const activeEvents = useMemo(
    () => departmentActivities.filter((activity) => activity.status === "IN_PROGRESS").length,
    [departmentActivities],
  );

  const totalHours = useMemo(
    () =>
      departmentActivities.reduce(
        (sum, activity) => sum + Number(activity.hour || activity.hours || 0),
        0,
      ),
    [departmentActivities],
  );

  const categoryData = useMemo(() => {
    const categoryMap = new Map();

    departmentActivities.forEach((activity) => {
      const categoryId = activity.typeActivity?.id || activity.typeActivityId || "unknown";
      const categoryName = activity.typeActivity?.name || "ยังไม่กำหนดประเภท";
      const palette = categoryPalette[hashText(categoryId) % categoryPalette.length];

      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          id: categoryId,
          name: categoryName,
          eventsCount: 0,
          currentHours: 0,
          targetHours: 60,
          color: palette.color,
          icon: palette.icon,
        });
      }

      const category = categoryMap.get(categoryId);
      category.eventsCount += 1;
      category.currentHours += Number(activity.hour || activity.hours || 0);
    });

    return Array.from(categoryMap.values());
  }, [departmentActivities]);

  const recentActivities = useMemo(
    () =>
      [...departmentActivities]
        .sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt || b.startAt).getTime() -
            new Date(a.updatedAt || a.createdAt || a.startAt).getTime(),
        )
        .slice(0, 4),
    [departmentActivities],
  );

  const stats = [
    {
      title: "Total Students",
      value: uniqueStudentCount,
      icon: <Users size={24} style={{ color: "#0A894C" }} />,
      color: "#0A894C",
    },
    {
      title: "Total Events",
      value: departmentActivities.length,
      icon: <Calendar size={24} style={{ color: "#0db359" }} />,
      color: "#0db359",
    },
    {
      title: "Pending Approvals",
      value: pendingApprovals,
      icon: <FileText size={24} style={{ color: "#086b3d" }} />,
      color: "#086b3d",
    },
    {
      title: "Active Events",
      value: activeEvents,
      icon: <Activity size={24} style={{ color: "#05c168" }} />,
      color: "#05c168",
    },
  ];

  return (
    <div>
      <Card
        className="mb-6 shadow-sm"
        style={{
          background: "linear-gradient(135deg, #0A894C 0%, #0ea258 100%)",
          border: "none",
        }}
      >
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-2">
            ภาควิชา {scope?.departmentName || "ไม่ระบุ"}
          </h2>
          <p className="text-sm opacity-90">สรุปกิจกรรมและการติดตามงานของภาควิชา</p>
        </div>
      </Card>

      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          {stats.map((stat) => (
            <Col xs={24} sm={12} lg={6} key={stat.title}>
              <Card hoverable className="shadow-sm" styles={{ body: { padding: 24 } }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 rounded-full" style={{ backgroundColor: `${stat.color}15` }}>
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Card
          className="mt-6 shadow-sm"
          styles={{
            header: {
              backgroundColor: "#e8f5e9",
              borderBottom: "2px solid #0A894C",
              color: "#086b3d",
              fontWeight: "600",
            },
          }}
          title={
            <div className="flex items-center gap-2">
              <Clock size={20} style={{ color: "#0A894C" }} />
              <span>จำนวนชั่วโมงกิจกรรมตามประเภท</span>
            </div>
          }
        >
          {categoryData.length === 0 ? (
            <Empty description="ยังไม่มีกิจกรรมในภาควิชานี้" />
          ) : (
            <Row gutter={[16, 16]}>
              {categoryData.map((category) => {
                const percentage = Math.min(
                  100,
                  Math.round((category.currentHours / category.targetHours) * 100),
                );

                return (
                  <Col xs={24} md={12} lg={8} key={category.id}>
                    <Card
                      hoverable
                      className="h-full"
                      style={{
                        borderLeft: `4px solid ${category.color}`,
                        backgroundColor: "#fafafa",
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div
                              className="p-2 rounded-lg"
                              style={{
                                backgroundColor: `${category.color}15`,
                                color: category.color,
                              }}
                            >
                              {category.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm mb-1" style={{ color: category.color }}>
                                {category.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {category.currentHours}/{category.targetHours} ชั่วโมง
                              </p>
                            </div>
                          </div>
                          {category.currentHours >= category.targetHours && (
                            <CheckCircle size={16} style={{ color: "#52c41a" }} />
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">กิจกรรม</p>
                            <p className="text-lg font-bold text-gray-800">{category.eventsCount}</p>
                          </div>
                          <div className="text-center border-l">
                            <p className="text-xs text-gray-500 mb-1">ชั่วโมง</p>
                            <p className="text-lg font-bold" style={{ color: category.color }}>
                              {category.currentHours}
                            </p>
                          </div>
                        </div>

                        <Progress percent={percentage} showInfo={false} strokeColor={category.color} />
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Card>

        <Row gutter={[16, 16]} className="mt-6">
          <Col xs={24} lg={16}>
            <Card
              title="Recent Activities"
              className="shadow-sm"
              styles={{
                header: {
                  backgroundColor: "#e8f5e9",
                  borderBottom: "2px solid #0A894C",
                  color: "#086b3d",
                  fontWeight: "600",
                },
              }}
            >
              {recentActivities.length === 0 ? (
                <Empty description="ไม่มีกิจกรรมล่าสุด" />
              ) : (
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{
                        backgroundColor: "#f1f8f4",
                        borderLeft: "3px solid #0A894C",
                      }}
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">{activity.name || activity.title}</p>
                        <p className="text-xs text-gray-500">
                          วันที่จัด {formatDate(activity.startDate || activity.startAt)}
                        </p>
                      </div>
                      <Tag color="blue">{ACTIVITY_STATUS_LABEL[activity.status] || activity.status}</Tag>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title="Notifications"
              className="shadow-sm"
              styles={{
                header: {
                  backgroundColor: "#e8f5e9",
                  borderBottom: "2px solid #0A894C",
                  color: "#086b3d",
                  fontWeight: "600",
                },
              }}
            >
              <Empty description="ยังไม่มีการเชื่อมต่อแจ้งเตือนในหน้านี้" />
            </Card>
          </Col>
        </Row>

        <Card className="mt-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">ชั่วโมงกิจกรรมรวมภาควิชา</span>
            <span className="text-lg font-bold" style={{ color: "#0A894C" }}>
              {totalHours} ชั่วโมง
            </span>
          </div>
        </Card>
      </Spin>
    </div>
  );
}
