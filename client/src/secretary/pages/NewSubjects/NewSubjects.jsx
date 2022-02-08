import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getSecretaryAccLogin } from "../../../redux/selectors";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import logo from "./../../../images/tdmu-elearning-banner.png";
import "./NewSubjects.css";

// thêm sản phẩm mới
export default function NewSubjects() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const secretaryAccount = useSelector(getSecretaryAccLogin);
  const maKhoa = secretaryAccount?.maKhoa;
  const chuongTrinhDaoTao = secretaryAccount?.chuongTrinhDaoTao;

  const onSubmit = (data) => {
    data.maKhoa = maKhoa;
    data.maChuongTrinh = chuongTrinhDaoTao;
    toastPromise(
      axios.post("http://localhost:5000/import/createMonThi", {
        ...data,
      }),
      () => {
        setTimeout(() => {
          navigate("/HomeSecretary/subjects");
        }, 1000);
        return "Thêm Thành Công";
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm Môn Thi</h1>
      <form className="addProductForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="addProductForm-warrper">
          <div className="addProductItem">
            <label>Mã học phần</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Mã học phần"
              {...register("maHp", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Tên học phần</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Tên học phần"
              {...register("tenHp", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Nhóm kiểm tra</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Nhóm kiểm tra"
              {...register("nhomKT", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Tổ kiểm </label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Tổ kiểm"
              {...register("toKiem", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Số lượng SV</label>
            <input
              style={{ outline: "none" }}
              type="number"
              placeholder="Số lượng SV"
              {...register("soLuong", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Đơn vị tổ chức kiểm tra</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Đơn vị tổ chức kiểm tra"
              {...register("doViToChuc", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Chương trình/Bộ môn</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Chương trình/Bộ môn"
              {...register("chuongTrinh", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Ngày Kiểm tra</label>
            <input
              style={{ outline: "none" }}
              type="date"
              placeholder="Ngày Kiểm tra"
              {...register("ngayKiemTra", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Giờ Bắt Đầu</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Giờ Bắt Đầu"
              {...register("gioBatDau", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Mã Phòng/TeamCode</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Mã Phòng/TeamCode"
              {...register("maPhong", { required: true, maxLength: 80 })}
            />
          </div>
        </div>

        <div className="addProductForm-warrper">
          <div className="addProductItem">
            <label>Hình thức kiểm tra</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Hình thức kiểm tra"
              {...register("hinhThucKT", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Số Phút Kiểm Tra</label>
            <input
              style={{ outline: "none" }}
              type="number"
              placeholder="Số Phút Kiểm Tra"
              {...register("soPhutKiemTra", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>GVGD</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="GVGD"
              {...register("GVGD", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>MGV</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="MGV"
              {...register("maGV", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Hệ đào tạo</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Hệ đào tạo"
              {...register("heDT", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Cán bộ giám sát</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Cán bộ giám sát"
              {...register("canBoCoiKiem3", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Mã cán bộ giám sát</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Mã viên chức giám sát"
              {...register("maCanBoCoiKiem3", {
                required: true,
                maxLength: 80,
              })}
            />
          </div>
          <div className="addProductItem">
            <label>Cán bộ dự bị</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Cán bộ dự bị"
              {...register("canBoDuBi", {
                required: true,
                maxLength: 80,
              })}
            />
          </div>
          <div className="addProductItem">
            <label>Mã Cán bộ dự bị</label>
            <input
              style={{ outline: "none" }}
              type="text"
              placeholder="Mã Cán bộ dự bị"
              {...register("maCanBoDuBi", {
                required: true,
                maxLength: 80,
              })}
            />
          </div>

          <button
            className="addProductButton"
            style={{ background: "green", width: "100%", marginBottom: 10 }}
          >
            Tạo môn học
          </button>
        </div>
        <div className="addProductForm-warrper">
          <img
            src={logo}
            alt=""
            style={{ width: 600, height: 300, objectFit: "cover" }}
          />
        </div>
      </form>
    </div>
  );
}
