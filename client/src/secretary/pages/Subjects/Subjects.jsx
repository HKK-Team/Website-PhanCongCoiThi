import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import Loading from "../../../utils/loading/Loading";
import "./Subjects.css";

// chỉnh sửa sản phẩm
export default function Subjects() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (items) => {
    toastPromise(
      axios.put("http://localhost:5000/import/editMonThi", {
        ...items,
        param,
      }),
      () => {
        setTimeout(() => {
          navigate("/HomeSecretary/subjects");
        }, 1000);
        return "Cập Nhật Thành Công";
      }
    );
  };
  const param = useParams();
  const { data: subjects, loading } = useSelector(
    (state) => state.Subjects.SubjectsApi
  );
  const [data] = subjects.filter((subject) => subject._id === param.subjectsId);

  useEffect(() => {
    setValue("maHp", data?.maHp);
    setValue("tenHp", data?.tenHp);
    setValue("nhomKT", data?.nhomKT);
    setValue("hinhThucKT", data?.hinhThucKT);
    setValue("GVGD", data?.GVGD);
    setValue("chuongTrinh", data?.chuongTrinh);
    setValue("doViToChuc", data?.doViToChuc);
    setValue("toKiem", data?.toKiem);
    setValue("soLuong", data?.soLuong);
    setValue("maGV", data?.maGV);
    setValue("heDT", data?.heDT);
    setValue("ngayKiemTra", data?.ngayKiemTra);
    setValue("gioBatDau", data?.gioBatDau);
    setValue("soPhutKiemTra", data?.soPhutKiemTra);
    setValue("canBoCoiKiem3", data?.canBoCoiKiem3);
    setValue("maCanBoCoiKiem3", data?.maCanBoCoiKiem3);
    setValue("maPhong", data?.maPhong);
    setValue("canBoDuBi", data?.canBoDuBi);
    setValue("maCanBoDuBi", data?.maCanBoDuBi);
  }, [data, setValue]);
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
        <h1 className="productTitle">Chỉnh sửa môn thi</h1>
        <Link to="/HomeSecretary/newSubjects">
          <button className="productAddButton">Thêm môn thi</button>
        </Link>
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
              <span className="productInfoValue"> {data?.nhomKT}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Tổ kiểm:</span>
              <span className="productInfoValue"> {data?.toKiem}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Số lượng SV:</span>
              <span className="productInfoValue"> {data?.soLuong}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Hình thức kiểm tra:</span>
              <span className="productInfoValue"> {data?.hinhThucKT}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="productFormLeft">
            <label>Mã học phần</label>
            <input
              type="text"
              {...register("maHp", { required: false, maxLength: 80 })}
            />

            <label>Tên học phần</label>
            <input
              type="text"
              {...register("tenHp", { required: false, maxLength: 80 })}
            />
            <label>Nhóm kiểm tra</label>
            <input
              type="text"
              {...register("nhomKT", { required: false, maxLength: 80 })}
            />
            <label>Tổ kiểm </label>
            <input
              type="text"
              {...register("toKiem", { required: false, maxLength: 80 })}
            />
            <label>Số lượng SV</label>
            <input
              type="number"
              {...register("soLuong", { required: false, maxLength: 80 })}
            />
            <label>Đơn vị tổ chức kiểm tra</label>
            <input
              type="text"
              {...register("doViToChuc", { required: false, maxLength: 80 })}
            />

            <label>Chương trình/Bộ môn</label>
            <input
              type="text"
              {...register("chuongTrinh", { required: false, maxLength: 80 })}
            />

            <label>Ngày kiểm tra</label>
            <input
              type="date"
              {...register("ngayKiemTra", {
                required: false,
                maxLength: 80,
              })}
            />
            <label>Giờ bắt đầu</label>
            <input
              type="text"
              {...register("gioBatDau", { required: false, maxLength: 80 })}
            />
          </div>
          <div className="productFormLeft">
            <label>Mã Phòng/teamCode</label>
            <input
              type="text"
              {...register("maPhong", { required: false, maxLength: 80 })}
            />
            <label>Hình thức kiểm tra</label>
            <input
              type="text"
              {...register("hinhThucKT", { required: false, maxLength: 80 })}
            />
            <label>Số phút kiểm tra</label>
            <input
              type="number"
              {...register("soPhutKiemTra", { required: false, maxLength: 80 })}
            />
            <label>GVGD</label>
            <input
              type="text"
              {...register("GVGD", { required: false, maxLength: 80 })}
            />
            <label>MGV</label>
            <input
              type="text"
              {...register("maGV", { required: false, maxLength: 80 })}
            />
            <label>Hệ đào tạo</label>
            <input
              type="text"
              {...register("heDT", { required: false, maxLength: 80 })}
            />
            <label>Cán bộ giám sát</label>
            <input
              type="text"
              {...register("canBoCoiKiem3", { required: false, maxLength: 80 })}
            />
            <label>Mã Cán bộ giám sát</label>
            <input
              type="text"
              {...register("maCanBoCoiKiem3", {
                required: false,
                maxLength: 80,
              })}
            />
            <label>Cán bộ dự bị</label>
            <input
              type="text"
              {...register("canBoDuBi", {
                required: false,
                maxLength: 80,
              })}
            />
            <label>Mã cán bộ dự bị</label>
            <input
              type="text"
              {...register("maCanBoDuBi", {
                required: false,
                maxLength: 80,
              })}
            />

            <button className="productButton" style={{ background: "green" }}>
              Chỉnh sửa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
