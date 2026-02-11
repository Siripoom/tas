"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, Dropdown, Breadcrumb } from "antd";
import { LogOut, User, Home } from "lucide-react";
import { getSessionUser } from "@/utils/sessionUser";

const ROLE_LABEL = {
  TEACHER: "อาจารย์",
  DEPT_STAFF: "เจ้าหน้าที่ภาควิชา",
};

const TeacherHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(getSessionUser());
  }, []);

  const getPageTitle = () => {
    const pageMap = {
      "/teacher/home": "หน้าหลัก",
      "/teacher/participation": "เข้าร่วมกิจกรรม",
      "/teacher/event": "กิจกรรม",
      "/teacher/report": "รายงาน",
      "/teacher/profile": "โปรไฟล์",
      "/teacher/settings": "ตั้งค่า",
    };
    return pageMap[pathname] || "Dashboard";
  };

  const getBreadcrumbItems = () => {
    const pathArray = pathname.split("/").filter((item) => item);
    const items = [
      {
        title: (
          <span className="flex items-center gap-1">
            <Home size={14} />
            Teacher
          </span>
        ),
      },
    ];

    if (pathArray.length > 1) {
      const pageMap = {
        home: "หน้าหลัก",
        participation: "เข้าร่วมกิจกรรม",
        event: "กิจกรรม",
        report: "รายงาน",
        profile: "โปรไฟล์",
        settings: "ตั้งค่า",
      };

      items.push({
        title: pageMap[pathArray[1]] || pathArray[1],
      });
    }

    return items;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  const menuItems = [
    {
      key: "profile",
      icon: <User size={16} />,
      label: "โปรไฟล์",
      onClick: () => router.push("/teacher/profile"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogOut size={16} />,
      label: "ออกจากระบบ",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 w-full">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Page Title and Breadcrumb */}
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                {getPageTitle()}
              </h1>
              <Breadcrumb
                items={getBreadcrumbItems()}
                separator="/"
                className="text-xs"
              />
            </div>
          </div>

          {/* User Profile */}
          {userInfo && (
            <Dropdown
              menu={{ items: menuItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">
                    {userInfo.fullname || userInfo.name || "ครู"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {ROLE_LABEL[userInfo.role] || "ครู"}
                    {userInfo.departmentName ? ` • ${userInfo.departmentName}` : ""}
                  </p>
                </div>
                <Avatar
                  size={40}
                  style={{
                    backgroundColor: "#0A894C",
                    color: "#fff",
                  }}
                >
                  {(userInfo.fullname || userInfo.name || "T").charAt(0)}
                </Avatar>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
};

export default TeacherHeader;
