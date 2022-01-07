import { TextareaAutosize } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import Loading from "../../../utils/loading/Loading";

export default function NewEssaySubject() {
  const param = useParams();
  const navigate = useNavigate();

  const { data: subjects, loading } = useSelector(
    (state) => state.Subjects.SubjectsApi
  );
  const [data] = subjects.filter((subject) => subject._id === param.id);

  const { register, handleSubmit } = useForm();
  const onSubmit = (items) => {
    items.status = "Đang kiểm tra";
    toastPromise(
      axios.post("http://localhost:5000/lecturersTieuLuan/createTieuLuan", {
        ...items,
        data,
      }),
      () => {
        setTimeout(() => {
          navigate("/HomeLecturers/essaySubject");
        }, 1000);
        return "Đăng ký Thành Công";
      }
    );
  };

  if (loading)
    return (
      <div className="loading">
        {" "}
        <Loading />
      </div>
    );
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Đăng ký tiểu luận</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{data?.tenHp}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Mã học phần:</span>
              <span className="productInfoValue">{data?.maHp}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Nhóm kiểm tra:</span>
              <span className="productInfoValue">{data?.nhomKT}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Tổ kiểm:</span>
              <span className="productInfoValue">{data?.toKiem}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Số lượng SV:</span>
              <span className="productInfoValue">{data?.soLuong}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Hình thức kiểm tra:</span>
              <span className="productInfoValue">{data?.hinhThucKT}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="productFormLeft">
            <label>Ngày Kiểm tra</label>
            <input
              type="date"
              {...register("ngayKiemTra", {
                required: "Vui lòng nhập ngày kiểm tra",
              })}
            />
            <label>Giờ Bắt Đầu</label>
            <input
              type="Time"
              {...register("gioBatDau", {
                required: "Vui lòng nhập giờ kiểm tra",
              })}
            />
            <label>Phòng/TeamCode</label>
            <input
              type="text"
              {...register("maPhong", {
                required: "Vui lòng nhập mã phòng/teamcode",
              })}
            />
            <label>Số phút kiểm tra</label>
            <input
              type="number"
              {...register("soPhutKiemTra", {
                required: "Vui lòng nhập ngày số phút",
              })}
            />
          </div>
          <div className="productFormLeft">
            <label>Mô tả / nhắn gửi</label>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={7}
              placeholder="Nếu có..."
              style={{ width: "100%", marginBottom: "50px", padding: "10px" }}
              {...register("moTa")}
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
