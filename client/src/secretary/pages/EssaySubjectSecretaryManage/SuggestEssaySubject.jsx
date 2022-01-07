import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getTieuLuanApiAsync } from "../../../api/tieuLuanSlide";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import Loading from "../../../utils/loading/Loading";

export default function SuggestEssaySubject() {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: tieuLuans, loading } = useSelector(
    (state) => state.TieuLuan.tieuLuanApi
  );
  const [data] = tieuLuans.filter((item) => item._id === param.id);

  useEffect(() => {
    dispatch(getTieuLuanApiAsync());
  }, [dispatch]);

  const { register, handleSubmit } = useForm();
  const onSubmit = (items) => {
    items.status = "Bị từ chối";
    items.phanHoi = true;
    const id = param.id;
    toastPromise(
      axios.put("http://localhost:5000/lecturersTieuLuan/suggestTieuLuan", {
        ...items,
        id,
      }),
      () => {
        setTimeout(() => {
          navigate("/HomeSecretary/essaySubjectSecretaryManage");
        }, 1000);
        return "Đã đề xuất";
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
        <h1 className="productTitle">Gợi ý đăng ký</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{data?.tenHocPhan}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Mã học phần:</span>
              <span className="productInfoValue">{data?.maHocPhan}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Nhóm kiểm tra:</span>
              <span className="productInfoValue">{data?.nhomKiemTra}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Tổ kiểm:</span>
              <span className="productInfoValue">{data?.toKiem}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Số lượng SV:</span>
              <span className="productInfoValue">{data?.soLuongSinhVien}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Hình thức kiểm tra:</span>
              <span className="productInfoValue">{data?.hinhThucKiemTra}</span>
            </div>
          </div>
        </div>
        <div className="productTopRight">
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">GVGD:</span>
              <span className="productInfoValue">{data?.GVGD}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Mã Giảng Viên:</span>
              <span className="productInfoValue">{data?.maGV}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Ngày Kiểm Tra:</span>
              <span className="productInfoValue">
                {data?.ngayKiemTra.slice(0, 10)}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Giờ bắt đầu:</span>
              <span className="productInfoValue">{data?.gioBatDau}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Số phút kiểm tra:</span>
              <span className="productInfoValue">{data?.soPhutKiemTra}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Mã Phòng:</span>
              <span className="productInfoValue">{data?.maPhong}</span>
            </div>
            <span className="productInfoKey">Ghi chú:</span>
            <div className="productInfoItem">
              <span className="productInfoValue">{data?.moTa}</span>
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
              Đề Xuất
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
