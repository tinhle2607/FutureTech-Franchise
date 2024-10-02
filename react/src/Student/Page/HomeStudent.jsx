import React, { useEffect, useState, useRef } from "react";
import { Badge, notification } from "antd";
import { BellOutlined } from "@ant-design/icons";
import * as signalR from "@microsoft/signalr";
import 'jquery';
import 'bootstrap';
import 'apexcharts';
import 'simplebar';

const HomeStudent = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const connection = useRef(null);

  // Hàm để lấy số lượng thông báo chưa đọc từ API
  const fetchUnreadNotifications = async () => {
    try {
      const response = await fetch(
        "https://localhost:7116/api/v1/notifications",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.isSuccess) {
        setNotificationCount(data.data); // Cập nhật số lượng thông báo chưa đọc
      } else {
        notification.error({
          message: "Lỗi",
          description: data.message,
        });
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      notification.error({
        message: "Lỗi",
        description: "Không thể truy xuất số thông báo chưa đọc!",
      });
    }
  };

  useEffect(() => {
    fetchUnreadNotifications(); // Gọi API khi component được render

    // Tạo kết nối SignalR
    connection.current = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7116/notificationHub", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => localStorage.getItem("accessToken"), // Truyền JWT token
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Debug) 
    .build();
    const startConnection = async () => {
      try {
        await connection.current.start();
        console.log("SignalR connected successfully.");
       setConnectionStatus("Connected");
        console.log("SignalR connected successfully 222.");
//------------------------------------------------------------
        connection.current.on("ReceivedNotification", async (message) => {
          console.log("Received notification:", message);
          if (message.isSuccess) {
            // Gọi API để cập nhật số lượng thông báo chưa đọc sau khi nhận thông báo
            await fetchUnreadNotifications(); // Cập nhật số lượng thông báo từ API
            notification.success({
              message: "Thông báo mới",
              description: message.data, // Hiển thị nội dung thông báo
            });
          } else {
            notification.error({
              message: "Lỗi nhận thông báo",
              description: message.message,
            });
          }
        });
      } catch (error) {
        console.error("SignalR connection failed: ", error);
        setConnectionStatus("Failed");
      }
    };

    startConnection();

    return () => {
      if (connection.current && connection.current.state === signalR.HubConnectionState.Connected) {
        connection.current.stop()
          .then(() => {
            console.log('SignalR disconnected.');
            setConnectionStatus("Disconnected");
          })
          .catch(err => console.error("Error stopping SignalR connection: ", err));
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <p>Trạng thái kết nối: {connectionStatus}</p>
      <Badge count={notificationCount}>
        <BellOutlined style={{ fontSize: "24px" }} />
      </Badge>
   
    </div>
  );
};

export default HomeStudent;
