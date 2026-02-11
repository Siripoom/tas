"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Input,
  Table,
  Button,
  Modal,
  Tag,
  Avatar,
  Space,
  Spin,
  message,
} from "antd";
import {
  Search,
  FileText,
  Download,
  Printer,
  User,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import { getAllActivities } from "@/services/activity";
import { getAttendancesByActivity } from "@/services/attendance";
import { getFilesByActivity, downloadFile } from "@/services/file";

const { Search: SearchInput } = Input;

export default function ReportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [studentModalVisible, setStudentModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [evidenceFiles, setEvidenceFiles] = useState({});

  // Fetch activities from API
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await getAllActivities();
      console.log("Activities response:", response);

      // Transform API data to match table structure
      const transformedData = response.map((activity) => ({
        id: activity.id,
        activityName: activity.name,
        department: activity.department?.name || "N/A",
        major: activity.typeActivity?.name || "N/A",
        startDate: new Date(activity.startDate).toLocaleDateString("th-TH"),
        endDate: new Date(activity.endDate).toLocaleDateString("th-TH"),
        location: activity.location || "N/A",
        activityHours: activity.hour || 0,
        studentCount: activity.attendances?.length || 0,
        rawActivity: activity, // Keep original data for reference
      }));

      setActivities(transformedData);
    } catch (error) {
      console.error("Error fetching activities:", error);
      message.error("Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  // Fetch students for selected activity
  const fetchStudentsForActivity = async (activityId) => {
    setStudentsLoading(true);
    try {
      const attendancesResponse = await getAttendancesByActivity(activityId);
      console.log("Attendances response:", attendancesResponse);

      // Fetch evidence files for this activity
      const filesResponse = await getFilesByActivity(activityId);
      console.log("Files response:", filesResponse);

      // Create a map of userId to their files
      const filesMap = {};
      const filesData = Array.isArray(filesResponse)
        ? filesResponse
        : filesResponse?.data || [];
      filesData.forEach((file) => {
        const userId = file.user?.id;
        if (userId) {
          if (!filesMap[userId]) {
            filesMap[userId] = [];
          }
          filesMap[userId].push(file);
        }
      });
      setEvidenceFiles(filesMap);

      // Transform attendance data to match student table structure
      const attendancesData = Array.isArray(attendancesResponse)
        ? attendancesResponse
        : attendancesResponse?.data || [];
      const transformedStudents = attendancesData.map((attendance) => ({
          id: attendance.id,
          studentId: attendance.user?.studentId || "N/A",
          name: `${attendance.user?.firstName || ""} ${
            attendance.user?.lastName || ""
          }`.trim(),
          department: attendance.user?.department?.name || "N/A",
          major: attendance.user?.major?.name || "N/A",
          year: attendance.user?.year || "N/A",
          participationDate: attendance.createdAt
            ? new Date(attendance.createdAt).toLocaleDateString("th-TH")
            : "N/A",
          status: attendance.status,
          userId: attendance.user?.id,
          attendanceId: attendance.id,
        })
      );

      setStudentsData(transformedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
      message.error("Failed to load student data");
    } finally {
      setStudentsLoading(false);
    }
  };

  // Filter activities based on search query
  const getFilteredActivities = () => {
    if (!searchQuery) return activities;

    const query = searchQuery.toLowerCase();
    return activities.filter(
      (activity) =>
        activity.activityName.toLowerCase().includes(query) ||
        activity.department.toLowerCase().includes(query) ||
        activity.major.toLowerCase().includes(query)
    );
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleViewStudents = (activity) => {
    setSelectedActivity(activity);
    setStudentModalVisible(true);
    fetchStudentsForActivity(activity.id);
  };

  const handleDownload = async (student) => {
    try {
      const files = evidenceFiles[student.userId] || [];

      if (files.length === 0) {
        message.warning("No evidence files found for this student");
        return;
      }

      // Download all files for this student
      for (const file of files) {
        const blob = await downloadFile(file.id);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download =
          file.fileName || `evidence_${student.studentId}_${file.id}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }

      message.success(`Downloaded ${files.length} file(s) for ${student.name}`);
    } catch (error) {
      console.error("Error downloading files:", error);
      message.error("Failed to download files");
    }
  };

  const handlePrint = (student) => {
    // Generate printable content
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Student Activity Report - ${student.name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #0A894C; }
          .info { margin: 10px 0; }
          .label { font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #0A894C; color: white; }
        </style>
      </head>
      <body>
        <h1>Student Activity Participation Report</h1>
        <div class="info"><span class="label">Student ID:</span> ${
          student.studentId
        }</div>
        <div class="info"><span class="label">Name:</span> ${student.name}</div>
        <div class="info"><span class="label">Department:</span> ${
          student.department
        }</div>
        <div class="info"><span class="label">Major:</span> ${
          student.major
        }</div>
        <div class="info"><span class="label">Year:</span> ${student.year}</div>
        <div class="info"><span class="label">Activity:</span> ${
          selectedActivity?.activityName
        }</div>
        <div class="info"><span class="label">Participation Date:</span> ${
          student.participationDate
        }</div>
        <div class="info"><span class="label">Status:</span> ${
          student.status
        }</div>
        <div class="info"><span class="label">Evidence Files:</span> ${
          evidenceFiles[student.userId]?.length || 0
        } file(s)</div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const activityColumns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: 70,
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Activity Name",
      dataIndex: "activityName",
      key: "activityName",
      render: (name) => (
        <div className="font-medium" style={{ color: "#0A894C" }}>
          <FileText size={16} className="inline mr-2" />
          {name}
        </div>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: 200,
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
      width: 100,
      align: "center",
      render: (major) => (
        <Tag color="#0A894C" style={{ borderRadius: 8 }}>
          {major}
        </Tag>
      ),
    },
    {
      title: "Date",
      key: "date",
      width: 180,
      align: "center",
      render: (_, record) => (
        <div className="text-sm">
          <Calendar size={14} className="inline mr-1" />
          {record.startDate} - {record.endDate}
        </div>
      ),
    },
    {
      title: "Students",
      dataIndex: "studentCount",
      key: "studentCount",
      width: 100,
      align: "center",
      render: (count) => (
        <Tag color="#1890ff" style={{ borderRadius: 8, fontWeight: 500 }}>
          {count} students
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "action",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleViewStudents(record)}
          style={{
            backgroundColor: "#0A894C",
            borderColor: "#0A894C",
          }}
        >
          View Students
        </Button>
      ),
    },
  ];

  const studentColumns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: 60,
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            size={32}
            style={{ backgroundColor: "#0A894C" }}
            icon={<User size={18} />}
          />
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-xs text-gray-500">{record.studentId}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: 180,
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
      width: 100,
      align: "center",
      render: (major) => (
        <Tag color="#0A894C" style={{ borderRadius: 8 }}>
          {major}
        </Tag>
      ),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 80,
      align: "center",
      render: (year) => `Year ${year}`,
    },
    {
      title: "Participation Date",
      dataIndex: "participationDate",
      key: "participationDate",
      width: 140,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (status) => {
        let color = "#0A894C";
        let text = "Completed";

        if (status === "APPLIED") {
          color = "#1890ff";
          text = "Applied";
        } else if (status === "APPROVED") {
          color = "#52c41a";
          text = "Approved";
        } else if (status === "REJECTED") {
          color = "#ff4d4f";
          text = "Rejected";
        } else if (status === "REVISION_REQUIRED") {
          color = "#fa8c16";
          text = "Revision Required";
        } else if (status === "COMPLETED" || status === "CLOSED") {
          color = "#0A894C";
          text = "Completed";
        } else if (status === "CANCELLED" || status === "NO_SHOW") {
          color = "#ff4d4f";
          text = "Cancelled";
        }

        return (
          <Tag color={color} style={{ borderRadius: 8, fontWeight: 500 }}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "action",
      width: 180,
      align: "center",
      render: (_, record) => {
        const hasFiles = evidenceFiles[record.userId]?.length > 0;

        return (
          <Space size="small">
            <Button
              size="small"
              icon={<Download size={14} />}
              onClick={() => handleDownload(record)}
              disabled={!hasFiles}
              style={{
                backgroundColor: hasFiles ? "#1890ff" : "#d9d9d9",
                borderColor: hasFiles ? "#1890ff" : "#d9d9d9",
                color: "#ffffff",
              }}
              title={
                hasFiles
                  ? `${evidenceFiles[record.userId].length} file(s)`
                  : "No files"
              }
            >
              Download
            </Button>
            <Button
              size="small"
              icon={<Printer size={14} />}
              onClick={() => handlePrint(record)}
              style={{
                backgroundColor: "#52c41a",
                borderColor: "#52c41a",
                color: "#ffffff",
              }}
            >
              Print
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#0A894C" }}>
          <FileText size={24} className="inline mr-2" />
          รายงานกิจกรรม
        </h1>
        <p className="text-gray-600">
          ดูรายงานกิจกรรมและการมีส่วนร่วมของนักศึกษาในแต่ละกิจกรรม
        </p>
      </div>

      <Card
        style={{
          borderRadius: 8,
          border: "1px solid #e8f5e9",
          boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)",
          marginBottom: 24,
        }}
      >
        <SearchInput
          placeholder="Search by activity name, department, or major"
          allowClear
          enterButton={
            <Button
              type="primary"
              icon={<Search size={16} />}
              style={{
                backgroundColor: "#0A894C",
                borderColor: "#0A894C",
              }}
            >
              Search
            </Button>
          }
          size="large"
          onSearch={handleSearch}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Card>

      <Card
        style={{
          borderRadius: 8,
          border: "1px solid #e8f5e9",
          boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)",
        }}
      >
        <Spin spinning={loading}>
          <Table
            columns={activityColumns}
            dataSource={getFilteredActivities()}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} activities`,
            }}
            scroll={{ x: 1000 }}
          />
        </Spin>
      </Card>

      {/* Student List Modal */}
      <Modal
        title={
          <div>
            <h3 className="text-lg font-semibold" style={{ color: "#0A894C" }}>
              <User size={20} className="inline mr-2" />
              Student Participation List
            </h3>
            {selectedActivity && (
              <div className="mt-2 text-sm text-gray-600">
                <div className="font-medium text-base mb-1">
                  {selectedActivity.activityName}
                </div>
                <div className="flex flex-wrap gap-4">
                  <span>
                    <MapPin size={14} className="inline mr-1" />
                    {selectedActivity.location}
                  </span>
                  <span>
                    <Calendar size={14} className="inline mr-1" />
                    {selectedActivity.startDate} - {selectedActivity.endDate}
                  </span>
                  <span>
                    <Clock size={14} className="inline mr-1" />
                    {selectedActivity.activityHours} hours
                  </span>
                </div>
              </div>
            )}
          </div>
        }
        open={studentModalVisible}
        onCancel={() => setStudentModalVisible(false)}
        width={1200}
        footer={null}
        styles={{
          header: {
            borderBottom: "2px solid #0A894C",
            paddingBottom: 16,
          },
        }}
      >
        <div className="mt-4">
          <Spin spinning={studentsLoading}>
            <Table
              columns={studentColumns}
              dataSource={studentsData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1000 }}
            />
          </Spin>
        </div>
      </Modal>
    </div>
  );
}
