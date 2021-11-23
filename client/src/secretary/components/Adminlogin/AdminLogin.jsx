import React from "react";

import "./AdminLogin.css";

export default function AdminLogin() {
  return (
    <div className="AdminLogin_box">
      <form action="/DashBoard">
        <h1>Admin Login</h1>
        <input type="Email" placeholder="Nhập Email của bạn" />
        <input type="password" placeholder="Nhập mật khẩu của bạn" />
        <button type="submit">Đăng nhập</button>
      </form>
      <h2>
        Trang quản trị <br />
        copyright © 2021 HKK team
      </h2>
    </div>
  );
}
