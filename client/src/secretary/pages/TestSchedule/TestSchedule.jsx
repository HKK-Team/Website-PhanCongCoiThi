/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { GlobalState } from "../../../globalState";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";

export default function TestSchedule() {
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
    // formState: { errors },
  } = useForm();

  const onSubmit = async (items) => {
    await toastPromise(
      axios.put("http://localhost:5000/import/editLichThi", {
        ...items,
        param,
      }),
      () => {
        setTimeout(() => {
          window.location.href = "/testSchedule";
        }, 1000);
        return "Cập Nhật Thành Công";
      }
    );
  };
  const param = useParams();
  const state = useContext(GlobalState);
  const [subjects] = state.getSchedulesApi.getSchedules;
  const [data] = subjects.filter(
    (schedules) => schedules._id === param.testScheduleID
  );
  useEffect(() => {
    setValue("gioBatDau", data?.gioBatDau);
    setValue("maHocPhan", data?.maHocPhan);
    setValue("tenHocPhan", data?.tenHocPhan);
    setValue("nhomKiemTra", data?.nhomKiemTra);
    setValue("hinhThucKiemTra", data?.hinhThucKiemTra);
    setValue("GVGD", data?.GVGD);
    setValue("chuongTrinhBoMon", data?.chuongTrinhBoMon);
    setValue("doViToChucKiemTra", data?.doViToChucKiemTra);
    setValue("toKiem", data?.toKiem);
    setValue("soLuongSinhVien", data?.soLuongSinhVien);
    setValue("maGV", data?.maGV);
    setValue("heDaoTao", data?.heDaoTao);
    setValue("donViToChucKiemTra", data?.donViToChucKiemTra);
    setValue("ngayKiemTra", data?.ngayKiemTra);
    setValue("maPhong", data?.maPhong);
    setValue("soPhutKiemTra", data?.soPhutKiemTra);
    setValue("hoTen1", data?.giangVien[0]?.hoTen);
    setValue("maVienChuc1", data?.giangVien[0]?.maVienChuc);
    setValue("hoTen2", data?.giangVien[1]?.hoTen);
    setValue("maVienChuc2", data?.giangVien[1]?.maVienChuc);
  }, [data]);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Chỉnh sửa lịch thi </h1>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="productFormLeft">
            <label>Mã học phần</label>
            <input
              type="text"
              placeholder="CSLT001"
              {...register("maHocPhan", { required: false, maxLength: 80 })}
            />
            <label>Tên học phần</label>
            <input
              type="text"
              placeholder="CSLT"
              {...register("tenHocPhan", { required: false, maxLength: 80 })}
            />
            <label>Nhóm kiểm tra</label>
            <input
              type="text"
              placeholder="D21CNTT01_HK1.CQ.01"
              {...register("nhomKiemTra", { required: false, maxLength: 80 })}
            />
            <label>Tổ kiểm </label>
            <input
              type="text"
              placeholder="001"
              {...register("toKiem", { required: false, maxLength: 80 })}
            />
            <label>Số lượng SV</label>
            <input
              type="text"
              placeholder="60"
              {...register("soLuongSinhVien", { required: false, maxLength: 80 })}
            />
            <label>Đơn vị tổ chức kiểm tra</label>
            <input
              type="text"
              placeholder="Viện KT-CN"
              {...register("donViToChucKiemTra", { required: false, maxLength: 80 })}
            />
            <label>Chương trình/Bộ môn</label>
            <input
              type="text"
              placeholder="Công nghệ thông tin và trí tuệ nhân tạo"
              {...register("chuongTrinhBoMon", { required: false, maxLength: 80 })}
            />
            <label>Ngày kiểm tra</label>
            <input
              type="text"
              {...register("ngayKiemTra", { required: false, maxLength: 80 })}
            />
            <label>Giờ kiểm tra</label>
            <input
              type="text"
              placeholder="13h"
              {...register("gioBatDau", { required: false, maxLength: 80 })}
            />
            <label>Teamcode/Phòng</label>
            <input
              type="text"
              placeholder="1234"
              {...register("maPhong", { required: false, maxLength: 80 })}
            />
          </div>
          <div className="productFormLeft">
            <label>Hình thức kiểm tra</label>
            <input
              type="text"
              placeholder="Trắc nghiệm trực tuyến"
              {...register("hinhThucKiemTra", { required: false, maxLength: 80 })}
            />
            <label>Số phút kiểm tra</label>
            <input
              type="text"
              placeholder="60"
              {...register("soPhutKiemTra", { required: false, maxLength: 80 })}
            />
            <label>Cán bộ coi kiểm tra 01(CB02)</label>
            <input
              type="text"
              {...register("hoTen1", { required: false, maxLength: 80 })}
            />
            <label>Mã viên chức CB01</label>
            <input
              type="text"
              {...register("maVienChuc1", { required: false, maxLength: 80 })}
            />
            <label>Cán bộ coi kiểm tra 02(CB02)</label>
            <input
              type="text"
              {...register("hoTen2", { required: false, maxLength: 80 })}
            />
            <label>Mã viên chức CB02</label>
            <input
              type="text"
              {...register("maVienChuc2", { required: false, maxLength: 80 })}
            />
            <label>GVGD</label>
            <input
              type="text"
              placeholder="Trần Văn Tài"
              {...register("GVGD", { required: false, maxLength: 80 })}
            />
            <label>MGV</label>
            <input
              type="text"
              placeholder="TDMU269"
              {...register("maGV", { required: false, maxLength: 80 })}
            />
            <label>Hệ đào tạo</label>
            <input
              type="text"
              placeholder="Chinh quy"
              {...register("heDaoTao", { required: false, maxLength: 80 })}
            />
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
