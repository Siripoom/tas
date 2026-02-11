"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Table,
  message,
} from "antd";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import {
  createTypeActivity,
  deleteTypeActivity,
  getAllTypeActivities,
  updateTypeActivity,
} from "@/services/typeActivity";

const managementRoles = ["FACULTY_ADMIN", "SUPER_ADMIN"];

export default function ActivityTypePage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAllTypeActivities();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถโหลดข้อมูลประเภทกิจกรรมได้";
      message.error(text);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const raw = localStorage.getItem("user");
    const user = raw ? JSON.parse(raw) : null;

    if (!managementRoles.includes(user?.role)) {
      setAccessDenied(true);
      message.error("คุณไม่มีสิทธิ์เข้าถึงเมนูประเภทกิจกรรม");
      router.push("/admin/home");
      return;
    }

    loadData();
  }, [router]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;
    return items.filter(
      (item) =>
        String(item.code || "").toLowerCase().includes(query) ||
        String(item.name || "").toLowerCase().includes(query),
    );
  }, [items, search]);

  const openCreateModal = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue({
      code: item.code,
      name: item.name,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      const payload = {
        code: values.code,
        name: values.name,
      };

      if (editingItem) {
        await updateTypeActivity(editingItem.id, payload);
        message.success("แก้ไขประเภทกิจกรรมสำเร็จ");
      } else {
        await createTypeActivity(payload);
        message.success("เพิ่มประเภทกิจกรรมสำเร็จ");
      }

      setIsModalOpen(false);
      setEditingItem(null);
      form.resetFields();
      await loadData();
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถบันทึกประเภทกิจกรรมได้";
      message.error(text);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      await deleteTypeActivity(item.id);
      message.success("ลบประเภทกิจกรรมสำเร็จ");
      await loadData();
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถลบประเภทกิจกรรมได้";
      message.error(text);
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
      title: "รหัสประเภท",
      dataIndex: "code",
      width: 220,
    },
    {
      title: "ชื่อประเภทกิจกรรม",
      dataIndex: "name",
    },
    {
      title: "จัดการ",
      width: 160,
      render: (_, row) => (
        <Space>
          <Button
            type="text"
            icon={<Edit size={18} />}
            onClick={() => openEditModal(row)}
            title="แก้ไข"
          />
          <Popconfirm
            title="ยืนยันการลบ"
            description="ต้องการลบประเภทกิจกรรมนี้หรือไม่"
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

  if (accessDenied) return null;

  return (
    <Spin spinning={loading}>
      <div>
        <Card className="mb-4">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-8">
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                prefix={<Search size={16} />}
                placeholder="ค้นหาจากรหัสหรือชื่อประเภทกิจกรรม"
              />
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-end">
              <Button
                type="primary"
                icon={<Plus size={16} />}
                onClick={openCreateModal}
                style={{ backgroundColor: "#0A894C", borderColor: "#0A894C" }}
              >
                เพิ่มประเภทกิจกรรม
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={filteredItems}
            pagination={{ pageSize: 10, showSizeChanger: true }}
          />
        </Card>

        <Modal
          title={editingItem ? "แก้ไขประเภทกิจกรรม" : "เพิ่มประเภทกิจกรรม"}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingItem(null);
            form.resetFields();
          }}
          onOk={() => form.submit()}
          confirmLoading={saving}
          okText={editingItem ? "บันทึก" : "สร้าง"}
          cancelText="ยกเลิก"
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="รหัสประเภท"
              name="code"
              rules={[{ required: true, message: "กรุณากรอกรหัสประเภทกิจกรรม" }]}
            >
              <Input placeholder="เช่น ACADEMIC" />
            </Form.Item>
            <Form.Item
              label="ชื่อประเภทกิจกรรม"
              name="name"
              rules={[{ required: true, message: "กรุณากรอกชื่อประเภทกิจกรรม" }]}
            >
              <Input placeholder="เช่น วิชาการ" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Spin>
  );
}
