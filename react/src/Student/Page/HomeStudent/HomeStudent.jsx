import React from "react";
import { Button, Card, Col, Row, Statistic, Table } from "antd";
import { Pie } from "@ant-design/charts";
import {
  UserOutlined,
  NotificationOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const HomeStudent = () => {
  const notifications = [
    {
      id: 1,
      type: "info",
      message:
        "Video dotnet01 collection type list.mp4 buổi học 7 đã được upload hệ thống rồi nhé, các bạn nhớ xem và làm lại để nắm kiến thức nhé.",
    },
    {
      id: 2,
      type: "warning",
      message:
        "Bạn có khó khăn gì không nhỉ? Đã 7 ngày rồi bạn chưa vào hệ thống học tập, bạn nhớ trao đổi mentor nhé!",
    },
    {
      id: 3,
      type: "info",
      message: "Đừng quên tham gia buổi học trực tuyến vào thứ 6 tuần này.",
    },
    {
      id: 4,
      type: "warning",
      message: "Thông báo: Hạn nộp bài tập cuối kỳ là ngày 20-12-2024.",
    },
    {
      id: 5,
      type: "info",
      message: "Video hướng dẫn sử dụng hệ thống mới đã được cập nhật.",
    },
    {
      id: 6,
      type: "info",
      message: "Nhớ kiểm tra lịch học của bạn để không bỏ lỡ buổi học nào.",
    },
    {
      id: 7,
      type: "warning",
      message:
        "Có một buổi hội thảo về phát triển cá nhân vào ngày 15-11-2024.",
    },
    {
      id: 8,
      type: "info",
      message:
        "Hãy nhớ tham gia khảo sát ý kiến học viên để cải thiện chương trình học.",
    },
  ];

  // Data for pie chart and ranking table
  const dataPie = [
    { type: "HTML-CSS", value: 29 },
    { type: "BOOTSTRAP", value: 15 },
    { type: "JS", value: 42 },
    { type: "GIT", value: 13 },
  ];

  const rankingData = [
    { key: 1, name: "Vũ Thanh Thuận" },
    { key: 2, name: "Hồ Thị Phương Nga" },
    { key: 3, name: "Trương Thiên Bảo" },
    { key: 4, name: "Ngô Vỹ Khang" },
    { key: 5, name: "Nguyễn Thị Huỳnh Nhi" },
  ];

  const columns = [
    { title: "Thứ Hạng", dataIndex: "key", key: "key", width: 80 },
    { title: "Tên Học Viên", dataIndex: "name", key: "name" },
  ];

  const pieConfig = {
    appendPadding: 10,
    data: dataPie,
    angleField: "value",
    colorField: "type",
    radius: 0.8, // Adjust radius to reduce chart size
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
  };

  return (
    <div>
      <Row gutter={16} style={{ display: "flex" }}>
        {/* Profile Card */}
        <Col xs={24} sm={24} md={8} style={{ display: "flex", flexDirection: "column" }}>
          <Card bordered={false} style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <UserOutlined style={{ fontSize: "64px", color: "#ccc" }} />
              <h3>Nguyễn Trung Hiếu</h3>
              <p>Lớp: Bootcamp .Net 01</p>
              <p>Ngày bắt đầu: 05-09-2024</p>
              <p>Ngày kết thúc: 13-03-2025</p>
              <Statistic title="Điểm tích cực" value={0} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
                <Button type="primary" style={{ margin: "5px" }}>
                  Xem report
                </Button>
                <Button style={{ margin: "5px" }}>Token</Button>
                <Button style={{ margin: "5px" }}>Đánh giá</Button>
                <Button style={{ margin: "5px" }}>Xem chứng nhận</Button>
              </div>
            </div>
          </Card>
        </Col>

        {/* Notifications */}
        <Col xs={24} sm={24} md={16} style={{ display: "flex", flexDirection: "column" }}>
          <Card bordered={false} style={{ flex: 1 }}>
            <h5 className="pb-3 card-title">
              <NotificationOutlined /> Thông báo
            </h5>
            <div style={{ maxHeight: "320px", overflowY: "auto" }}>
              {notifications.map((notification) => (
                <p key={notification.id}>
                  {notification.type === "info" ? (
                    <CheckCircleOutlined style={{ color: "blue" }} />
                  ) : (
                    <ExclamationCircleOutlined style={{ color: "red" }} />
                  )}
                  {` ${notification.message}`}
                </p>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Pie Chart and Ranking */}
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col xs={24} sm={24} md={8}>
          <Card
            title="Thống kê lộ trình"
            bordered={false}
            style={{ minHeight: "280px" }}
          >
            <Pie {...pieConfig} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={16}>
          <Card
            title="Thứ Hạng"
            bordered={false}
            style={{ minHeight: "280px" }}
          >
            <Table
              dataSource={rankingData}
              columns={columns}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomeStudent;
