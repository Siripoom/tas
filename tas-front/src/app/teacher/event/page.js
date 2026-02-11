"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Spin,
  Table,
  Tag,
  message,
} from "antd";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import {
  createActivity,
  deleteActivity,
  getAllActivities,
  updateActivity,
} from "@/services/activity";
import { getMajorsByDepartment } from "@/services/department";
import { getAllTypeActivities } from "@/services/typeActivity";
import { getUserScope } from "@/utils/sessionUser";

const statusOptions = [
  { value: "OPEN_REGISTRATION", label: "เปิดรับสมัคร" },
  { value: "IN_PROGRESS", label: "กำลังดำเนินการ" },
  { value: "CLOSED", label: "ปิดกิจกรรม" },
  { value: "CANCELLED", label: "ยกเลิกกิจกรรม" },
];

const evidenceTypeOptions = [
  { value: "BOTH", label: "ทั่วไป (รูปภาพ/PDF)" },
  { value: "PHOTO", label: "รูปภาพเท่านั้น" },
  { value: "PDF", label: "PDF เท่านั้น" },
];

const getActivityDepartments = (activity) => {
  if (Array.isArray(activity?.departments) && activity.departments.length > 0) {
    return activity.departments;
  }
  if (activity?.department?.id) return [activity.department];
  return [];
};

const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value];
};

const uniqueById = (items) => {
  const map = new Map();
  items.forEach((item) => {
    if (item?.id) map.set(item.id, item);
  });
  return Array.from(map.values());
};

const toMajorJoinList = (activity) => {
  if (Array.isArray(activity?.majorJoins)) return activity.majorJoins;
  if (Array.isArray(activity?.targetMajors)) return activity.targetMajors;
  return [];
};

const getActivityMajorIds = (activity) => {
  const majorIds = toArray(activity?.majorIds);
  if (majorIds.length > 0) return majorIds;

  return toMajorJoinList(activity)
    .map((item) => item?.majorId || item?.major?.id)
    .filter(Boolean);
};

const isInDepartmentScope = (activity, departmentId) =>
  getActivityDepartments(activity).some((department) => department?.id === departmentId);

const toDateTimeLocal = (value) => {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  const offset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const toIsoString = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
};

const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("th-TH");
};

export default function TeacherEventPage() {
  const [form] = Form.useForm();

  const [scope, setScope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [events, setEvents] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);
  const [typeActivities, setTypeActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);

  useEffect(() => {
    setScope(getUserScope());
  }, []);

  const fetchData = async () => {
    if (!scope?.departmentId) {
      message.error("ไม่พบข้อมูลภาควิชาของผู้ใช้");
      return;
    }

    setLoading(true);
    try {
      const [activitiesData, typeData, majorData] = await Promise.all([
        getAllActivities({ departmentId: scope.departmentId }),
        getAllTypeActivities(),
        getMajorsByDepartment(scope.departmentId),
      ]);

      const list = Array.isArray(activitiesData) ? activitiesData : [];
      setEvents(list.filter((activity) => isInDepartmentScope(activity, scope.departmentId)));
      setTypeActivities(Array.isArray(typeData) ? typeData : []);
      setMajorOptions(Array.isArray(majorData) ? majorData : []);
    } catch (error) {
      console.error("Error fetching teacher events:", error);
      message.error("ไม่สามารถโหลดข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [scope?.departmentId]);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return events.filter((event) => {
      if (query) {
        const searchable = `${event.name || ""} ${event.typeActivity?.name || ""}`.toLowerCase();
        if (!searchable.includes(query)) return false;
      }
      if (selectedCategory && (event.typeActivity?.id || event.typeActivityId) !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [events, searchQuery, selectedCategory]);

  const summary = useMemo(
    () => ({
      totalActivities: filteredEvents.length,
      totalHours: filteredEvents.reduce(
        (sum, event) => sum + Number(event.hour || event.hours || 0),
        0,
      ),
    }),
    [filteredEvents],
  );

  const openCreateModal = () => {
    const now = new Date();
    const plus1 = new Date(now.getTime() + 60 * 60 * 1000);
    const minus2h = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const minus1h = new Date(now.getTime() - 60 * 60 * 1000);

    setEditingEvent(null);
    form.resetFields();
    form.setFieldsValue({
      title: "",
      location: "",
      hours: 1,
      capacity: 1,
      activityTypeId: undefined,
      requiredEvidenceType: "BOTH",
      startAt: toDateTimeLocal(now),
      endAt: toDateTimeLocal(plus1),
      applyOpenAt: toDateTimeLocal(minus2h),
      applyCloseAt: toDateTimeLocal(minus1h),
      status: "OPEN_REGISTRATION",
      note: "",
      majorIds: [],
    });
    setIsModalVisible(true);
  };

  const openEditModal = (record) => {
    setEditingEvent(record);
    form.setFieldsValue({
      title: record.title || record.name || "",
      location: record.location || "",
      hours: Number(record.hours || record.hour || 1),
      capacity: Number(record.capacity || record.maxPeopleCount || 1),
      activityTypeId: record.typeActivity?.id || record.typeActivityId,
      requiredEvidenceType: record.requiredEvidenceType || "BOTH",
      startAt: toDateTimeLocal(record.startAt || record.startDate),
      endAt: toDateTimeLocal(record.endAt || record.endDate),
      applyOpenAt: toDateTimeLocal(record.applyOpenAt || record.applyOpen),
      applyCloseAt: toDateTimeLocal(record.applyCloseAt || record.applyClose),
      status: record.status || "OPEN_REGISTRATION",
      note: record.note || record.description || "",
      majorIds: getActivityMajorIds(record),
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      await deleteActivity(record.id);
      message.success(`ลบกิจกรรม "${record.name || record.title}" สำเร็จ`);
      await fetchData();
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถลบกิจกรรมได้";
      message.error(text);
    }
  };

  const handleSubmit = async (values) => {
    if (!scope?.departmentId) {
      message.error("ไม่พบข้อมูลภาควิชาของผู้ใช้");
      return;
    }

    const payload = {
      title: values.title,
      startAt: toIsoString(values.startAt),
      endAt: toIsoString(values.endAt),
      location: values.location,
      hours: Number(values.hours),
      requiredEvidenceType: values.requiredEvidenceType,
      activityTypeId: values.activityTypeId,
      capacity: Number(values.capacity),
      applyOpenAt: toIsoString(values.applyOpenAt),
      applyCloseAt: toIsoString(values.applyCloseAt),
      note: values.note || undefined,
      departmentIds: [scope.departmentId],
      majorIds: uniqueById(toArray(values.majorIds).map((id) => ({ id }))).map((item) => item.id),
      status: values.status,
    };

    setSaving(true);
    try {
      if (editingEvent) {
        await updateActivity(editingEvent.id, payload);
        message.success("แก้ไขกิจกรรมสำเร็จ");
      } else {
        await createActivity(payload);
        message.success("เพิ่มกิจกรรมสำเร็จ");
      }

      setIsModalVisible(false);
      setEditingEvent(null);
      form.resetFields();
      await fetchData();
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถบันทึกกิจกรรมได้";
      message.error(text);
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      title: "ลำดับ",
      width: 80,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "ชื่อกิจกรรม",
      dataIndex: "name",
      render: (name, record) => name || record.title || "-",
    },
    {
      title: "ประเภท",
      width: 200,
      render: (_, record) => (
        <Tag color="#0A894C">{record.typeActivity?.name || "ไม่ระบุประเภท"}</Tag>
      ),
    },
    {
      title: "ช่วงเวลา",
      width: 260,
      render: (_, record) => (
        <span>
          {formatDateTime(record.startAt || record.startDate)} -{" "}
          {formatDateTime(record.endAt || record.endDate)}
        </span>
      ),
    },
    {
      title: "สาขาวิชา",
      width: 260,
      render: (_, record) => {
        const majorJoins = toMajorJoinList(record);
        if (majorJoins.length === 0) {
          return <span className="text-gray-500">-</span>;
        }

        return (
          <div className="flex flex-wrap gap-1">
            {majorJoins.map((item) => (
              <Tag key={item.majorId} color="#0A894C">
                {item.major?.code ? `${item.major.code} - ` : ""}
                {item.major?.name || item.majorId}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "สถานะ",
      width: 160,
      render: (_, record) => (
        <Tag color="blue">
          {statusOptions.find((option) => option.value === record.status)?.label || record.status}
        </Tag>
      ),
    },
    {
      title: "จัดการ",
      width: 140,
      align: "center",
      render: (_, record) => (
        <div className="flex gap-1 justify-center">
          <Button type="text" icon={<Eye size={18} />} onClick={() => setViewingEvent(record)} />
          <Button type="text" icon={<Edit size={18} />} onClick={() => openEditModal(record)} />
          <Popconfirm
            title="ยืนยันการลบกิจกรรม"
            description="ต้องการลบกิจกรรมนี้หรือไม่"
            onConfirm={() => handleDelete(record)}
            okText="ลบ"
            cancelText="ยกเลิก"
          >
            <Button danger type="text" icon={<Trash2 size={18} />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card
        className="mb-4 shadow-sm"
        style={{
          background: "linear-gradient(135deg, #0A894C 0%, #0ea258 100%)",
          border: "none",
        }}
      >
        <div className="text-white">
          <h2 className="text-xl font-bold mb-1">ภาควิชา {scope?.departmentName || "-"}</h2>
          <p className="text-sm opacity-90">จัดการกิจกรรมของภาควิชา</p>
        </div>
      </Card>

      <div
        className="p-4 rounded-lg mb-4"
        style={{
          background: "#ffffff",
          border: "1px solid #e8f5e9",
          boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <Input
            placeholder="ค้นหาจากชื่อกิจกรรม"
            prefix={<Search size={16} style={{ color: "#0A894C" }} />}
            onChange={(event) => setSearchQuery(event.target.value)}
            value={searchQuery}
            size="large"
            style={{ maxWidth: 420, borderColor: "#0A894C" }}
          />
          <Button
            type="primary"
            icon={<Plus size={18} />}
            onClick={openCreateModal}
            size="large"
            style={{ backgroundColor: "#0A894C", borderColor: "#0A894C" }}
          >
            เพิ่มกิจกรรม
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Select
            placeholder="กรองตามประเภทกิจกรรม"
            allowClear
            value={selectedCategory}
            onChange={setSelectedCategory}
            style={{ minWidth: 300 }}
          >
            {typeActivities.map((type) => (
              <Select.Option key={type.id} value={type.id}>
                {type.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card
          style={{
            borderRadius: 8,
            border: "1px solid #e8f5e9",
            boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)",
            background: "linear-gradient(135deg, #0A894C 0%, #0ea258 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm mb-1 opacity-90">Total Activities</p>
              <h2 className="text-white text-3xl font-bold">{summary.totalActivities}</h2>
            </div>
            <div className="p-4 rounded-full" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
              <Search size={32} className="text-white" />
            </div>
          </div>
        </Card>

        <Card
          style={{
            borderRadius: 8,
            border: "1px solid #e8f5e9",
            boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)",
            background: "linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm mb-1 opacity-90">Total Activity Hours</p>
              <h2 className="text-white text-3xl font-bold">{summary.totalHours}</h2>
            </div>
            <div className="p-4 rounded-full" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
              <Plus size={32} className="text-white" />
            </div>
          </div>
        </Card>
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
            columns={columns}
            dataSource={filteredEvents}
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
          <h3 className="text-lg font-semibold" style={{ color: "#0A894C" }}>
            {editingEvent ? "แก้ไขกิจกรรม" : "เพิ่มกิจกรรม"}
          </h3>
        }
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingEvent(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText={editingEvent ? "บันทึก" : "เพิ่ม"}
        cancelText="ยกเลิก"
        confirmLoading={saving}
        width={860}
        okButtonProps={{
          style: { backgroundColor: "#0A894C", borderColor: "#0A894C" },
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
          <Form.Item
            label="ชื่อกิจกรรม"
            name="title"
            rules={[{ required: true, message: "กรุณากรอกชื่อกิจกรรม" }]}
          >
            <Input placeholder="ชื่อกิจกรรม" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="ประเภทกิจกรรม"
              name="activityTypeId"
              rules={[{ required: true, message: "กรุณาเลือกประเภทกิจกรรม" }]}
            >
              <Select placeholder="เลือกประเภทกิจกรรม">
                {typeActivities.map((type) => (
                  <Select.Option key={type.id} value={type.id}>
                    {type.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="รูปแบบหลักฐาน"
              name="requiredEvidenceType"
              rules={[{ required: true, message: "กรุณาเลือกรูปแบบหลักฐาน" }]}
            >
              <Select options={evidenceTypeOptions} />
            </Form.Item>
          </div>

          <Form.Item
            label="สถานที่"
            name="location"
            rules={[{ required: true, message: "กรุณากรอกสถานที่" }]}
          >
            <Input placeholder="สถานที่จัดกิจกรรม" />
          </Form.Item>

          <Form.Item
            label="สาขาวิชา"
            name="majorIds"
            rules={[{ required: true, message: "กรุณาเลือกสาขาวิชาอย่างน้อย 1 สาขา" }]}
          >
            <Select
              mode="multiple"
              placeholder="เลือกสาขาวิชา"
              options={majorOptions.map((major) => ({
                value: major.id,
                label: `${major.code} - ${major.name}`,
              }))}
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="วันที่เริ่มกิจกรรม"
              name="startAt"
              rules={[{ required: true, message: "กรุณาเลือกวันเวลาเริ่มกิจกรรม" }]}
            >
              <Input type="datetime-local" />
            </Form.Item>
            <Form.Item
              label="วันที่สิ้นสุดกิจกรรม"
              name="endAt"
              rules={[{ required: true, message: "กรุณาเลือกวันเวลาสิ้นสุดกิจกรรม" }]}
            >
              <Input type="datetime-local" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="วันเวลาเริ่มรับสมัคร"
              name="applyOpenAt"
              rules={[{ required: true, message: "กรุณาเลือกวันเวลาเริ่มรับสมัคร" }]}
            >
              <Input type="datetime-local" />
            </Form.Item>
            <Form.Item
              label="วันเวลาปิดรับสมัคร"
              name="applyCloseAt"
              rules={[{ required: true, message: "กรุณาเลือกวันเวลาปิดรับสมัคร" }]}
            >
              <Input type="datetime-local" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              label="ชั่วโมงกิจกรรม"
              name="hours"
              rules={[{ required: true, message: "กรุณากรอกชั่วโมงกิจกรรม" }]}
            >
              <Input type="number" min={1} />
            </Form.Item>
            <Form.Item
              label="จำนวนผู้เข้าร่วมสูงสุด"
              name="capacity"
              rules={[{ required: true, message: "กรุณากรอกจำนวนผู้เข้าร่วมสูงสุด" }]}
            >
              <Input type="number" min={1} />
            </Form.Item>
            <Form.Item
              label="สถานะ"
              name="status"
              rules={[{ required: true, message: "กรุณาเลือกสถานะ" }]}
            >
              <Select options={statusOptions} />
            </Form.Item>
          </div>

          <Form.Item label="หมายเหตุ" name="note">
            <Input.TextArea rows={3} placeholder="รายละเอียดเพิ่มเติม" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={
          <h3 className="text-lg font-semibold" style={{ color: "#0A894C" }}>
            รายละเอียดกิจกรรม
          </h3>
        }
        open={isViewModalVisible || Boolean(viewingEvent)}
        onCancel={() => {
          setIsViewModalVisible(false);
          setViewingEvent(null);
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setIsViewModalVisible(false);
              setViewingEvent(null);
            }}
          >
            ปิด
          </Button>,
        ]}
        width={760}
      >
        {viewingEvent && (
          <div className="space-y-3">
            <div>
              <label className="font-semibold text-gray-700">ชื่อกิจกรรม:</label>
              <p className="text-gray-600 mt-1">{viewingEvent.name || viewingEvent.title || "-"}</p>
            </div>
            <div>
              <label className="font-semibold text-gray-700">ประเภทกิจกรรม:</label>
              <p className="text-gray-600 mt-1">{viewingEvent.typeActivity?.name || "-"}</p>
            </div>
            <div>
              <label className="font-semibold text-gray-700">สถานที่:</label>
              <p className="text-gray-600 mt-1">{viewingEvent.location || "-"}</p>
            </div>
            <div>
              <label className="font-semibold text-gray-700">สาขาวิชา:</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {toMajorJoinList(viewingEvent).length > 0 ? (
                  toMajorJoinList(viewingEvent).map((item) => (
                    <Tag key={item.majorId} color="#0A894C">
                      {item.major?.code ? `${item.major.code} - ` : ""}
                      {item.major?.name || item.majorId}
                    </Tag>
                  ))
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700">ช่วงเวลากิจกรรม:</label>
                <p className="text-gray-600 mt-1">
                  {formatDateTime(viewingEvent.startAt || viewingEvent.startDate)} -{" "}
                  {formatDateTime(viewingEvent.endAt || viewingEvent.endDate)}
                </p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">ช่วงรับสมัคร:</label>
                <p className="text-gray-600 mt-1">
                  {formatDateTime(viewingEvent.applyOpenAt || viewingEvent.applyOpen)} -{" "}
                  {formatDateTime(viewingEvent.applyCloseAt || viewingEvent.applyClose)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700">ชั่วโมงกิจกรรม:</label>
                <p className="text-gray-600 mt-1">{viewingEvent.hour || viewingEvent.hours || 0}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">จำนวนผู้เข้าร่วมสูงสุด:</label>
                <p className="text-gray-600 mt-1">
                  {viewingEvent.maxPeopleCount || viewingEvent.capacity || 0}
                </p>
              </div>
            </div>
            <div>
              <label className="font-semibold text-gray-700">หมายเหตุ:</label>
              <p className="text-gray-600 mt-1">{viewingEvent.note || viewingEvent.description || "-"}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
