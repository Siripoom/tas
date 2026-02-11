"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Col, Modal, Progress, Row, Spin, Tag, message } from "antd";
import { CalendarCheck, CheckCircle, Clock, MapPin, Users } from "lucide-react";
import { getAllActivities } from "@/services/activity";
import { createAttendance, getAttendancesByUser } from "@/services/attendance";
import { getMyProgress } from "@/services/student";

const joinCountStatuses = new Set(["APPLIED", "APPROVED", "REVISION_REQUIRED"]);

const toDateText = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const toTimeText = (startAt, endAt) => {
  if (!startAt || !endAt) return "ไม่ระบุเวลา";
  const start = new Date(startAt);
  const end = new Date(endAt);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "ไม่ระบุเวลา";
  return `${start.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${end.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value];
};

const getUserScope = (user) => ({
  facultyId: user?.facultyId || user?.faculty?.id || null,
  departmentId: user?.departmentId || user?.department?.id || null,
  majorId: user?.majorId || user?.major?.id || null,
});

const isActivityEligibleForStudent = (activity, user) => {
  const scope = getUserScope(user);
  const departmentIds = toArray(activity.departmentIds);
  const majorIds = toArray(activity.majorIds);

  if (departmentIds.length > 0) {
    if (!scope.departmentId || !departmentIds.includes(scope.departmentId)) return false;
  } else if (activity.ownerScope === "DEPARTMENT" && activity.departmentId) {
    if (!scope.departmentId || activity.departmentId !== scope.departmentId) return false;
  } else if (activity.ownerScope === "FACULTY" && activity.facultyId) {
    if (!scope.facultyId || activity.facultyId !== scope.facultyId) return false;
  }

  if (majorIds.length > 0) {
    if (!scope.majorId || !majorIds.includes(scope.majorId)) return false;
  }

  return true;
};

const getCurrentParticipantCount = (activity) =>
  toArray(activity.attendances).filter((attendance) => joinCountStatuses.has(attendance.status)).length;

export default function StudentHomePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [activities, setActivities] = useState([]);
  const [userAttendances, setUserAttendances] = useState([]);
  const [progress, setProgress] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [joinModalVisible, setJoinModalVisible] = useState(false);

  const loadData = async (user) => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const [activitiesData, attendanceData, progressData] = await Promise.all([
        getAllActivities({ status: "OPEN_REGISTRATION" }),
        getAttendancesByUser(user.id),
        getMyProgress(),
      ]);

      setActivities(Array.isArray(activitiesData) ? activitiesData : []);
      setUserAttendances(Array.isArray(attendanceData) ? attendanceData : []);
      setProgress(progressData || null);
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถโหลดข้อมูลนักศึกษาได้";
      message.error(text);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      const user = raw ? JSON.parse(raw) : null;
      setUserInfo(user);
      if (user?.id) {
        loadData(user);
      } else {
        setLoading(false);
      }
    } catch (_error) {
      setLoading(false);
    }
  }, []);

  const joinedActivityIds = useMemo(
    () => new Set(userAttendances.map((attendance) => attendance.activityId)),
    [userAttendances],
  );

  const eligibleActivities = useMemo(
    () => activities.filter((activity) => isActivityEligibleForStudent(activity, userInfo)),
    [activities, userInfo],
  );

  const summary = useMemo(
    () => ({
      totalActivities: eligibleActivities.length,
      joinedCount: eligibleActivities.filter((activity) => joinedActivityIds.has(activity.id)).length,
    }),
    [eligibleActivities, joinedActivityIds],
  );

  const handleOpenJoinModal = (activity) => {
    setSelectedActivity(activity);
    setJoinModalVisible(true);
  };

  const handleConfirmJoin = async () => {
    if (!selectedActivity?.id || !userInfo?.id) return;

    setSubmitting(true);
    try {
      await createAttendance({
        activityId: selectedActivity.id,
      });
      message.success(`ลงทะเบียนกิจกรรม "${selectedActivity.name}" สำเร็จ`);
      setJoinModalVisible(false);
      setSelectedActivity(null);
      await loadData(userInfo);
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถลงทะเบียนกิจกรรมได้";
      message.error(text);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div>
        <Card
          className="mb-6 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #0A894C 0%, #0ea258 100%)",
            border: "none",
          }}
        >
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-1">สวัสดี, {userInfo?.fullname || "นักศึกษา"}</h2>
            <p className="text-sm opacity-90">ข้อมูลกิจกรรมและชั่วโมงสะสมของคุณ</p>
          </div>
        </Card>

        {progress && (
          <Card className="mb-4">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <div className="text-sm text-gray-500">ชั่วโมงสะสม</div>
                <div className="text-3xl font-bold text-[#0A894C]">{progress.totalHours || 0}</div>
              </Col>
              <Col xs={24} md={8}>
                <div className="text-sm text-gray-500">เป้าหมาย</div>
                <div className="text-3xl font-bold text-[#0A894C]">{progress.targetHours || 60}</div>
              </Col>
              <Col xs={24} md={8}>
                <div className="text-sm text-gray-500">ความคืบหน้า</div>
                <Progress percent={progress.percent || 0} strokeColor="#0A894C" />
                <div className="text-xs text-gray-500 mt-1">
                  นอกชั้นเรียน: {progress.breakdown?.completedRecordHours || 0} | เข้าร่วมกิจกรรม:{" "}
                  {progress.breakdown?.approvedActivityHours || 0}
                </div>
              </Col>
            </Row>
          </Card>
        )}

        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} md={12}>
            <Card>
              <div className="text-sm text-gray-500">กิจกรรมที่เปิดให้คุณเข้าร่วม</div>
              <div className="text-3xl font-bold text-[#0A894C]">{summary.totalActivities}</div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card>
              <div className="text-sm text-gray-500">กิจกรรมที่คุณสมัครแล้ว</div>
              <div className="text-3xl font-bold text-[#0A894C]">{summary.joinedCount}</div>
            </Card>
          </Col>
        </Row>

        <Card>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-[#0A894C]">รายการกิจกรรมที่เปิดรับสมัคร</h3>
          </div>

          {eligibleActivities.length === 0 ? (
            <Alert type="info" message="ไม่พบกิจกรรมที่เปิดรับสมัครสำหรับสาขา/ภาควิชาของคุณ" />
          ) : (
            <Row gutter={[16, 16]}>
              {eligibleActivities.map((activity) => {
                const currentParticipants = getCurrentParticipantCount(activity);
                const capacity = Number(activity.maxPeopleCount || activity.maxStudents || 0);
                const isFull = capacity > 0 && currentParticipants >= capacity;
                const isJoined = joinedActivityIds.has(activity.id);

                return (
                  <Col xs={24} md={12} lg={8} key={activity.id}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: 12,
                        border: "1px solid #e8f5e9",
                        boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)",
                      }}
                    >
                      <div className="mb-2">
                        <Tag color="green">{activity.typeActivity?.name || "ยังไม่กำหนดประเภท"}</Tag>
                      </div>
                      <h4 className="text-base font-semibold mb-3">{activity.name}</h4>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <CalendarCheck size={16} />
                          <span>{toDateText(activity.startAt || activity.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>
                            {toTimeText(activity.startAt || activity.startDate, activity.endAt || activity.endDate)} (
                            {activity.hours || activity.hour || 0} ชั่วโมง)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span className="line-clamp-1">{activity.location || activity.address || "-"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          <span>
                            {currentParticipants}/{capacity || "-"} คน
                          </span>
                        </div>
                      </div>

                      <Button
                        type="primary"
                        block
                        disabled={isFull || isJoined}
                        onClick={() => handleOpenJoinModal(activity)}
                        style={{
                          backgroundColor: isJoined ? "#10b981" : isFull ? "#d1d5db" : "#0A894C",
                          borderColor: isJoined ? "#10b981" : isFull ? "#d1d5db" : "#0A894C",
                        }}
                      >
                        {isJoined ? "เข้าร่วมแล้ว" : isFull ? "เต็ม" : "ลงทะเบียน"}
                      </Button>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Card>

        <Modal
          title="ยืนยันการลงทะเบียนกิจกรรม"
          open={joinModalVisible}
          onOk={handleConfirmJoin}
          onCancel={() => {
            setJoinModalVisible(false);
            setSelectedActivity(null);
          }}
          confirmLoading={submitting}
          okText="ยืนยัน"
          cancelText="ยกเลิก"
          okButtonProps={{
            style: { backgroundColor: "#0A894C", borderColor: "#0A894C" },
          }}
        >
          {selectedActivity && (
            <div className="space-y-2">
              <h4 className="font-semibold">{selectedActivity.name}</h4>
              <div className="text-sm text-gray-600">
                วันที่: {toDateText(selectedActivity.startAt || selectedActivity.startDate)}
              </div>
              <div className="text-sm text-gray-600">
                เวลา:{" "}
                {toTimeText(
                  selectedActivity.startAt || selectedActivity.startDate,
                  selectedActivity.endAt || selectedActivity.endDate,
                )}
              </div>
              <div className="text-sm text-gray-600">
                สถานที่: {selectedActivity.location || selectedActivity.address || "-"}
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
                <CheckCircle size={16} className="inline mr-1" />
                เมื่อผ่านการอนุมัติจะได้รับ {selectedActivity.hours || selectedActivity.hour || 0} ชั่วโมง
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Spin>
  );
}
