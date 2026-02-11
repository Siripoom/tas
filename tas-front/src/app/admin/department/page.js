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
  Select,
  Space,
  Spin,
  Table,
  message,
} from "antd";
import { BookOpen, Edit, Plus, Search, Trash2 } from "lucide-react";
import {
  createDepartment,
  createMajor,
  deleteDepartment,
  deleteMajor,
  getAllDepartments,
  getAllFaculties,
  getMajorsByDepartment,
  updateDepartment,
  updateMajor,
} from "@/services/department";

export default function DepartmentPage() {
  const router = useRouter();
  const [departmentForm] = Form.useForm();
  const [majorForm] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [search, setSearch] = useState("");

  const [editingItem, setEditingItem] = useState(null);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);

  const [sessionUser, setSessionUser] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [majors, setMajors] = useState([]);
  const [majorLoading, setMajorLoading] = useState(false);
  const [majorSaving, setMajorSaving] = useState(false);
  const [majorEditingItem, setMajorEditingItem] = useState(null);
  const [isMajorModalOpen, setIsMajorModalOpen] = useState(false);
  const [isMajorFormModalOpen, setIsMajorFormModalOpen] = useState(false);

  const isFacultyAdmin = sessionUser?.role === "FACULTY_ADMIN";

  const loadData = async () => {
    setLoading(true);
    try {
      const [departmentData, facultyData] = await Promise.all([
        getAllDepartments(),
        getAllFaculties(),
      ]);
      setDepartments(Array.isArray(departmentData) ? departmentData : []);
      setFaculties(Array.isArray(facultyData) ? facultyData : []);
    } catch (error) {
      message.error("ไม่สามารถโหลดข้อมูลภาควิชาได้");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMajors = async (departmentId) => {
    setMajorLoading(true);
    try {
      const majorData = await getMajorsByDepartment(departmentId);
      setMajors(Array.isArray(majorData) ? majorData : []);
    } catch (error) {
      message.error("ไม่สามารถโหลดข้อมูลสาขาวิชาได้");
      console.error(error);
    } finally {
      setMajorLoading(false);
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    setSessionUser(user);

    if (!["FACULTY_ADMIN", "SUPER_ADMIN"].includes(user?.role)) {
      setAccessDenied(true);
      message.error("คุณไม่มีสิทธิ์เข้าถึงเมนูภาควิชา");
      router.push("/admin/home");
      return;
    }

    loadData();
  }, [router]);

  const filteredDepartments = useMemo(() => {
    if (!search) return departments;
    const q = search.toLowerCase();
    return departments.filter(
      (item) =>
        String(item.code || "").toLowerCase().includes(q) ||
        String(item.name || "").toLowerCase().includes(q) ||
        String(item.faculty?.name || "").toLowerCase().includes(q),
    );
  }, [departments, search]);

  const openCreateDepartmentModal = () => {
    setEditingItem(null);
    departmentForm.resetFields();
    departmentForm.setFieldsValue({
      facultyId: isFacultyAdmin ? sessionUser?.facultyId : undefined,
    });
    setIsDepartmentModalOpen(true);
  };

  const openEditDepartmentModal = (item) => {
    setEditingItem(item);
    departmentForm.setFieldsValue({
      code: item.code,
      name: item.name,
      facultyId: item.facultyId,
    });
    setIsDepartmentModalOpen(true);
  };

  const handleDeleteDepartment = async (item) => {
    try {
      await deleteDepartment(item.id);
      message.success("ลบภาควิชาสำเร็จ");
      await loadData();
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถลบภาควิชาได้";
      message.error(text);
    }
  };

  const handleSubmitDepartment = async (values) => {
    setSaving(true);
    try {
      const payload = {
        code: values.code,
        name: values.name,
        facultyId: values.facultyId,
      };

      if (editingItem) {
        await updateDepartment(editingItem.id, payload);
        message.success("แก้ไขภาควิชาสำเร็จ");
      } else {
        await createDepartment(payload);
        message.success("เพิ่มภาควิชาสำเร็จ");
      }

      setIsDepartmentModalOpen(false);
      departmentForm.resetFields();
      setEditingItem(null);
      await loadData();
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถบันทึกภาควิชาได้";
      message.error(text);
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const openMajorManagement = async (department) => {
    setSelectedDepartment(department);
    setMajorEditingItem(null);
    majorForm.resetFields();
    setIsMajorModalOpen(true);
    await loadMajors(department.id);
  };

  const openCreateMajorModal = () => {
    setMajorEditingItem(null);
    majorForm.resetFields();
    setIsMajorFormModalOpen(true);
  };

  const openEditMajorModal = (major) => {
    setMajorEditingItem(major);
    majorForm.setFieldsValue({
      code: major.code,
      name: major.name,
    });
    setIsMajorFormModalOpen(true);
  };

  const handleSubmitMajor = async (values) => {
    if (!selectedDepartment) return;
    setMajorSaving(true);
    try {
      const payload = {
        code: values.code,
        name: values.name,
      };

      if (majorEditingItem) {
        await updateMajor(selectedDepartment.id, majorEditingItem.id, payload);
        message.success("แก้ไขสาขาวิชาสำเร็จ");
      } else {
        await createMajor(selectedDepartment.id, payload);
        message.success("เพิ่มสาขาวิชาสำเร็จ");
      }

      setIsMajorFormModalOpen(false);
      majorForm.resetFields();
      setMajorEditingItem(null);
      await loadMajors(selectedDepartment.id);
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถบันทึกสาขาวิชาได้";
      message.error(text);
      console.error(error);
    } finally {
      setMajorSaving(false);
    }
  };

  const handleDeleteMajor = async (major) => {
    if (!selectedDepartment) return;
    try {
      await deleteMajor(selectedDepartment.id, major.id);
      message.success("ลบสาขาวิชาสำเร็จ");
      await loadMajors(selectedDepartment.id);
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถลบสาขาวิชาได้";
      message.error(text);
    }
  };

  const departmentColumns = [
    {
      title: "ลำดับ",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: "ตัวย่อภาควิชา",
      dataIndex: "code",
      width: 180,
    },
    {
      title: "ชื่อภาควิชา",
      dataIndex: "name",
    },
    {
      title: "คณะ",
      width: 260,
      render: (_, row) => row.faculty?.name || "-",
    },
    {
      title: "จัดการ",
      width: 220,
      render: (_, row) => (
        <Space>
          <Button
            type="text"
            icon={<BookOpen size={18} />}
            onClick={() => openMajorManagement(row)}
            title="จัดการสาขาวิชา"
          />
          <Button
            type="text"
            icon={<Edit size={18} />}
            onClick={() => openEditDepartmentModal(row)}
            title="แก้ไข"
          />
          <Popconfirm
            title="ยืนยันการลบภาควิชา"
            description="ต้องการลบภาควิชานี้หรือไม่"
            onConfirm={() => handleDeleteDepartment(row)}
            okText="ลบ"
            cancelText="ยกเลิก"
          >
            <Button danger type="text" icon={<Trash2 size={18} />} title="ลบ" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const majorColumns = [
    {
      title: "ลำดับ",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: "ตัวย่อสาขา",
      dataIndex: "code",
      width: 180,
    },
    {
      title: "ชื่อสาขาวิชา",
      dataIndex: "name",
    },
    {
      title: "จัดการ",
      width: 140,
      render: (_, row) => (
        <Space>
          <Button
            type="text"
            icon={<Edit size={18} />}
            onClick={() => openEditMajorModal(row)}
            title="แก้ไข"
          />
          <Popconfirm
            title="ยืนยันการลบสาขาวิชา"
            description="ต้องการลบสาขาวิชานี้หรือไม่"
            onConfirm={() => handleDeleteMajor(row)}
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
                placeholder="ค้นหาจากชื่อภาควิชา/ตัวย่อ/คณะ"
              />
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-end">
              <Button
                type="primary"
                icon={<Plus size={16} />}
                onClick={openCreateDepartmentModal}
                style={{ backgroundColor: "#0A894C", borderColor: "#0A894C" }}
              >
                เพิ่มภาควิชา
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <Table
            rowKey="id"
            columns={departmentColumns}
            dataSource={filteredDepartments}
            pagination={{ pageSize: 10, showSizeChanger: true }}
            scroll={{ x: 960 }}
          />
        </Card>

        <Modal
          title={editingItem ? "แก้ไขภาควิชา" : "เพิ่มภาควิชา"}
          open={isDepartmentModalOpen}
          onCancel={() => {
            setIsDepartmentModalOpen(false);
            setEditingItem(null);
            departmentForm.resetFields();
          }}
          onOk={() => departmentForm.submit()}
          confirmLoading={saving}
          okText={editingItem ? "บันทึก" : "สร้าง"}
          cancelText="ยกเลิก"
        >
          <Form form={departmentForm} layout="vertical" onFinish={handleSubmitDepartment}>
            <Form.Item
              label="ตัวย่อภาควิชา"
              name="code"
              rules={[{ required: true, message: "กรุณากรอกตัวย่อภาควิชา" }]}
            >
              <Input placeholder="เช่น EDTECH" />
            </Form.Item>
            <Form.Item
              label="ชื่อภาควิชา"
              name="name"
              rules={[{ required: true, message: "กรุณากรอกชื่อภาควิชา" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="คณะ"
              name="facultyId"
              rules={[{ required: true, message: "กรุณาเลือกคณะ" }]}
            >
              <Select
                disabled={isFacultyAdmin}
                options={faculties.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={`จัดการสาขาวิชา: ${selectedDepartment?.name || "-"}`}
          open={isMajorModalOpen}
          onCancel={() => {
            setIsMajorModalOpen(false);
            setSelectedDepartment(null);
            setMajors([]);
          }}
          footer={null}
          width={840}
        >
          <div className="mb-4 flex justify-end">
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={openCreateMajorModal}
              style={{ backgroundColor: "#0A894C", borderColor: "#0A894C" }}
            >
              เพิ่มสาขาวิชา
            </Button>
          </div>
          <Spin spinning={majorLoading}>
            <Table
              rowKey="id"
              columns={majorColumns}
              dataSource={majors}
              pagination={{ pageSize: 8, showSizeChanger: false }}
            />
          </Spin>
        </Modal>

        <Modal
          title={majorEditingItem ? "แก้ไขสาขาวิชา" : "เพิ่มสาขาวิชา"}
          open={isMajorFormModalOpen}
          onCancel={() => {
            setIsMajorFormModalOpen(false);
            setMajorEditingItem(null);
            majorForm.resetFields();
          }}
          onOk={() => majorForm.submit()}
          confirmLoading={majorSaving}
          okText={majorEditingItem ? "บันทึก" : "สร้าง"}
          cancelText="ยกเลิก"
        >
          <Form form={majorForm} layout="vertical" onFinish={handleSubmitMajor}>
            <Form.Item
              label="ตัวย่อสาขาวิชา"
              name="code"
              rules={[{ required: true, message: "กรุณากรอกตัวย่อสาขาวิชา" }]}
            >
              <Input placeholder="เช่น TCT" />
            </Form.Item>
            <Form.Item
              label="ชื่อสาขาวิชา"
              name="name"
              rules={[{ required: true, message: "กรุณากรอกชื่อสาขาวิชา" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Spin>
  );
}
