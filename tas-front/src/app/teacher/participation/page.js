"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, Spin, Tabs, message } from "antd";
import { FileCheck, Users } from "lucide-react";
import EvidenceListModal from "@/components/participation/EvidenceListModal";
import ParticipationTable from "@/components/participation/ParticipationTable";
import SearchFilterBar from "@/components/participation/SearchFilterBar";
import StudentListModal from "@/components/participation/StudentListModal";
import { getAllActivities } from "@/services/activity";
import { updateAttendance } from "@/services/attendance";
import { getFilesByActivity } from "@/services/file";
import { getUserScope } from "@/utils/sessionUser";

const getActivityDepartments = (activity) => {
  if (Array.isArray(activity?.departments) && activity.departments.length > 0) {
    return activity.departments;
  }
  if (activity?.department?.id) {
    return [activity.department];
  }
  return [];
};

const isInDepartmentScope = (activity, departmentId) =>
  getActivityDepartments(activity).some((department) => department?.id === departmentId);

const toFilesByAttendance = (files) => {
  const map = {};
  files.forEach((file) => {
    const attendanceId = file?.ownerId;
    if (!attendanceId) return;
    if (!map[attendanceId]) {
      map[attendanceId] = [];
    }
    map[attendanceId].push(file);
  });
  return map;
};

export default function TeacherParticipationPage() {
  const [activeTab, setActiveTab] = useState("participation");
  const [loading, setLoading] = useState(false);
  const [evidenceLoading, setEvidenceLoading] = useState(false);
  const [scope, setScope] = useState(null);
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    major: null,
    year: null,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [evidenceModalVisible, setEvidenceModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [filesByAttendanceId, setFilesByAttendanceId] = useState({});

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
      console.error("Error fetching participation activities:", error);
      message.error("ไม่สามารถโหลดข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [scope?.departmentId]);

  const majorOptions = useMemo(() => {
    const set = new Set();
    activities.forEach((activity) => {
      (activity.majorJoins || []).forEach((item) => {
        if (item?.major?.name) {
          set.add(item.major.name);
        }
      });
    });
    return Array.from(set);
  }, [activities]);

  const filteredActivities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return activities.filter((activity) => {
      if (query) {
        const departmentName = activity.department?.name || "";
        const name = activity.name || "";
        const category = activity.typeActivity?.name || "";
        const searchable = `${name} ${departmentName} ${category}`.toLowerCase();
        if (!searchable.includes(query)) return false;
      }

      if (filters.major) {
        const hasMajor = (activity.majorJoins || []).some(
          (item) => item?.major?.name === filters.major,
        );
        if (!hasMajor) return false;
      }

      if (filters.year) {
        const hasYear = (activity.attendances || []).some(
          (attendance) => String(attendance?.user?.level || "") === String(filters.year),
        );
        if (!hasYear) return false;
      }

      return true;
    });
  }, [activities, searchQuery, filters]);

  const handleOpenParticipation = (activity) => {
    setSelectedActivity(activity);
    setModalVisible(true);
  };

  const handleOpenEvidence = async (activity) => {
    setSelectedActivity(activity);
    setEvidenceModalVisible(true);
    setEvidenceLoading(true);
    try {
      const files = await getFilesByActivity(activity.id);
      setFilesByAttendanceId(toFilesByAttendance(Array.isArray(files) ? files : []));
    } catch (error) {
      console.error("Error fetching evidence files:", error);
      setFilesByAttendanceId({});
      message.error("ไม่สามารถโหลดไฟล์หลักฐานได้");
    } finally {
      setEvidenceLoading(false);
    }
  };

  const handleApprove = async (attendance) => {
    try {
      await updateAttendance(attendance.id, { status: "APPROVED" });
      message.success("อนุมัติการเข้าร่วมสำเร็จ");
      await fetchActivities();
    } catch (error) {
      console.error("Error approving attendance:", error);
      message.error("ไม่สามารถอนุมัติการเข้าร่วมได้");
    }
  };

  const handleReject = async (attendance) => {
    try {
      await updateAttendance(attendance.id, {
        status: "REVISION_REQUIRED",
        remark: attendance.rejectReason || undefined,
      });
      message.success("ส่งกลับแก้ไขสำเร็จ");
      await fetchActivities();
    } catch (error) {
      console.error("Error requesting revision:", error);
      message.error("ไม่สามารถส่งกลับแก้ไขได้");
    }
  };

  const tabItems = [
    {
      key: "participation",
      label: (
        <span className="flex items-center gap-2">
          <Users size={18} />
          การเข้าร่วมกิจกรรม
        </span>
      ),
      children: (
        <div>
          <SearchFilterBar
            onSearch={setSearchQuery}
            onFilterChange={(type, value) =>
              setFilters((prev) => ({ ...prev, [type]: value }))
            }
            onReset={() => {
              setSearchQuery("");
              setFilters({ major: null, year: null });
            }}
            hideDepartmentFilter
            majorOptions={majorOptions}
          />
          <Card
            style={{
              borderRadius: 8,
              border: "1px solid #e8f5e9",
              boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)",
            }}
          >
            <Spin spinning={loading}>
              <ParticipationTable data={filteredActivities} onView={handleOpenParticipation} />
            </Spin>
          </Card>
        </div>
      ),
    },
    {
      key: "evidence",
      label: (
        <span className="flex items-center gap-2">
          <FileCheck size={18} />
          หลักฐานการเข้าร่วมกิจกรรม
        </span>
      ),
      children: (
        <div>
          <SearchFilterBar
            onSearch={setSearchQuery}
            onFilterChange={(type, value) =>
              setFilters((prev) => ({ ...prev, [type]: value }))
            }
            onReset={() => {
              setSearchQuery("");
              setFilters({ major: null, year: null });
            }}
            hideDepartmentFilter
            majorOptions={majorOptions}
          />
          <Card
            style={{
              borderRadius: 8,
              border: "1px solid #e8f5e9",
              boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)",
            }}
          >
            <Spin spinning={loading}>
              <ParticipationTable data={filteredActivities} onView={handleOpenEvidence} />
            </Spin>
          </Card>
        </div>
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
          <p className="text-sm opacity-90">
            ตรวจสอบการเข้าร่วมกิจกรรมและหลักฐานของนักศึกษาในภาควิชา
          </p>
        </div>
      </Card>

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" />

      <StudentListModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        activity={selectedActivity}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <EvidenceListModal
        visible={evidenceModalVisible}
        onClose={() => setEvidenceModalVisible(false)}
        activity={selectedActivity}
        onApprove={handleApprove}
        onReject={handleReject}
        filesByAttendanceId={filesByAttendanceId}
        loading={evidenceLoading}
      />
    </div>
  );
}
