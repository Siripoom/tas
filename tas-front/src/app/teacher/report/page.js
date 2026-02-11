"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Input,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
  message,
} from "antd";
import {
  Calendar,
  Download,
  FileText,
  MapPin,
  Search,
  User,
} from "lucide-react";
import { getAllActivities } from "@/services/activity";
import { getAttendancesByActivity } from "@/services/attendance";
import { downloadFile, getFilesByActivity } from "@/services/file";
import { downloadDepartmentReport } from "@/services/report";
import { getUserScope } from "@/utils/sessionUser";

const { Search: SearchInput } = Input;

const getActivityDepartments = (activity) => {
  if (Array.isArray(activity?.departments) && activity.departments.length > 0) {
    return activity.departments;
  }
  if (activity?.department?.id) return [activity.department];
  return [];
};

const isInDepartmentScope = (activity, departmentId) =>
  getActivityDepartments(activity).some((department) => department?.id === departmentId);

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("th-TH");
};

const saveBlob = (blob, fileName) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export default function TeacherReportPage() {
  const [scope, setScope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [studentModalVisible, setStudentModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [evidenceFilesByUser, setEvidenceFilesByUser] = useState({});

  useEffect(() => {
    setScope(getUserScope());
  }, []);

  const fetchActivities = async () => {
    if (!scope?.departmentId) {
      message.error("ไม่พบข้อมูลภาควิชาของผู้ใช้");
      return;
    }

    setLoading(true);
    try {
      const data = await getAllActivities({ departmentId: scope.departmentId });
      const list = Array.isArray(data) ? data : [];
      setActivities(list.filter((activity) => isInDepartmentScope(activity, scope.departmentId)));
    } catch (error) {
      console.error("Error fetching report activities:", error);
      message.error("ไม่สามารถโหลดกิจกรรมได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [scope?.departmentId]);

  const transformedActivities = useMemo(
    () =>
      activities.map((activity) => ({
        id: activity.id,
        activityName: activity.name || activity.title || "-",
        department: activity.department?.name || scope?.departmentName || "-",
        major: activity.typeActivity?.name || "ไม่ระบุ",
        startDate: formatDate(activity.startDate || activity.startAt),
        endDate: formatDate(activity.endDate || activity.endAt),
        location: activity.location || activity.address || "-",
        activityHours: Number(activity.hour || activity.hours || 0),
        studentCount: (activity.attendances || []).length,
        rawActivity: activity,
      })),
    [activities, scope?.departmentName],
  );

  const filteredActivities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return transformedActivities;
    return transformedActivities.filter((activity) =>
      `${activity.activityName} ${activity.department} ${activity.major}`
        .toLowerCase()
        .includes(query),
    );
  }, [transformedActivities, searchQuery]);

  const fetchStudentsForActivity = async (activityId) => {
    setStudentsLoading(true);
    try {
      const [attendancesResponse, filesResponse] = await Promise.all([
        getAttendancesByActivity(activityId),
        getFilesByActivity(activityId),
      ]);

      const attendances = Array.isArray(attendancesResponse) ? attendancesResponse : [];
      const files = Array.isArray(filesResponse) ? filesResponse : [];

      const filesByUser = {};
      files.forEach((file) => {
        const userId = file?.user?.id;
        if (!userId) return;
        if (!filesByUser[userId]) {
          filesByUser[userId] = [];
        }
        filesByUser[userId].push(file);
      });

      setEvidenceFilesByUser(filesByUser);

      setStudentsData(
        attendances.map((attendance) => ({
          id: attendance.id,
          studentCode: attendance.user?.studentCode || attendance.user?.studentId || "-",
          name: attendance.user?.fullname || "-",
          department: attendance.user?.department?.name || "-",
          major: attendance.user?.major?.name || "-",
          classYear: attendance.user?.classYear || attendance.user?.level || "-",
          participationDate: formatDate(attendance.createdAt),
          status: attendance.status,
          userId: attendance.user?.id || null,
        })),
      );
    } catch (error) {
      console.error("Error fetching students for activity:", error);
      message.error("ไม่สามารถโหลดข้อมูลนักศึกษาได้");
    } finally {
      setStudentsLoading(false);
    }
  };

  const handleViewStudents = async (activity) => {
    setSelectedActivity(activity);
    setStudentModalVisible(true);
    await fetchStudentsForActivity(activity.id);
  };

  const handleDownloadEvidence = async (student) => {
    const files = evidenceFilesByUser[student.userId] || [];
    if (!files.length) {
      message.warning("ไม่พบไฟล์หลักฐานสำหรับนักศึกษานี้");
      return;
    }

    try {
      for (const file of files) {
        const blob = await downloadFile(file.id);
        saveBlob(blob, file.fileName || `evidence_${student.studentCode}_${file.id}`);
      }
      message.success(`ดาวน์โหลดไฟล์ ${files.length} ไฟล์สำเร็จ`);
    } catch (error) {
      console.error("Error downloading evidence files:", error);
      message.error("ไม่สามารถดาวน์โหลดไฟล์ได้");
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = await downloadDepartmentReport();
      saveBlob(blob, "department-report.xlsx");
      message.success("ดาวน์โหลดรายงานสำเร็จ");
    } catch (error) {
      console.error("Error exporting department report:", error);
      message.error("ไม่สามารถดาวน์โหลดรายงานได้");
    } finally {
      setExporting(false);
    }
  };

  const activityColumns = [
    {
      title: "ลำดับ",
      width: 70,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "รายการกิจกรรม",
      dataIndex: "activityName",
      render: (name) => (
        <div className="font-medium" style={{ color: "#0A894C" }}>
          <FileText size={16} className="inline mr-2" />
          {name}
        </div>
      ),
    },
    {
      title: "ภาควิชา",
      dataIndex: "department",
      width: 180,
    },
    {
      title: "ประเภทกิจกรรม",
      dataIndex: "major",
      width: 160,
      render: (major) => <Tag color="#0A894C">{major}</Tag>,
    },
    {
      title: "ช่วงวันที่",
      width: 180,
      render: (_, record) => (
        <span>
          {record.startDate} - {record.endDate}
        </span>
      ),
    },
    {
      title: "จำนวนนักศึกษา",
      dataIndex: "studentCount",
      width: 120,
      align: "center",
      render: (count) => <Tag color="#1890ff">{count}</Tag>,
    },
    {
      title: "",
      width: 160,
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleViewStudents(record)}
          style={{ backgroundColor: "#0A894C", borderColor: "#0A894C" }}
        >
          ดูรายชื่อนักศึกษา
        </Button>
      ),
    },
  ];

  const studentColumns = [
    {
      title: "ลำดับ",
      width: 70,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "นักศึกษา",
      dataIndex: "name",
      render: (name, record) => (
        <div className="flex items-center gap-2">
          <Avatar size={32} style={{ backgroundColor: "#0A894C" }} icon={<User size={16} />} />
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-xs text-gray-500">{record.studentCode}</div>
          </div>
        </div>
      ),
    },
    {
      title: "ภาควิชา",
      dataIndex: "department",
      width: 150,
    },
    {
      title: "สาขา",
      dataIndex: "major",
      width: 120,
    },
    {
      title: "ชั้นปี",
      dataIndex: "classYear",
      width: 90,
      align: "center",
      render: (value) => (value === "-" ? "-" : `ปี ${value}`),
    },
    {
      title: "วันที่เข้าร่วม",
      dataIndex: "participationDate",
      width: 120,
      align: "center",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      width: 160,
      align: "center",
      render: (status) => (
        <Tag color={["APPROVED", "COMPLETED"].includes(status) ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "หลักฐาน",
      width: 160,
      align: "center",
      render: (_, record) => (
        <Button
          size="small"
          icon={<Download size={14} />}
          onClick={() => handleDownloadEvidence(record)}
          style={{
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            color: "#ffffff",
          }}
        >
          ดาวน์โหลด
        </Button>
      ),
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
          <h2 className="text-2xl font-bold mb-2">ภาควิชา {scope?.departmentName || "-"}</h2>
          <p className="text-sm opacity-90">รายงานกิจกรรมและการเข้าร่วมของนักศึกษาในภาควิชา</p>
        </div>
      </Card>

      <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
        <SearchInput
          placeholder="ค้นหาจากชื่อกิจกรรม/ภาควิชา/ประเภทกิจกรรม"
          allowClear
          size="large"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onSearch={setSearchQuery}
          enterButton={
            <Button
              type="primary"
              icon={<Search size={16} />}
              style={{
                backgroundColor: "#0A894C",
                borderColor: "#0A894C",
              }}
            >
              ค้นหา
            </Button>
          }
          style={{ maxWidth: 640 }}
        />

        <Button
          type="primary"
          icon={<Download size={16} />}
          loading={exporting}
          onClick={handleExport}
          style={{ backgroundColor: "#0A894C", borderColor: "#0A894C" }}
        >
          Export รายงานภาควิชา
        </Button>
      </div>

      <Card
        style={{
          borderRadius: 8,
          border: "1px solid #e8f5e9",
          boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)",
        }}
      >
        <Spin spinning={loading}>
          <Table
            columns={activityColumns}
            dataSource={filteredActivities}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `ทั้งหมด ${total} รายการ`,
            }}
            scroll={{ x: 1000 }}
          />
        </Spin>
      </Card>

      <Modal
        title={
          <div>
            <h3 className="text-lg font-semibold" style={{ color: "#0A894C" }}>
              รายชื่อนักศึกษา
            </h3>
            {selectedActivity && (
              <div className="mt-2 text-sm text-gray-600">
                <div className="font-medium text-base mb-1">{selectedActivity.activityName}</div>
                <Space size={12} wrap>
                  <span>
                    <MapPin size={14} className="inline mr-1" />
                    {selectedActivity.location}
                  </span>
                  <span>
                    <Calendar size={14} className="inline mr-1" />
                    {selectedActivity.startDate} - {selectedActivity.endDate}
                  </span>
                </Space>
              </div>
            )}
          </div>
        }
        open={studentModalVisible}
        onCancel={() => setStudentModalVisible(false)}
        width={1200}
        footer={null}
      >
        <Spin spinning={studentsLoading}>
          <Table
            columns={studentColumns}
            dataSource={studentsData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1100 }}
          />
        </Spin>
      </Modal>
    </div>
  );
}
