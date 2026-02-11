"use client";

import { Input, Select, Row, Col, Button } from "antd";
import { Search, RotateCcw } from "lucide-react";

const { Option } = Select;

const defaultDepartments = [
    "คอมพิวเตอร์ศึกษา",
    "ครุศาสตร์โยธา",
    "ครุศาสตร์ไฟฟ้า",
    "ครุศาสตร์เครื่องกล",
    "ครุศาสตร์เทคโนโลยีและสารสนเทศ",
    "บริหารเทคนิคศึกษา",
];

const defaultMajors = ["TCT", "CED"];
const defaultYears = ["1", "2", "3", "4"];

const SearchFilterBar = ({
  onSearch,
  onFilterChange,
  onReset,
  hideDepartmentFilter = false,
  departmentOptions = defaultDepartments,
  majorOptions = defaultMajors,
  yearOptions = defaultYears,
}) => {

  return (
    <div
      className="p-4 rounded-lg mb-4"
      style={{
        background: "#ffffff",
        border: "1px solid #e8f5e9",
        boxShadow: "0 2px 8px rgba(10, 137, 76, 0.08)",
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Search Input */}
        <Col xs={24} md={8}>
          <Input
            placeholder="Search by student ID, name, or activity name"
            prefix={<Search size={16} style={{ color: "#0A894C" }} />}
            onChange={(e) => onSearch(e.target.value)}
            size="large"
            style={{
              borderColor: "#0A894C",
            }}
          />
        </Col>

        {/* Department Filter */}
        {!hideDepartmentFilter && (
          <Col xs={24} md={5}>
            <Select
              placeholder="เลือกภาควิชา"
              onChange={(value) => onFilterChange("department", value)}
              allowClear
              size="large"
              style={{ width: "100%" }}
            >
              {departmentOptions.map((dept) => (
                <Option key={dept.id || dept} value={dept.id || dept}>
                  {dept.name || dept}
                </Option>
              ))}
            </Select>
          </Col>
        )}

        {/* Major Filter */}
        <Col xs={24} md={hideDepartmentFilter ? 6 : 4}>
          <Select
            placeholder="เลือกสาขาวิชา"
            onChange={(value) => onFilterChange("major", value)}
            allowClear
            size="large"
            style={{ width: "100%" }}
          >
            {majorOptions.map((major) => (
              <Option key={major.id || major} value={major.id || major}>
                {major.name || major}
              </Option>
            ))}
          </Select>
        </Col>

        {/* Year Filter */}
        <Col xs={24} md={hideDepartmentFilter ? 6 : 4}>
          <Select
            placeholder="เลือกชั้นปี"
            onChange={(value) => onFilterChange("year", value)}
            allowClear
            size="large"
            style={{ width: "100%" }}
          >
            {yearOptions.map((year) => (
              <Option key={year} value={year}>
                ปี {year}
              </Option>
            ))}
          </Select>
        </Col>

        {/* Reset Button */}
        <Col xs={24} md={hideDepartmentFilter ? 4 : 3}>
          <Button
            icon={<RotateCcw size={16} />}
            onClick={onReset}
            size="large"
            style={{
              width: "100%",
              backgroundColor: "#0A894C",
              borderColor: "#0A894C",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#086b3d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#0A894C";
            }}
          >
            รีเซ็ต
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SearchFilterBar;
