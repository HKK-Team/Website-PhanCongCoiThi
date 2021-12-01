/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../../globalState";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import { useForm } from "react-hook-form";
import "./Product.css";

// chỉnh sửa sản phẩm
export default function Subjects() {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  const onSubmit = async (items) => {
    await toastPromise(
      axios.put("http://localhost:5000/import/editMonThi", {
        ...items,
        param,
      }),
      () => {
        setTimeout(() => {
          window.location.href = "/lecturers";
        }, 1000);
        return "Cập Nhật Thành Công";
      }
    );
  };
  const param = useParams();
  const state = useContext(GlobalState);

  const [subjects] = state.getSubjectsApi.getSubjects;
  const [data] = subjects.filter((subject) => subject._id === param.subjectsId);

  useEffect(() => {
    setValue("maHp", data.maHp);
    setValue("tenHp", data.tenHp);
    setValue("nhomKT", data.nhomKT);
    setValue("hinhThucKT", data.hinhThucKT);
    setValue("GVGD", data.GVGD);
    setValue("chuongTrinh", data.chuongTrinh);
    setValue("doViToChuc", data.doViToChuc);
    setValue("toKiem", data.toKiem);
    setValue("soLuong", data.soLuong);
    setValue("maGV", data.maGV);
    setValue("heDT", data.heDT);
  }, [data]);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Chỉnh sửa môn học</h1>
        <Link to="/newSubjects">
          <button className="productAddButton">Thêm môn học</button>
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
              placeholder={data?.maHp}
              {...register("maHp", { required: false, maxLength: 80 })}
            />

            <label>Tên học phần</label>
            <input
              type="text"
              placeholder={data?.tenHp}
              {...register("tenHp", { required: false, maxLength: 80 })}
            />
            <label>Nhóm kiểm tra</label>
            <input
              type="text"
              placeholder={data?.nhomKT}
              {...register("nhomKT", { required: false, maxLength: 80 })}
            />
            <label>Tổ kiểm </label>
            <input
              type="text"
              placeholder={data?.toKiem}
              {...register("toKiem", { required: false, maxLength: 80 })}
            />
            <label>Số lượng SV</label>
            <input
              type="number"
              placeholder={data?.soLuong}
              {...register("soLuong", { required: false, maxLength: 80 })}
            />
            <label>Đơn vị tổ chức kiểm tra</label>
            <input
              type="text"
              placeholder={data?.doViToChuc}
              {...register("doViToChuc", { required: false, maxLength: 80 })}
            />
          </div>
          <div className="productFormLeft">
            <label>Chương trình/Bộ môn</label>
            <input
              type="text"
              placeholder={data?.chuongTrinh}
              {...register("chuongTrinh", { required: false, maxLength: 80 })}
            />
            <label>Hình thức kiểm tra</label>
            <input
              type="text"
              placeholder={data?.hinhThucKT}
              {...register("hinhThucKT", { required: false, maxLength: 80 })}
            />
            <label>GVGD</label>
            <input
              type="text"
              placeholder={data?.GVGD}
              {...register("GVGD", { required: false, maxLength: 80 })}
            />
            <label>MGV</label>
            <input
              type="text"
              placeholder={data?.maGV}
              {...register("maGV", { required: false, maxLength: 80 })}
            />
            <label>Hệ đào tạo</label>
            <input
              type="text"
              placeholder={data?.heDT}
              {...register("heDT", { required: false, maxLength: 80 })}
            />
            <button className="productButton">Chỉnh sửa</button>
          </div>
        </form>
      </div>
    </div>
  );
}
