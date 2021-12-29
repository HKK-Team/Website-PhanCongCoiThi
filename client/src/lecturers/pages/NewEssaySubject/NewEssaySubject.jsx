import { TextareaAutosize } from "@material-ui/core";
import React, { useEffect } from "react";

export default function NewEssaySubject() {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Đăng ký tiểu luận</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">tenHp</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Mã học phần:</span>
              <span className="productInfoValue">maHp</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Nhóm kiểm tra:</span>
              <span className="productInfoValue"> nhomKT</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Tổ kiểm:</span>
              <span className="productInfoValue"> toKiem</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Số lượng SV:</span>
              <span className="productInfoValue"> soLuong</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Hình thức kiểm tra:</span>
              <span className="productInfoValue"> hinhThucKT</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Ngày Kiểm tra</label>
            <input type="date" />
            <label>Giờ Bắt Đầu</label>
            <input type="Time" />
            <label>Phòng/TeamCode</label>
            <input type="text" />
            <label>Số phút kiểm tra</label>
            <input type="number" />
          </div>
          <div className="productFormLeft">
            <label>Mô tả / nhắn gửi</label>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={7}
              placeholder="Nếu có..."
              style={{ width: '100%', marginBottom:'50px',padding:'10px' }}
            />
            <button className="productButton" style={{ background: "green" }}>
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
