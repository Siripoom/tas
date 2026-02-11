"use client";

import { useEffect, useMemo, useState } from "react";
import { Avatar, Button, Modal, Space, Spin, Table, Tag, Input, Image } from "antd";
import { CheckCircle, Eye, FileText, User, XCircle } from "lucide-react";
import { downloadFile } from "@/services/file";

const { TextArea } = Input;

const previewableMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const statusConfig = {
  APPLIED: { color: "#fa8c16", text: "รอตรวจ" },
  REVISION_REQUIRED: { color: "#f5222d", text: "ต้องแก้ไข" },
  APPROVED: { color: "#0A894C", text: "อนุมัติแล้ว" },
  COMPLETED: { color: "#0A894C", text: "เสร็จสิ้น" },
};

const isActionableStatus = (status) => ["APPLIED", "REVISION_REQUIRED"].includes(status);

const fileLabel = (file) => {
  if (file.fileType === "PDF" || file.mimeType === "application/pdf") return "PDF";
  return "รูปภาพ";
};

const EvidenceListModal = ({
  visible,
  onClose,
  activity,
  onApprove,
  onReject,
  filesByAttendanceId = {},
  loading = false,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [studentsToReject, setStudentsToReject] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [openingFileId, setOpeningFileId] = useState(null);

  useEffect(() => {
    return () => {
      if (previewImage) {
        window.URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const studentsWithEvidence = useMemo(() => {
    const attendances = Array.isArray(activity?.attendances) ? activity.attendances : [];
    return attendances.map((attendance) => {
      const files = filesByAttendanceId[attendance.id] || [];
      return {
        ...attendance,
        studentId: attendance.user?.studentCode || attendance.user?.studentId || "-",
        name:
          attendance.user?.fullname ||
          `${attendance.user?.firstName || ""} ${attendance.user?.lastName || ""}`.trim() ||
          "Unknown",
        department: attendance.user?.department?.name || "-",
        major: attendance.user?.major?.name || "-",
        year: attendance.user?.classYear || attendance.user?.level || "-",
        uploadDate: attendance.updatedAt?.split("T")[0] || "-",
        files,
      };
    });
  }, [activity?.attendances, filesByAttendanceId]);

  const handleOpenFile = async (file) => {
    setOpeningFileId(file.id);
    try {
      const blob = await downloadFile(file.id);
      const objectUrl = window.URL.createObjectURL(blob);

      if (previewableMimeTypes.includes(file.mimeType)) {
        if (previewImage) {
          window.URL.revokeObjectURL(previewImage);
        }
        setPreviewImage(objectUrl);
        setPreviewTitle(file.fileName || "Evidence");
        setPreviewVisible(true);
      } else {
        window.open(objectUrl, "_blank", "noopener,noreferrer");
        setTimeout(() => {
          window.URL.revokeObjectURL(objectUrl);
        }, 30000);
      }
    } catch (error) {
      console.error("Error opening evidence file:", error);
    } finally {
      setOpeningFileId(null);
    }
  };

  const handleBulkApprove = () => {
    const selectedStudents = studentsWithEvidence.filter((student) =>
      selectedRowKeys.includes(student.id),
    );
    selectedStudents.forEach((student) => onApprove(student));
    setSelectedRowKeys([]);
  };

  const handleRejectClick = (student = null) => {
    if (student) {
      setStudentsToReject([student]);
    } else {
      const selectedStudents = studentsWithEvidence.filter((item) =>
        selectedRowKeys.includes(item.id),
      );
      setStudentsToReject(selectedStudents);
    }
    setRejectModalVisible(true);
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      alert("กรุณาระบุเหตุผลในการส่งกลับแก้ไข");
      return;
    }

    studentsToReject.forEach((student) => {
      onReject({ ...student, rejectReason: rejectReason.trim() });
    });

    setRejectModalVisible(false);
    setRejectReason("");
    setStudentsToReject([]);
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
    getCheckboxProps: (record) => ({
      disabled: !isActionableStatus(record.status),
    }),
  };

  const columns = [
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
          <Avatar size={32} style={{ backgroundColor: "#0A894C" }} icon={<User size={18} />} />
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-xs text-gray-500">{record.studentId}</div>
          </div>
        </div>
      ),
    },
    {
      title: "ภาควิชา",
      dataIndex: "department",
      width: 160,
    },
    {
      title: "สาขา",
      dataIndex: "major",
      width: 120,
      align: "center",
      render: (major) => <Tag color="#0A894C">{major}</Tag>,
    },
    {
      title: "ชั้นปี",
      dataIndex: "year",
      width: 90,
      align: "center",
      render: (year) => (year === "-" ? "-" : `ปี ${year}`),
    },
    {
      title: "ไฟล์หลักฐาน",
      width: 320,
      render: (_, record) => {
        if (!record.files.length) {
          return <span className="text-gray-400">ยังไม่มีไฟล์หลักฐาน</span>;
        }

        return (
          <Space wrap>
            {record.files.map((file) => (
              <Button
                key={file.id}
                size="small"
                icon={<Eye size={14} />}
                loading={openingFileId === file.id}
                onClick={() => handleOpenFile(file)}
              >
                {fileLabel(file)}
              </Button>
            ))}
          </Space>
        );
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      width: 120,
      align: "center",
      render: (status) => {
        const config = statusConfig[status] || { color: "default", text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "การจัดการ",
      width: 170,
      align: "center",
      render: (_, record) => {
        if (!isActionableStatus(record.status)) {
          return <span className="text-xs text-gray-500">ไม่มีรายการที่ต้องจัดการ</span>;
        }

        return (
          <Space size={4}>
            <Button
              size="small"
              type="primary"
              icon={<CheckCircle size={14} />}
              onClick={() => onApprove(record)}
              style={{ backgroundColor: "#0A894C", borderColor: "#0A894C" }}
            >
              อนุมัติ
            </Button>
            <Button size="small" danger icon={<XCircle size={14} />} onClick={() => handleRejectClick(record)}>
              ส่งกลับ
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        title={
          <div>
            <h3 className="text-lg font-semibold" style={{ color: "#0A894C" }}>
              <FileText size={20} className="inline mr-2" />
              หลักฐานการเข้าร่วมกิจกรรม
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {activity?.name || activity?.activityName || "กิจกรรม"}
            </p>
          </div>
        }
        open={visible}
        onCancel={onClose}
        width={1200}
        footer={null}
      >
        <Spin spinning={loading}>
          {selectedRowKeys.length > 0 && (
            <div className="mb-4 flex gap-2">
              <Button
                type="primary"
                icon={<CheckCircle size={16} />}
                onClick={handleBulkApprove}
                style={{
                  backgroundColor: "#0A894C",
                  borderColor: "#0A894C",
                }}
              >
                อนุมัติที่เลือก ({selectedRowKeys.length})
              </Button>
              <Button danger icon={<XCircle size={16} />} onClick={() => handleRejectClick()}>
                ส่งกลับแก้ไข ({selectedRowKeys.length})
              </Button>
            </div>
          )}

          <Table
            columns={columns}
            dataSource={studentsWithEvidence}
            rowKey="id"
            rowSelection={rowSelection}
            pagination={{ pageSize: 6 }}
            scroll={{ x: 1100 }}
          />
        </Spin>
      </Modal>

      <Modal open={previewVisible} title={previewTitle} footer={null} onCancel={() => setPreviewVisible(false)} width={700}>
        <Image src={previewImage} alt={previewTitle} style={{ width: "100%" }} preview={false} />
      </Modal>

      <Modal
        title="เหตุผลการส่งกลับแก้ไข"
        open={rejectModalVisible}
        onCancel={() => {
          setRejectModalVisible(false);
          setRejectReason("");
          setStudentsToReject([]);
        }}
        onOk={handleConfirmReject}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
        okButtonProps={{
          style: { backgroundColor: "#f5222d", borderColor: "#f5222d" },
        }}
      >
        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            นักศึกษาที่ส่งกลับ: {studentsToReject.map((student) => student.name).join(", ")}
          </p>
          <TextArea
            rows={4}
            placeholder="กรุณาระบุเหตุผล..."
            value={rejectReason}
            onChange={(event) => setRejectReason(event.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default EvidenceListModal;
