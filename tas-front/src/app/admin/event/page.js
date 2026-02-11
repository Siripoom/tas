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
  Space,
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
import {
  getAllDepartments,
  getMajorsByDepartment,
} from "@/services/department";
import { getAllTypeActivities } from "@/services/typeActivity";

const managerRoles = ["FACULTY_ADMIN", "SUPER_ADMIN"];
const activityStatuses = [
  { value: "OPEN_REGISTRATION", label: "เปิดรับสมัคร" },
  { value: "IN_PROGRESS", label: "กำลังดำเนินการ" },
  { value: "CLOSED", label: "ปิดกิจกรรม" },
  { value: "CANCELLED", label: "ยกเลิกกิจกรรม" },
];

const evidenceTypeOptions = [
  { value: "BOTH", label: "ทั่วไป (รูปภาพหรือ PDF)" },
  { value: "PHOTO", label: "รูปภาพเท่านั้น" },
  { value: "PDF", label: "PDF เท่านั้น" },
];

const uniqueById = (items) => {
  const map = new Map();
  items.forEach((item) => {
    if (item?.id) map.set(item.id, item);
  });
  return Array.from(map.values());
};

const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value];
};

const toDateTimeInput = (value) => {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
};

const toIso = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
};

const toDepartmentList = (event) => {
  if (Array.isArray(event.departments) && event.departments.length > 0) {
    return event.departments;
  }
  if (event.department?.id) {
    return [event.department];
  }
  return [];
};

const toMajorJoinList = (event) => {
  if (Array.isArray(event.majorJoins)) {
    return event.majorJoins;
  }
  return [];
};

export default function AdminEventPage() {
  const [form] = Form.useForm();
  const watchedDepartmentIds = Form.useWatch("departmentIds", form);

  const [sessionUser, setSessionUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [events, setEvents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);
  const [typeActivities, setTypeActivities] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);

  const isManager = managerRoles.includes(sessionUser?.role);
  const scopedDepartmentId = !isManager ? sessionUser?.departmentId || null : null;

  const loadMajorsByDepartments = async (departmentIds, keepCurrentSelection = true) => {
    const ids = uniqueById(
      toArray(departmentIds).map((id) => ({ id })),
    ).map((item) => item.id);

    if (ids.length === 0) {
      setMajorOptions([]);
      if (!keepCurrentSelection) {
        form.setFieldValue("majorIds", []);
      }
      return;
    }

    try {
      const allMajors = (
        await Promise.all(
          ids.map(async (departmentId) => {
            try {
              return await getMajorsByDepartment(departmentId);
            } catch (_error) {
              return [];
            }
          }),
        )
      ).flat();

      const uniqueMajors = uniqueById(allMajors).sort((a, b) =>
        String(a.code || "").localeCompare(String(b.code || ""), "th"),
      );

      setMajorOptions(uniqueMajors);

      if (keepCurrentSelection) {
        const selectedMajorIds = toArray(form.getFieldValue("majorIds"));
        const majorSet = new Set(uniqueMajors.map((item) => item.id));
        form.setFieldValue(
          "majorIds",
          selectedMajorIds.filter((majorId) => majorSet.has(majorId)),
        );
      }
    } catch (_error) {
      setMajorOptions([]);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const user = (() => {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
      })();
      setSessionUser(user);

      const canListDepartments = managerRoles.includes(user?.role);
      const [activitiesData, typeData, departmentData] = await Promise.all([
        getAllActivities(),
        getAllTypeActivities(),
        canListDepartments ? getAllDepartments() : Promise.resolve([]),
      ]);

      setEvents(Array.isArray(activitiesData) ? activitiesData : []);
      setTypeActivities(Array.isArray(typeData) ? typeData : []);

      if (canListDepartments) {
        setDepartments(Array.isArray(departmentData) ? departmentData : []);
      } else if (user?.department?.id) {
        setDepartments([user.department]);
      } else {
        const eventDepartments = uniqueById(
          (Array.isArray(activitiesData) ? activitiesData : [])
            .flatMap((item) => toDepartmentList(item))
            .filter((item) => item?.id),
        );
        setDepartments(eventDepartments);
      }
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถโหลดข้อมูลกิจกรรมได้";
      message.error(text);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isFormModalOpen) return;
    loadMajorsByDepartments(toArray(watchedDepartmentIds), true);
  }, [watchedDepartmentIds, isFormModalOpen]);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return events.filter((event) => {
      if (scopedDepartmentId) {
        const scopedDepartmentIds = new Set(toDepartmentList(event).map((item) => item.id));
        if (!scopedDepartmentIds.has(scopedDepartmentId)) {
          return false;
        }
      }

      if (query) {
        const departmentNames = toDepartmentList(event)
          .map((item) => String(item?.name || ""))
          .join(" ")
          .toLowerCase();
        const matchedSearch =
          String(event.name || event.title || "").toLowerCase().includes(query) ||
          departmentNames.includes(query);

        if (!matchedSearch) return false;
      }

      if (selectedDepartment) {
        const departmentIds = new Set(toDepartmentList(event).map((item) => item.id));
        if (!departmentIds.has(selectedDepartment)) return false;
      }

      if (selectedCategory) {
        if ((event.typeActivity?.id || event.typeActivityId) !== selectedCategory) {
          return false;
        }
      }

      return true;
    });
  }, [events, searchQuery, selectedDepartment, selectedCategory, scopedDepartmentId]);

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

  const openCreateModal = async () => {
    setEditingEvent(null);
    form.resetFields();

    const defaultDepartmentIds = scopedDepartmentId ? [scopedDepartmentId] : [];
    form.setFieldsValue({
      title: "",
      note: "",
      location: "",
      activityTypeId: undefined,
      requiredEvidenceType: "BOTH",
      hours: 1,
      capacity: 1,
      startAt: undefined,
      endAt: undefined,
      applyOpenAt: undefined,
      applyCloseAt: undefined,
      status: "OPEN_REGISTRATION",
      departmentIds: defaultDepartmentIds,
      majorIds: [],
    });

    await loadMajorsByDepartments(defaultDepartmentIds, false);
    setIsFormModalOpen(true);
  };

  const openEditModal = async (record) => {
    setEditingEvent(record);

    const rawDepartmentIds = toArray(record.departmentIds);
    const departmentIds =
      rawDepartmentIds.length > 0
        ? rawDepartmentIds
        : toDepartmentList(record).map((item) => item.id);

    const majorIds =
      toArray(record.majorIds).length > 0
        ? toArray(record.majorIds)
        : toMajorJoinList(record).map((item) => item.majorId);

    const finalDepartmentIds = scopedDepartmentId ? [scopedDepartmentId] : departmentIds;

    form.setFieldsValue({
      title: record.title || record.name || "",
      note: record.note || record.description || "",
      location: record.location || record.address || "",
      activityTypeId: record.typeActivity?.id || record.typeActivityId,
      requiredEvidenceType: record.requiredEvidenceType || "BOTH",
      hours: record.hours || record.hour || 1,
      capacity: record.capacity || record.maxPeopleCount || 1,
      startAt: toDateTimeInput(record.startAt || record.startDate),
      endAt: toDateTimeInput(record.endAt || record.endDate),
      applyOpenAt: toDateTimeInput(record.applyOpenAt || record.applyOpen),
      applyCloseAt: toDateTimeInput(record.applyCloseAt || record.applyClose || record.date),
      status: record.status || "OPEN_REGISTRATION",
      departmentIds: finalDepartmentIds,
      majorIds,
    });

    await loadMajorsByDepartments(finalDepartmentIds, false);
    setIsFormModalOpen(true);
  };

  const openViewModal = (record) => {
    setViewingEvent(record);
    setIsViewModalOpen(true);
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

  const buildPayload = (values) => {
    const selectedDepartmentIds = uniqueById(
      toArray(values.departmentIds).map((id) => ({ id })),
    ).map((item) => item.id);

    const departmentIds =
      scopedDepartmentId && !isManager ? [scopedDepartmentId] : selectedDepartmentIds;

    const majorIds = uniqueById(
      toArray(values.majorIds).map((id) => ({ id })),
    ).map((item) => item.id);

    return {
      title: values.title,
      note: values.note || "",
      location: values.location,
      activityTypeId: values.activityTypeId,
      requiredEvidenceType: values.requiredEvidenceType || "BOTH",
      hours: Number(values.hours || 1),
      capacity: Number(values.capacity || 1),
      startAt: toIso(values.startAt),
      endAt: toIso(values.endAt),
      applyOpenAt: toIso(values.applyOpenAt || values.startAt),
      applyCloseAt: toIso(values.applyCloseAt || values.startAt),
      status: values.status || "OPEN_REGISTRATION",
      departmentIds,
      majorIds,
    };
  };

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      const payload = buildPayload(values);

      if (editingEvent) {
        await updateActivity(editingEvent.id, payload);
        message.success("แก้ไขกิจกรรมสำเร็จ");
      } else {
        await createActivity(payload);
        message.success("เพิ่มกิจกรรมสำเร็จ");
      }

      setIsFormModalOpen(false);
      setEditingEvent(null);
      form.resetFields();
      await fetchData();
    } catch (error) {
      const text =
        error?.response?.data?.message ||
        (editingEvent ? "ไม่สามารถแก้ไขกิจกรรมได้" : "ไม่สามารถเพิ่มกิจกรรมได้");
      message.error(text);
    } finally {
      setSaving(false);
    }
  };

  const departmentFilterOptions = useMemo(() => {
    if (departments.length > 0) return departments;
    return uniqueById(events.flatMap((event) => toDepartmentList(event)));
  }, [departments, events]);

  const columns = [
    {
      title: "ลำดับ",
      width: 80,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "กิจกรรม",
      dataIndex: "name",
      render: (_, row) => row.name || row.title || "-",
    },
    {
      title: "ภาควิชา",
      width: 260,
      render: (_, row) => {
        const departmentList = toDepartmentList(row);
        return (
          <div className="flex flex-wrap gap-1">
            {departmentList.length > 0 ? (
              departmentList.map((department) => (
                <Tag key={department.id} color="blue">
                  {department.name}
                </Tag>
              ))
            ) : (
              <span className="text-gray-400">-</span>
            )}
          </div>
        );
      },
    },
    {
      title: "สาขาวิชา",
      width: 280,
      render: (_, row) => {
        const majorJoins = toMajorJoinList(row);
        if (majorJoins.length === 0) {
          return <span className="text-gray-500">ทุกสาขาในภาคที่เลือก</span>;
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
      title: "ประเภทกิจกรรม",
      width: 180,
      render: (_, row) => (
        <Tag color="green">{row.typeActivity?.name || "ยังไม่กำหนดประเภท"}</Tag>
      ),
    },
    {
      title: "นักศึกษา",
      width: 130,
      align: "center",
      render: (_, row) => {
        const joined = Number(row.peopleCount || 0);
        const max = Number(row.maxPeopleCount || row.maxStudents || 0);
        return (
          <span className="font-medium" style={{ color: "#0A894C" }}>
            {joined}/{max}
          </span>
        );
      },
    },
    {
      title: "จัดการ",
      width: 160,
      align: "center",
      render: (_, row) => (
        <Space>
          <Button
            type="text"
            icon={<Eye size={18} />}
            onClick={() => openViewModal(row)}
            title="ดูข้อมูล"
          />
          <Button
            type="text"
            icon={<Edit size={18} />}
            onClick={() => openEditModal(row)}
            title="แก้ไข"
          />
          <Popconfirm
            title="ยืนยันการลบ"
            description="ต้องการลบกิจกรรมนี้หรือไม่"
            onConfirm={() => handleDelete(row)}
            okText="ลบ"
            cancelText="ยกเลิก"
          >
            <Button danger type="text" icon={<Trash2 size={18} />} title="ลบ" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <div>
        <Card className="mb-4">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 lg:col-span-4">
              <Input
                placeholder="ค้นหาชื่อกิจกรรมหรือภาควิชา"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                prefix={<Search size={16} />}
              />
            </div>
            <div className="col-span-12 lg:col-span-3">
              <Select
                allowClear
                placeholder="กรองตามภาควิชา"
                value={selectedDepartment}
                onChange={setSelectedDepartment}
                style={{ width: "100%" }}
                options={departmentFilterOptions.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </div>
            <div className="col-span-12 lg:col-span-3">
              <Select
                allowClear
                placeholder="กรองตามประเภทกิจกรรม"
                value={selectedCategory}
                onChange={setSelectedCategory}
                style={{ width: "100%" }}
                options={typeActivities.map((item) => ({
                  value: item.id,
                  label: `${item.code} - ${item.name}`,
                }))}
              />
            </div>
            <div className="col-span-12 lg:col-span-2 flex justify-end">
              <Button
                type="primary"
                icon={<Plus size={16} />}
                onClick={openCreateModal}
                style={{ backgroundColor: "#0A894C", borderColor: "#0A894C" }}
              >
                เพิ่มกิจกรรม
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
            <div className="text-sm text-gray-500">จำนวนกิจกรรม</div>
            <div className="text-3xl font-bold text-[#0A894C]">{summary.totalActivities}</div>
          </Card>
          <Card>
            <div className="text-sm text-gray-500">จำนวนชั่วโมงรวม</div>
            <div className="text-3xl font-bold text-[#0A894C]">{summary.totalHours}</div>
          </Card>
        </div>

        <Card>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={filteredEvents}
            pagination={{ pageSize: 10, showSizeChanger: true }}
            scroll={{ x: 1200 }}
          />
        </Card>

        <Modal
          title={editingEvent ? "แก้ไขกิจกรรม" : "เพิ่มกิจกรรม"}
          open={isFormModalOpen}
          onCancel={() => {
            setIsFormModalOpen(false);
            setEditingEvent(null);
            form.resetFields();
          }}
          onOk={() => form.submit()}
          confirmLoading={saving}
          okText={editingEvent ? "บันทึก" : "สร้าง"}
          cancelText="ยกเลิก"
          width={920}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="ชื่อกิจกรรม"
              name="title"
              rules={[{ required: true, message: "กรุณากรอกชื่อกิจกรรม" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="ประเภทกิจกรรม"
              name="activityTypeId"
              rules={[{ required: true, message: "กรุณาเลือกประเภทกิจกรรม" }]}
            >
              <Select
                placeholder="เลือกประเภทกิจกรรม"
                options={typeActivities.map((item) => ({
                  value: item.id,
                  label: `${item.code} - ${item.name}`,
                }))}
              />
            </Form.Item>

            <Form.Item
              label="ภาควิชา (เลือกได้หลายภาควิชา)"
              name="departmentIds"
              rules={[{ required: true, message: "กรุณาเลือกภาควิชาอย่างน้อย 1 ภาควิชา" }]}
            >
              <Select
                mode="multiple"
                disabled={!isManager}
                placeholder={isManager ? "เลือกภาควิชา" : "ระบบกำหนดภาควิชาตามสิทธิ์"}
                options={departments.map((item) => ({
                  value: item.id,
                  label: `${item.code ? `${item.code} - ` : ""}${item.name}`,
                }))}
              />
            </Form.Item>

            <Form.Item label="สาขาวิชา (ไม่เลือก = ทุกสาขาในภาคที่เลือก)" name="majorIds">
              <Select
                mode="multiple"
                placeholder="เลือกสาขาวิชา"
                options={majorOptions.map((item) => ({
                  value: item.id,
                  label: `${item.code} - ${item.name}`,
                }))}
              />
            </Form.Item>

            <Form.Item
              label="สถานที่"
              name="location"
              rules={[{ required: true, message: "กรุณากรอกสถานที่" }]}
            >
              <Input />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Form.Item
                label="วันเวลาเริ่มกิจกรรม"
                name="startAt"
                rules={[{ required: true, message: "กรุณาเลือกวันเวลาเริ่ม" }]}
              >
                <Input type="datetime-local" />
              </Form.Item>
              <Form.Item
                label="วันเวลาสิ้นสุดกิจกรรม"
                name="endAt"
                rules={[{ required: true, message: "กรุณาเลือกวันเวลาสิ้นสุด" }]}
              >
                <Input type="datetime-local" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Form.Item
                label="วันเวลาเปิดรับสมัคร"
                name="applyOpenAt"
                rules={[{ required: true, message: "กรุณาเลือกวันเวลาเปิดรับสมัคร" }]}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Form.Item
                label="จำนวนชั่วโมงกิจกรรม"
                name="hours"
                rules={[{ required: true, message: "กรุณากรอกจำนวนชั่วโมง" }]}
              >
                <Input type="number" min={1} />
              </Form.Item>
              <Form.Item
                label="จำนวนนักศึกษาสูงสุด"
                name="capacity"
                rules={[{ required: true, message: "กรุณากรอกจำนวนรับสูงสุด" }]}
              >
                <Input type="number" min={1} />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Form.Item
                label="หลักฐานที่ต้องใช้"
                name="requiredEvidenceType"
                rules={[{ required: true, message: "กรุณาเลือกประเภทหลักฐาน" }]}
              >
                <Select options={evidenceTypeOptions} />
              </Form.Item>
              <Form.Item
                label="สถานะกิจกรรม"
                name="status"
                rules={[{ required: true, message: "กรุณาเลือกสถานะกิจกรรม" }]}
              >
                <Select options={activityStatuses} />
              </Form.Item>
            </div>

            <Form.Item label="รายละเอียดเพิ่มเติม" name="note">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="รายละเอียดกิจกรรม"
          open={isViewModalOpen}
          onCancel={() => {
            setIsViewModalOpen(false);
            setViewingEvent(null);
          }}
          footer={null}
          width={780}
        >
          {viewingEvent && (
            <div className="space-y-3">
              <div>
                <div className="text-gray-500 text-sm">ชื่อกิจกรรม</div>
                <div className="font-medium">{viewingEvent.name || viewingEvent.title}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">ประเภทกิจกรรม</div>
                <Tag color="green">{viewingEvent.typeActivity?.name || "ยังไม่กำหนดประเภท"}</Tag>
              </div>
              <div>
                <div className="text-gray-500 text-sm">ภาควิชา</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {toDepartmentList(viewingEvent).map((item) => (
                    <Tag key={item.id} color="blue">
                      {item.name}
                    </Tag>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">สาขาวิชา</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {toMajorJoinList(viewingEvent).length > 0 ? (
                    toMajorJoinList(viewingEvent).map((item) => (
                      <Tag key={item.majorId} color="#0A894C">
                        {item.major?.code ? `${item.major.code} - ` : ""}
                        {item.major?.name || item.majorId}
                      </Tag>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">ทุกสาขาในภาคที่เลือก</span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-gray-500 text-sm">วันเวลาเริ่มกิจกรรม</div>
                  <div>{toDateTimeInput(viewingEvent.startAt || viewingEvent.startDate) || "-"}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">วันเวลาสิ้นสุดกิจกรรม</div>
                  <div>{toDateTimeInput(viewingEvent.endAt || viewingEvent.endDate) || "-"}</div>
                </div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">สถานที่</div>
                <div>{viewingEvent.location || viewingEvent.address || "-"}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">รายละเอียดเพิ่มเติม</div>
                <div>{viewingEvent.note || viewingEvent.description || "-"}</div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Spin>
  );
}
