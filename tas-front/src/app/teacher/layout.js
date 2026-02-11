"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "antd";
import Sidebar from "@/components/asset/Sidebar";
import TeacherHeader from "@/components/asset/TeacherHeader";
import { getSessionUser } from "@/utils/sessionUser";
import "../globals.css";

const { Content } = Layout;

export default function TeacherLayout({ children }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = getSessionUser();

      if (!userData || !token) {
        router.push("/login");
        setIsLoading(false);
        return;
      }

      if (!["TEACHER", "DEPT_STAFF"].includes(userData.role)) {
        alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
        router.push("/login");
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A894C]"></div>
          <p className="mt-4 text-gray-600">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        userRole="teacher"
        collapsed={collapsed}
        onCollapse={setCollapsed}
      />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "margin-left 0.2s",
        }}
      >
        <TeacherHeader />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 112px)",
            background: "#f5f5f5",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
