"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Col, Form, Input, Row, message } from "antd";
import { KeyRound, User } from "lucide-react";
import { changePassword } from "@/services/auth";

const toText = (value) => (value === null || value === undefined || value === "" ? "-" : String(value));

export default function StudentProfilePage() {
  const [passwordForm] = Form.useForm();
  const [savingPassword, setSavingPassword] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      const user = raw ? JSON.parse(raw) : null;
      setUserInfo(user);
    } catch (_error) {
      setUserInfo(null);
    }
  }, []);

  const studentData = useMemo(
    () => ({
      fullName: userInfo?.fullname || [userInfo?.firstName, userInfo?.lastName].filter(Boolean).join(" "),
      studentCode: userInfo?.studentId,
      email: userInfo?.email,
      phone: userInfo?.phone,
      faculty: userInfo?.facultyName || userInfo?.faculty?.name,
      department: userInfo?.departmentName || userInfo?.department?.name,
      major: userInfo?.major?.name,
      classYear: userInfo?.level,
      academicYear: userInfo?.academicYear,
    }),
    [userInfo],
  );

  const handleChangePassword = async (values) => {
    setSavingPassword(true);
    try {
      await changePassword(values.currentPassword, values.newPassword);
      message.success("เปลี่ยนรหัสผ่านสำเร็จ");
      passwordForm.resetFields();
    } catch (error) {
      const text = error?.response?.data?.message || "ไม่สามารถเปลี่ยนรหัสผ่านได้";
      message.error(text);
    } finally {
      setSavingPassword(false);
    }
  };

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
          <h2 className="text-2xl font-bold mb-1">โปรไฟล์นักศึกษา</h2>
          <p className="text-sm opacity-90">ข้อมูลโปรไฟล์เป็นแบบอ่านอย่างเดียว</p>
        </div>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>ข้อมูลส่วนตัว</span>
              </div>
            }
          >
            {!userInfo && (
              <Alert
                className="mb-4"
                type="warning"
                message="ไม่พบข้อมูลผู้ใช้ในเครื่อง กรุณาเข้าสู่ระบบใหม่"
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input addonBefore="ชื่อ-นามสกุล" value={toText(studentData.fullName)} readOnly />
              <Input addonBefore="รหัสนิสิต" value={toText(studentData.studentCode)} readOnly />
              <Input addonBefore="อีเมล" value={toText(studentData.email)} readOnly />
              <Input addonBefore="เบอร์โทร" value={toText(studentData.phone)} readOnly />
              <Input addonBefore="คณะ" value={toText(studentData.faculty)} readOnly />
              <Input addonBefore="ภาควิชา" value={toText(studentData.department)} readOnly />
              <Input addonBefore="สาขา" value={toText(studentData.major)} readOnly />
              <Input addonBefore="ชั้นปี" value={toText(studentData.classYear)} readOnly />
              <Input addonBefore="ปีการศึกษา" value={toText(studentData.academicYear)} readOnly />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <KeyRound size={18} />
                <span>เปลี่ยนรหัสผ่าน</span>
              </div>
            }
          >
            <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
              <Form.Item
                label="รหัสผ่านปัจจุบัน"
                name="currentPassword"
                rules={[{ required: true, message: "กรุณากรอกรหัสผ่านปัจจุบัน" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="รหัสผ่านใหม่"
                name="newPassword"
                rules={[
                  { required: true, message: "กรุณากรอกรหัสผ่านใหม่" },
                  { min: 8, message: "รหัสผ่านใหม่ต้องยาวอย่างน้อย 8 ตัวอักษร" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="ยืนยันรหัสผ่านใหม่"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "กรุณายืนยันรหัสผ่านใหม่" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("รหัสผ่านใหม่ไม่ตรงกัน"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={savingPassword}
                style={{ backgroundColor: "#0A894C", borderColor: "#0A894C" }}
              >
                บันทึกรหัสผ่านใหม่
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
