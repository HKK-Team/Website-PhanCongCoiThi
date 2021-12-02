import "./NewProduct.css";
import logo from "./../../../images/tdmu-elearning-banner.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";

// thêm sản phẩm mới
export default function NewSubjects() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await toastPromise(
      axios.post("http://localhost:5000/import/createMonThi", {
        ...data,
      }),
      () => {
        setTimeout(() => {
          window.location.href = "/HomeSecretary/subjects";
        }, 1000);
        return "Thêm Thành Công";
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm Môn Học</h1>
      <form className="addProductForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="addProductForm-warrper">
          <div className="addProductItem">
            <label>Mã học phần</label>
            <input
              type="text"
              placeholder="Mã học phần"
              {...register("maHp", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Tên học phần</label>
            <input
              type="text"
              placeholder="Tên học phần"
              {...register("tenHp", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Nhóm kiểm tra</label>
            <input
              type="text"
              placeholder="Nhóm kiểm tra"
              {...register("nhomKT", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Tổ kiểm </label>
            <input
              type="text"
              placeholder="Tổ kiểm"
              {...register("toKiem", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Số lượng SV</label>
            <input
              type="number"
              placeholder="Số lượng SV"
              {...register("soLuong", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Đơn vị tổ chức kiểm tra</label>
            <input
              type="text"
              placeholder="Đơn vị tổ chức kiểm tra"
              {...register("doViToChuc", { required: true, maxLength: 80 })}
            />
          </div>
        </div>
        <div className="addProductForm-warrper">
          <div className="addProductItem">
            <label>Chương trình/Bộ môn</label>
            <input
              type="text"
              placeholder="Chương trình/Bộ môn"
              {...register("chuongTrinh", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Hình thức kiểm tra</label>
            <input
              type="text"
              placeholder="Hình thức kiểm tra"
              {...register("hinhThucKT", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>GVGD</label>
            <input
              type="text"
              placeholder="GVGD"
              {...register("GVGD", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>MGV</label>
            <input
              type="text"
              placeholder="MGV"
              {...register("maGV", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="addProductItem">
            <label>Hệ đào tạo</label>
            <input
              type="text"
              placeholder="Hệ đào tạo"
              {...register("heDT", { required: true, maxLength: 80 })}
            />
          </div>
          <button className="addProductButton">Tạo môn học</button>
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
