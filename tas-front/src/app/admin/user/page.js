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
  Tabs,
  Tag,
  message,
} from "antd";
import { Edit, Eye, Plus, Search, Trash2, Users } from "lucide-react";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "@/services/user";
import {
  getAllDepartments,
  getAllFaculties,
  getMajorsByDepartment,
} from "@/services/department";

const ROLE_LABEL = {
  STUDENT: "นักศึกษา",
  TEACHER: "อาจารย์",
  DEPT_STAFF: "เจ้าหน้าที่ภาควิชา",
  FACULTY_ADMIN: "เจ้าหน้าที่คณะ",
  SUPER_ADMIN: "SUPER_ADMIN",
};

const TAB_ROLE_MAP = {
  student: ["STUDENT"],
  deptStaff: ["TEACHER", "DEPT_STAFF"],
  adminStaff: ["FACULTY_ADMIN", "SUPER_ADMIN"],
};

export default function UserPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [majors, setMajors] = useState([]);
  const [activeTab, setActiveTab] = useState("student");
  const [search, setSearch] = useState("");
  const [filterDepartmentId, setFilterDepartmentId] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);

  const watchedRole = Form.useWatch("role", form);
  const watchedFacultyId = Form.useWatch("facultyId", form);
  const watchedDepartmentId = Form.useWatch("departmentId", form);

  const currentRole = watchedRole || editingUser?.role || "STUDENT";
  const isFacultyAdmin = sessionUser?.role === "FACULTY_ADMIN";

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      message.error("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadLookups = async () => {
    try {
      const [facultyData, departmentData] = await Promise.all([
        getAllFaculties(),
        getAllDepartments(),
      ]);
      setFaculties(Array.isArray(facultyData) ? facultyData : []);
      setDepartments(Array.isArray(departmentData) ? departmentData : []);
    } catch (error) {
      message.error("ไม่สามารถโหลดข้อมูลคณะ/ภาควิชาได้");
      console.error(error);
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    setSessionUser(user);

    if (user?.role === "DEPT_STAFF") {
      setAccessDenied(true);
      message.error("คุณไม่มีสิทธิ์เข้าถึงเมนูจัดการผู้ใช้");
      router.push("/admin/home");
      return;
    }

    loadLookups();
    loadUsers();
  }, [router]);

  useEffect(() => {
    if (currentRole !== "STUDENT" || !watchedDepartmentId) {
      setMajors([]);
      if (currentRole !== "STUDENT") {
        form.setFieldValue("majorId", undefined);
      }
      return;
    }

    const loadMajors = async () => {
      try {
        const data = await getMajorsByDepartment(watchedDepartmentId);
        setMajors(Array.isArray(data) ? data : []);
      } catch (error) {
        message.error("ไม่สามารถโหลดข้อมูลสาขาวิชาได้");
        console.error(error);
      }
    };

    loadMajors();
  }, [currentRole, watchedDepartmentId, form]);

  useEffect(() => {
    if (!watchedFacultyId) return;
    if (watchedDepartmentId) return;
    setMajors([]);
    form.setFieldValue("majorId", undefined);
  }, [watchedFacultyId, watchedDepartmentId, form]);

  const usersInTab = useMemo(
    () => users.filter((user) => TAB_ROLE_MAP[activeTab].includes(user.role)),
    [users, activeTab],
  );

  const filteredUsers = useMemo(() => {
    let data = [...usersInTab];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((user) => {
        const code =
          user.studentProfile?.studentCode ||
          user.teacherProfile?.employeeCode ||
          user.username ||
          "";
        return (
          `${user.firstName || ""} ${user.lastName || ""}`
            .toLowerCase()
            .includes(q) ||
          String(user.email || "")
            .toLowerCase()
            .includes(q) ||
          String(code).toLowerCase().includes(q)
        );
      });
    }

    if (filterDepartmentId) {
      data = data.filter((user) => user.departmentId === filterDepartmentId);
    }

    return data;
  }, [usersInTab, search, filterDepartmentId]);

  const departmentOptions = useMemo(() => {
    if (!watchedFacultyId) return departments;
    return departments.filter((item) => item.facultyId === watchedFacultyId);
  }, [departments, watchedFacultyId]);

  const roleOptionsByTab = useMemo(() => {
    if (activeTab === "deptStaff") {
      return [
        { value: "TEACHER", label: "อาจารย์" },
        { value: "DEPT_STAFF", label: "เจ้าหน้าที่ภาควิชา" },
      ];
    }

    if (activeTab === "adminStaff") {
      return [{ value: "FACULTY_ADMIN", label: "เจ้าหน้าที่คณะ" }];
    }

    return [{ value: "STUDENT", label: "นักศึกษา" }];
  }, [activeTab]);

  const defaultRoleByTab = useMemo(() => {
    if (activeTab === "deptStaff") return "TEACHER";
    if (activeTab === "adminStaff") return "FACULTY_ADMIN";
    return "STUDENT";
  }, [activeTab]);

  const openCreateModal = () => {
    const nextRole = defaultRoleByTab;
    setEditingUser(null);
    setMajors([]);
    form.resetFields();
    form.setFieldsValue({
      role: nextRole,
      status: "ACTIVE",
      facultyId: isFacultyAdmin ? sessionUser?.facultyId : undefined,
      classYear: 1,
      academicYear: 2568,
    });
    setIsModalOpen(true);
  };

  const openEditModal = async (user) => {
    if (user.role === "SUPER_ADMIN") return;

    setEditingUser(user);
    const role = user.role;

    const values = {
      role,
      status: user.status,
      username: user.username || undefined,
      email: user.email || undefined,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || undefined,
      facultyId:
        user.studentProfile?.facultyId ||
        user.teacherProfile?.facultyId ||
        user.staffProfile?.facultyId ||
        undefined,
      departmentId:
        user.studentProfile?.departmentId ||
        user.teacherProfile?.departmentId ||
        user.staffProfile?.departmentId ||
        undefined,
      studentCode: user.studentProfile?.studentCode || undefined,
      majorId: user.studentProfile?.majorId || undefined,
      classYear: user.studentProfile?.classYear || undefined,
      academicYear: user.studentProfile?.academicYear || undefined,
      employeeCode: user.teacherProfile?.employeeCode || undefined,
    };

    if (role === "STUDENT" && values.departmentId) {
      try {
        const majorData = await getMajorsByDepartment(values.departmentId);
        setMajors(Array.isArray(majorData) ? majorData : []);
      } catch (_error) {
        setMajors([]);
      }
    } else {
      setMajors([]);
    }

    form.setFieldsValue(values);
    setIsModalOpen(true);
  };

  const openViewModal = (user) => {
    setViewingUser(user);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (user) => {
    try {
      await deleteUser(user.id);
      message.success("ลบผู้ใช้สำเร็จ");
      await loadUsers();
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถลบผู้ใช้ได้";
      message.error(text);
    }
  };

  const buildPayloadFromForm = (values) => {
    const role = values.role;
    const payload = {
      role,
      username: values.username || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone || undefined,
      status: values.status,
    };

    if (role === "STUDENT") {
      payload.studentProfile = {
        studentCode: values.studentCode,
        facultyId: values.facultyId,
        departmentId: values.departmentId,
        majorId: values.majorId,
        classYear: Number(values.classYear),
        academicYear: Number(values.academicYear),
        registrarVerified: true,
      };
    }

    if (role === "TEACHER") {
      payload.teacherProfile = {
        employeeCode: values.employeeCode || undefined,
        facultyId: values.facultyId,
        departmentId: values.departmentId,
      };
    }

    if (role === "DEPT_STAFF" || role === "FACULTY_ADMIN") {
      payload.staffProfile = {
        staffType: role === "FACULTY_ADMIN" ? "FACULTY_ADMIN" : "DEPT_STAFF",
        facultyId: values.facultyId,
        departmentId: role === "FACULTY_ADMIN" ? null : values.departmentId,
      };
    }

    return payload;
  };

  const submitForm = async (values) => {
    setSaving(true);
    try {
      const payload = buildPayloadFromForm(values);

      if (editingUser) {
        await updateUser(editingUser.id, payload);
        message.success("แก้ไขผู้ใช้สำเร็จ");
      } else {
        await createUser(payload);
        message.success("เพิ่มผู้ใช้สำเร็จ");
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingUser(null);
      await loadUsers();
    } catch (error) {
      const text =
        error?.response?.data?.message || "ไม่สามารถบันทึกข้อมูลผู้ใช้ได้";
      message.error(text);
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      title: "ลำดับ",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: "รหัส",
      width: 170,
      render: (_, row) =>
        row.studentProfile?.studentCode ||
        row.teacherProfile?.employeeCode ||
        row.username ||
        "-",
    },
    {
      title: "ชื่อ-นามสกุล",
      render: (_, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`.trim() || "-",
    },
    {
      title: "บทบาท",
      width: 180,
      render: (_, row) => (
        <Tag color="blue">{ROLE_LABEL[row.role] || row.role}</Tag>
      ),
    },
    {
      title: "คณะ",
      width: 190,
      render: (_, row) =>
        row.studentProfile?.faculty?.name ||
        row.teacherProfile?.faculty?.name ||
        row.staffProfile?.faculty?.name ||
        "-",
    },
    {
      title: "ภาควิชา",
      width: 220,
      render: (_, row) =>
        row.studentProfile?.department?.name ||
        row.teacherProfile?.department?.name ||
        row.staffProfile?.department?.name ||
        "-",
    },
    {
      title: "สถานะ",
      width: 120,
      render: (_, row) => {
        const color =
          row.status === "ACTIVE"
            ? "green"
            : row.status === "LOCKED"
              ? "red"
              : "orange";
        return <Tag color={color}>{row.status}</Tag>;
      },
    },
    {
      title: "จัดการ",
      width: 160,
      render: (_, row) => {
        const readOnly = row.role === "SUPER_ADMIN";
        return (
          <Space>
            <Button
              type="text"
              icon={<Eye size={18} />}
              onClick={() => openViewModal(row)}
              title="ดูรายละเอียด"
            />
            {!readOnly && (
              <Button
                type="text"
                icon={<Edit size={18} />}
                onClick={() => openEditModal(row)}
                title="แก้ไข"
              />
            )}
            {!readOnly && (
              <Popconfirm
                title="ยืนยันการลบผู้ใช้"
                description="ต้องการลบผู้ใช้นี้หรือไม่"
                onConfirm={() => handleDelete(row)}
                okText="ลบ"
                cancelText="ยกเลิก"
              >
                <Button
                  danger
                  type="text"
                  icon={<Trash2 size={18} />}
                  title="ลบ"
                />
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  const tabItems = [
    {
      key: "student",
      label: (
        <span className="flex items-center gap-2">
          <Users size={16} />
          นักศึกษา ({users.filter((item) => item.role === "STUDENT").length})
        </span>
      ),
    },
    {
      key: "deptStaff",
      label: (
        <span className="flex items-center gap-2">
          <Users size={16} />
          อาจารย์/เจ้าหน้าที่ภาควิชา (
          {
            users.filter((item) =>
              ["TEACHER", "DEPT_STAFF"].includes(item.role),
            ).length
          }
          )
        </span>
      ),
    },
    {
      key: "adminStaff",
      label: (
        <span className="flex items-center gap-2">
          <Users size={16} />
          แอดมิน/เจ้าหน้าที่คณะ (
          {
            users.filter((item) =>
              ["FACULTY_ADMIN", "SUPER_ADMIN"].includes(item.role),
            ).length
          }
          )
        </span>
      ),
    },
  ];

  if (accessDenied) return null;

  return (
    <Spin spinning={loading}>
      <div>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            setSearch("");
            setFilterDepartmentId(undefined);
          }}
          items={tabItems}
          className="mb-4"
        />

        <Card className="mb-4">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-5">
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                prefix={<Search size={16} />}
                placeholder="ค้นหาจากชื่อ/อีเมล/รหัส"
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Select
                value={filterDepartmentId}
                onChange={setFilterDepartmentId}
                allowClear
                placeholder="กรองตามภาควิชา"
                options={departments.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-span-12 md:col-span-3 flex justify-end">
              <Button
                type="primary"
                icon={<Plus size={16} />}
                onClick={openCreateModal}
                style={{ backgroundColor: "#0A894C", borderColor: "#0A894C" }}
              >
                เพิ่มผู้ใช้
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={filteredUsers}
            pagination={{ pageSize: 10, showSizeChanger: true }}
            scroll={{ x: 1100 }}
          />
        </Card>

        <Modal
          title={editingUser ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้"}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingUser(null);
            setMajors([]);
            form.resetFields();
          }}
          onOk={() => form.submit()}
          okText={editingUser ? "บันทึก" : "สร้าง"}
          cancelText="ยกเลิก"
          confirmLoading={saving}
          width={760}
        >
          <Form form={form} layout="vertical" onFinish={submitForm}>
            <div className="grid grid-cols-12 gap-3">
              {!(!editingUser && activeTab === "deptStaff") && (
                <Form.Item name="role" className="col-span-12" hidden>
                  <Input />
                </Form.Item>
              )}

              {!editingUser && activeTab === "deptStaff" && (
                <Form.Item
                  label="ประเภทบัญชี"
                  name="role"
                  className="col-span-12"
                  rules={[{ required: true, message: "กรุณาเลือกประเภทบัญชี" }]}
                >
                  <Select options={roleOptionsByTab} />
                </Form.Item>
              )}

              {editingUser && (
                <Form.Item label="บทบาท" className="col-span-12">
                  <Input value={ROLE_LABEL[editingUser.role]} disabled />
                </Form.Item>
              )}

              <Form.Item
                label="ชื่อ"
                name="firstName"
                className="col-span-12 md:col-span-6"
                rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="นามสกุล"
                name="lastName"
                className="col-span-12 md:col-span-6"
                rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                className="col-span-12 md:col-span-6"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                className="col-span-12 md:col-span-6"
                rules={[{ type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="เบอร์โทร"
                name="phone"
                className="col-span-12 md:col-span-6"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  editingUser
                    ? "รหัสผ่านใหม่ (ไม่บังคับ)"
                    : "รหัสผ่าน (ไม่กรอก = ChangeMe123!)"
                }
                name="password"
                className="col-span-12 md:col-span-6"
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="สถานะ"
                name="status"
                className="col-span-12 md:col-span-4"
                rules={[{ required: true, message: "กรุณาเลือกสถานะ" }]}
              >
                <Select
                  options={[
                    { label: "ACTIVE", value: "ACTIVE" },
                    { label: "INACTIVE", value: "INACTIVE" },
                    { label: "LOCKED", value: "LOCKED" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="คณะ"
                name="facultyId"
                className="col-span-12 md:col-span-4"
                rules={[{ required: true, message: "กรุณาเลือกคณะ" }]}
              >
                <Select
                  disabled={isFacultyAdmin}
                  options={faculties.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  onChange={() => {
                    form.setFieldValue("departmentId", undefined);
                    form.setFieldValue("majorId", undefined);
                  }}
                />
              </Form.Item>

              {(currentRole === "STUDENT" ||
                currentRole === "TEACHER" ||
                currentRole === "DEPT_STAFF") && (
                <Form.Item
                  label="ภาควิชา"
                  name="departmentId"
                  className="col-span-12 md:col-span-4"
                  rules={[{ required: true, message: "กรุณาเลือกภาควิชา" }]}
                >
                  <Select
                    options={departmentOptions.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    onChange={() => {
                      form.setFieldValue("majorId", undefined);
                    }}
                  />
                </Form.Item>
              )}

              {currentRole === "STUDENT" && (
                <>
                  <Form.Item
                    label="รหัสนักศึกษา"
                    name="studentCode"
                    className="col-span-12 md:col-span-4"
                    rules={[
                      { required: true, message: "กรุณากรอกรหัสนักศึกษา" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="สาขาวิชา"
                    name="majorId"
                    className="col-span-12 md:col-span-4"
                    rules={[{ required: true, message: "กรุณาเลือกสาขาวิชา" }]}
                  >
                    <Select
                      options={majors.map((item) => ({
                        label: item.code,
                        value: item.id,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item
                    label="ชั้นปี"
                    name="classYear"
                    className="col-span-12 md:col-span-2"
                    rules={[{ required: true, message: "กรุณากรอกชั้นปี" }]}
                  >
                    <Input type="number" min={1} />
                  </Form.Item>
                  <Form.Item
                    label="ปีการศึกษา"
                    name="academicYear"
                    className="col-span-12 md:col-span-2"
                    rules={[{ required: true, message: "กรุณากรอกปีการศึกษา" }]}
                  >
                    <Input type="number" min={1} />
                  </Form.Item>
                </>
              )}

              {currentRole === "TEACHER" && (
                <Form.Item
                  label="รหัสพนักงาน"
                  name="employeeCode"
                  className="col-span-12 md:col-span-4"
                >
                  <Input />
                </Form.Item>
              )}
            </div>
          </Form>
        </Modal>

        <Modal
          title="รายละเอียดผู้ใช้"
          open={isViewModalOpen}
          onCancel={() => setIsViewModalOpen(false)}
          footer={null}
          width={640}
        >
          {viewingUser && (
            <div className="space-y-2">
              <p>
                <b>ชื่อ:</b>{" "}
                {`${viewingUser.firstName || ""} ${viewingUser.lastName || ""}`.trim()}
              </p>
              <p>
                <b>บทบาท:</b> {ROLE_LABEL[viewingUser.role] || viewingUser.role}
              </p>
              <p>
                <b>Email:</b> {viewingUser.email || "-"}
              </p>
              <p>
                <b>Username:</b> {viewingUser.username || "-"}
              </p>
              <p>
                <b>คณะ:</b>{" "}
                {viewingUser.studentProfile?.faculty?.name ||
                  viewingUser.teacherProfile?.faculty?.name ||
                  viewingUser.staffProfile?.faculty?.name ||
                  "-"}
              </p>
              <p>
                <b>ภาควิชา:</b>{" "}
                {viewingUser.studentProfile?.department?.name ||
                  viewingUser.teacherProfile?.department?.name ||
                  viewingUser.staffProfile?.department?.name ||
                  "-"}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </Spin>
  );
}
