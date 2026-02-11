"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Upload,
  message,
} from "antd";
import {
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Eye,
  FileText,
  MapPin,
  RefreshCw,
  Upload as UploadIcon,
  XCircle,
} from "lucide-react";
import { createAttendance, getAttendancesByUser } from "@/services/attendance";
import { downloadFile, getFilesByApplication, uploadFileAttendance } from "@/services/file";

const { Search } = Input;

const statusOptions = [
  { value: "APPLIED", label: "สมัครแล้ว" },
  { value: "APPROVED", label: "อนุมัติแล้ว" },
  { value: "REJECTED", label: "ไม่อนุมัติ" },
  { value: "REVISION_REQUIRED", label: "ขอแก้ไข" },
  { value: "SUBMITTED", label: "ส่งตรวจแล้ว" },
  { value: "COMPLETED", label: "สำเร็จแล้ว" },
  { value: "CANCELLED", label: "ยกเลิก" },
  { value: "NO_SHOW", label: "ไม่เข้าร่วม" },
];

const canUploadStatuses = new Set(["APPLIED", "APPROVED", "REVISION_REQUIRED"]);
const canReapplyStatuses = new Set(["REVISION_REQUIRED", "REJECTED"]);
const canDownloadStatuses = new Set(["APPROVED", "COMPLETED"]);

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

const statusConfig = {
  APPLIED: { color: "blue", icon: <Clock size={14} />, text: "สมัครแล้ว" },
  APPROVED: { color: "green", icon: <CheckCircle size={14} />, text: "อนุมัติแล้ว" },
  REJECTED: { color: "red", icon: <XCircle size={14} />, text: "ไม่อนุมัติ" },
  REVISION_REQUIRED: { color: "orange", icon: <Clock size={14} />, text: "ขอแก้ไข" },
  COMPLETED: { color: "green", icon: <CheckCircle size={14} />, text: "สำเร็จแล้ว" },
  SUBMITTED: { color: "gold", icon: <Clock size={14} />, text: "ส่งตรวจแล้ว" },
  CANCELLED: { color: "red", icon: <XCircle size={14} />, text: "ยกเลิก" },
  NO_SHOW: { color: "volcano", icon: <XCircle size={14} />, text: "ไม่เข้าร่วม" },
};

const getStatusTag = (status) => {
  const config = statusConfig[status] || statusConfig.APPLIED;
  return (
    <Tag color={config.color}>
      <span className="flex items-center gap-1">
        {config.icon}
        {config.text}
      </span>
    </Tag>
  );
};

const getEvidenceStatusTag = (hasFiles) =>
  hasFiles ? <Tag color="blue">อัพโหลดแล้ว</Tag> : <Tag>ยังไม่ได้อัพโหลด</Tag>;

export default function StudentParticipationPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [reapplyingId, setReapplyingId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);

  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [evidenceModalVisible, setEvidenceModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [uploadFileList, setUploadFileList] = useState([]);

  const loadActivities = async (user) => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const attendances = await getAttendancesByUser(user.id);

      const mapped = await Promise.all(
        attendances.map(async (attendance) => {
          const activity = attendance.activity || {};
          const evidenceFiles = await getFilesByApplication(attendance.id);

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
            hasEvidence: evidenceFiles.length > 0,
          };
        }),
      );

      setActivities(mapped);
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถโหลดข้อมูลกิจกรรมได้";
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
        loadActivities(user);
      } else {
        setLoading(false);
      }
    } catch (_error) {
      setLoading(false);
    }
  }, []);

  const filteredActivities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return activities.filter((activity) => {
      if (query && !activity.name.toLowerCase().includes(query)) return false;
      if (statusFilter && activity.status !== statusFilter) return false;
      return true;
    });
  }, [activities, searchQuery, statusFilter]);

  const handleRefresh = async () => {
    if (userInfo?.id) {
      await loadActivities(userInfo);
    }
  };

  const handleViewDetails = (record) => {
    setSelectedActivity(record);
    setDetailModalVisible(true);
  };

  const handleOpenUpload = (record) => {
    setSelectedActivity(record);
    setUploadFileList([]);
    setEvidenceModalVisible(true);
  };

  const handleSubmitEvidence = async () => {
    if (!selectedActivity?.applicationId) return;
    if (!uploadFileList.length) {
      message.warning("กรุณาเลือกไฟล์หลักฐาน");
      return;
    }

    const file = uploadFileList[0]?.originFileObj || uploadFileList[0];
    if (!file) {
      message.warning("ไม่พบไฟล์ที่เลือก");
      return;
    }

    setUploading(true);
    try {
      await uploadFileAttendance(file, selectedActivity.applicationId);
      message.success("อัพโหลดหลักฐานสำเร็จ");
      setEvidenceModalVisible(false);
      setSelectedActivity(null);
      setUploadFileList([]);
      await handleRefresh();
    } catch (error) {
      const text = error?.response?.data?.message || "อัพโหลดหลักฐานไม่สำเร็จ";
      message.error(text);
    } finally {
      setUploading(false);
    }
  };

  const handleReapply = async (record) => {
    if (!record?.activityId) return;
    setReapplyingId(record.id);
    try {
      await createAttendance({ activityId: record.activityId });
      message.success(`ขอลงทะเบียนอีกรอบสำหรับ "${record.name}" สำเร็จ`);
      await handleRefresh();
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถขอลงทะเบียนอีกรอบได้";
      message.error(text);
    } finally {
      setReapplyingId(null);
    }
  };

  const handleDownloadEvidence = async (record) => {
    const file = record?.evidenceFiles?.[0];
    if (!file?.id) {
      message.warning("ไม่พบไฟล์หลักฐานสำหรับดาวน์โหลด");
      return;
    }

    setDownloadingId(record.id);
    try {
      const blob = await downloadFile(file.id);
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
      message.error(text);
    } finally {
      setDownloadingId(null);
    }
  };

  const columns = [
    {
      title: "ชื่อกิจกรรม",
      dataIndex: "name",
      key: "name",
      width: 300,
      render: (text, record) => (
        <div>
          <div className="font-semibold text-gray-800">{text}</div>
          <div className="text-xs text-gray-500">{record.category}</div>
        </div>
      ),
    },
    {
      title: "วันที่และเวลา",
      key: "datetime",
      width: 260,
      render: (_, record) => (
        <div className="text-sm">
          <div className="flex items-center gap-1 mb-1">
            <Calendar size={14} className="text-gray-500" />
            <span>{record.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-gray-500" />
            <span className="text-gray-600">{record.time}</span>
          </div>
        </div>
      ),
    },
    {
      title: "ชั่วโมง",
      dataIndex: "hours",
      key: "hours",
      width: 110,
      align: "center",
      render: (hours) => <Tag color="blue">{hours} ชม.</Tag>,
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => getStatusTag(status),
    },
    {
      title: "หลักฐาน",
      key: "evidence",
      width: 130,
      render: (_, record) => getEvidenceStatusTag(record.hasEvidence),
    },
    {
      title: "การจัดการ",
      key: "actions",
      width: 220,
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<Eye size={16} />}
            onClick={() => handleViewDetails(record)}
            style={{ color: "#0A894C", padding: 0 }}
            title="ดูรายละเอียด"
          />
          {canUploadStatuses.has(record.status) && (
            <Button
              type="link"
              icon={<UploadIcon size={16} />}
              onClick={() => handleOpenUpload(record)}
              style={{ color: "#0A894C", padding: 0 }}
              title="อัพโหลดหลักฐาน"
            />
          )}
          {canReapplyStatuses.has(record.status) && (
            <Button
              type="link"
              icon={<RefreshCw size={16} />}
              loading={reapplyingId === record.id}
              onClick={() => handleReapply(record)}
              style={{ color: "#1890ff", padding: 0 }}
              title="ขอลงทะเบียนอีกรอบ"
            />
          )}
          {canDownloadStatuses.has(record.status) && record.hasEvidence && (
            <Button
              type="link"
              icon={<Download size={16} />}
              loading={downloadingId === record.id}
              onClick={() => handleDownloadEvidence(record)}
              style={{ color: "#0A894C", padding: 0 }}
              title="ดาวน์โหลดหลักฐาน"
            />
          )}
        </Space>
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
          <h2 className="text-2xl font-bold mb-1">กิจกรรมของฉัน</h2>
          <p className="text-sm opacity-90">ติดตามสถานะการสมัครและการส่งหลักฐาน</p>
        </div>
      </Card>

      <Card className="mb-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex-1">
            <Search
              placeholder="ค้นหากิจกรรม..."
              allowClear
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <div className="w-full md:w-52">
            <Select
              placeholder="กรองตามสถานะ"
              allowClear
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: "100%" }}
              options={statusOptions}
            />
          </div>
          <Button icon={<RefreshCw size={16} />} onClick={handleRefresh} loading={loading}>
            รีเฟรช
          </Button>
        </div>
      </Card>

      <Card>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredActivities}
          loading={loading}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `ทั้งหมด ${total} กิจกรรม`,
          }}
          scroll={{ x: 1000 }}
          locale={{
            emptyText: loading ? <Spin /> : "ไม่พบข้อมูลกิจกรรม",
          }}
        />
      </Card>

      <Modal
        title="รายละเอียดกิจกรรม"
        open={detailModalVisible}
        onCancel={() => {
          setDetailModalVisible(false);
          setSelectedActivity(null);
        }}
        footer={null}
      >
        {selectedActivity && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{selectedActivity.name}</h3>
            <Tag color="green">{selectedActivity.category}</Tag>
            <div className="text-sm text-gray-700">
              <Calendar size={16} className="inline mr-2" />
              {selectedActivity.date}
            </div>
            <div className="text-sm text-gray-700">
              <Clock size={16} className="inline mr-2" />
              {selectedActivity.time} ({selectedActivity.hours} ชั่วโมง)
            </div>
            <div className="text-sm text-gray-700">
              <MapPin size={16} className="inline mr-2" />
              {selectedActivity.location}
            </div>
            <div>
              <span className="text-sm text-gray-700 mr-2">สถานะ:</span>
              {getStatusTag(selectedActivity.status)}
            </div>

            {(selectedActivity.status === "REVISION_REQUIRED" || selectedActivity.status === "REJECTED") &&
              selectedActivity.remark && (
                <Alert
                  type={selectedActivity.status === "REJECTED" ? "error" : "warning"}
                  message={selectedActivity.status === "REJECTED" ? "ไม่อนุมัติ" : "ต้องแก้ไขหลักฐาน"}
                  description={selectedActivity.remark}
                />
              )}

            {canReapplyStatuses.has(selectedActivity.status) && (
              <Button
                icon={<RefreshCw size={16} />}
                onClick={() => handleReapply(selectedActivity)}
                loading={reapplyingId === selectedActivity.id}
              >
                ขอลงทะเบียนอีกรอบ
              </Button>
            )}
          </div>
        )}
      </Modal>

      <Modal
        title="อัพโหลดหลักฐานกิจกรรม"
        open={evidenceModalVisible}
        onOk={handleSubmitEvidence}
        onCancel={() => {
          setEvidenceModalVisible(false);
          setSelectedActivity(null);
          setUploadFileList([]);
        }}
        okText="บันทึก"
        cancelText="ยกเลิก"
        confirmLoading={uploading}
        okButtonProps={{
          style: { backgroundColor: "#0A894C", borderColor: "#0A894C" },
        }}
      >
        {selectedActivity && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">{selectedActivity.name}</h4>
              <p className="text-sm text-gray-600">{selectedActivity.category}</p>
            </div>

            <Upload.Dragger
              accept=".pdf"
              fileList={uploadFileList}
              maxCount={1}
              beforeUpload={(file) => {
                const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name || "");
                if (!isPdf) {
                  message.error("รองรับเฉพาะไฟล์ PDF เท่านั้น");
                  return Upload.LIST_IGNORE;
                }
                return false;
              }}
              onChange={({ fileList }) => setUploadFileList(fileList)}
            >
              <p className="ant-upload-drag-icon flex justify-center">
                <UploadIcon size={44} style={{ color: "#0A894C" }} />
              </p>
              <p className="ant-upload-text">คลิกหรือลากไฟล์มาเพื่ออัพโหลด</p>
              <p className="ant-upload-hint">รองรับเฉพาะไฟล์ PDF เท่านั้น</p>
            </Upload.Dragger>

            {selectedActivity.evidenceFiles?.length > 0 && (
              <div>
                <h5 className="font-medium mb-2">ไฟล์ที่มีอยู่แล้ว</h5>
                <div className="space-y-2">
                  {selectedActivity.evidenceFiles.map((file) => (
                    <div key={file.id} className="p-2 rounded border bg-gray-50 text-sm">
                      <FileText size={15} className="inline mr-1" />
                      {file.fileName}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
