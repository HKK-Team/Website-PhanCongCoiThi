import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getTieuLuanApiAsync } from "../../../api/tieuLuanSlide";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import Loading from "../../../utils/loading/Loading";

export default function SuggestEssaySubjectLecrurers() {
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

  const handleSubmit = () => {
    const ngayKiemTra = data.deXuat?.ngayKiemTra;
    const gioBatDau = data.deXuat?.gioBatDau;
    const soPhutKiemTra = data.deXuat?.soPhutKiemTra;
    const maPhong = data.deXuat?.maPhong;
    const moTa = `Chấp Nhận Đề Xuất :  ${data.deXuat?.moTa}`;
    const status = "Đang kiểm tra";
    toastPromise(
      axios.put("http://localhost:5000/lecturersTieuLuan/editTieuLuan", {
        param,
        status,
        data,
        ngayKiemTra,
        gioBatDau,
        soPhutKiemTra,
        maPhong,
        moTa,
      }),
      () => {
        setTimeout(() => {
          navigate("/HomeLecturers/manageEssaySubject");
        }, 1000);
        return "Đã xác nhận đề xuất";
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
            <div className="productInfoItem">
              <span className="productInfoKey">GVGD:</span>
              <span className="productInfoValue">{data?.GVGD}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Mã Giảng Viên:</span>
              <span className="productInfoValue">{data?.maGV}</span>
            </div>
          </div>
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">Đề xuất thay đổi</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Ngày Kiểm Tra:</span>
              <span className="productInfoValue">
                <strong>{data?.deXuat?.ngayKiemTra.slice(0, 10)}</strong>
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Giờ bắt đầu:</span>
              <span className="productInfoValue">
                <strong>{data?.deXuat?.gioBatDau}</strong>
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Số phút kiểm tra:</span>
              <span className="productInfoValue">
                <strong>{data?.deXuat?.soPhutKiemTra}</strong>
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Mã Phòng:</span>
              <span className="productInfoValue">
                <strong>{data?.deXuat?.maPhong}</strong>
              </span>
            </div>
            <span className="productInfoKey">Ghi chú:</span>
            <div className="productInfoItem">
              <span className="productInfoValue">
                <strong>{data?.deXuat?.moTa}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }} className="productTopRight">
        {" "}
        <Button
          variant="contained"
          size="large"
          style={{ marginRight: 20 }}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/HomeLecturers/editEssaySubject/${param.id}`);
          }}
        >
          Đăng ký lại
        </Button>{" "}
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Chấp nhận đề xuất
        </Button>
      </div>
    </div>
  );
}
