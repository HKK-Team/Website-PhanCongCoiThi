/* eslint-disable array-callback-return */
import { createSlice } from "@reduxjs/toolkit";

export const arrangeExamScheduleSlide = createSlice({
  name: "arrangeExamSchedule",
  initialState: { arrangeExamScheduleList: { data: [], boundLecturers: [] } },
  reducers: {
    CreateList: (state, action) => {
      const dsGiangVien = {
        hoTen1: "",
        maVienChuc1: "",
        email1: "",
        maKhoa1: "",
        maChuongTrinh1: "",
        hoTen2: "",
        maVienChuc2: "",
        email2: "",
        maKhoa2: "",
        maChuongTrinh2: "",
      };
      if (action.payload !== "reset") {
        state.arrangeExamScheduleList.data.push(
          Object.assign(dsGiangVien, action.payload)
        );
      } else {
        state.arrangeExamScheduleList.data = [];
      }
    },

    EditList: (state, action) => {
      const object = action.payload.object;
      const objectKey = action.payload.objectKey;
      state.arrangeExamScheduleList.data.find((item) => {
        if (item._id === objectKey[0]) {
          item.GVGD = object[0].GVGD.value;
          item.chuongTrinh = object[0].chuongTrinh.value;
          item.doViToChuc = object[0].doViToChuc.value;
          // item.gioBatDau = object[0]?.gioBatDau?.value;
          item.heDT = object[0].heDT.value;
          item.hinhThucKT = object[0].hinhThucKT.value;
          item.hoTen1 = object[0].hoTen1.value;
          item.hoTen2 = object[0].hoTen2.value;
          item.maGV = object[0].maGV.value;
          item.maHp = object[0].maHp.value;
          item.maPhong = object[0].maPhong.value;
          item.maVienChuc1 = object[0].maVienChuc1.value;
          item.maVienChuc2 = object[0].maVienChuc2.value;
          // item.ngayKiemTra = object[0].ngayKiemTra.value;
          item.nhomKT = object[0].nhomKT.value;
          item.soLuong = object[0].soLuong.value;
          item.soPhutKiemTra = object[0].soPhutKiemTra.value;
          item.tenHp = object[0].tenHp.value;
          item.toKiem = object[0].toKiem.value;
          item.canBoCoiKiem3 = object[0].canBoCoiKiem3.value;
          item.maCanBoCoiKiem3 = object[0].maCanBoCoiKiem3.value;
          item.canBoDuBi = object[0].canBoDuBi.value;
          item.maCanBoDuBi = object[0].maCanBoDuBi.value;
        }
      });
    },

    DeleteList: (state, action) => {
      state.arrangeExamScheduleList.data.splice(action.payload, 1);
    },

    BoundLecturers: (state, action) => {
      if (action.payload !== "reset") {
        const data = action.payload.object;
        let flag = false;
        state.arrangeExamScheduleList.boundLecturers.find((item) => {
          if (item.id === data.id && item.field === data.field) {
            item.hoTen = data.hoTen;
            item.email = data.email;
            item.maVienChuc = data.maVienChuc;
            item.field = data.field;
            return flag = true;
          } else {
            flag = false;
          }
        });
        if (!flag) {
          state.arrangeExamScheduleList.boundLecturers.push(data);
        }
      } else {
        state.arrangeExamScheduleList.boundLecturers = [];
      }
    },

    EditLecturersOne: (state, action) => {
      const data = action.payload.object;
      state.arrangeExamScheduleList.data.forEach((item) => {
        if (item._id === data.id) {
          item.hoTen1 = data.hoTen;
          item.maVienChuc1 = data.maVienChuc;
          item.email1 = data.email;
          item.maKhoa1 = data.maKhoa;
          item.maChuongTrinh1 = data.maChuongTrinh;
          return;
        }
      });
    },
    EditLecturersTwo: (state, action) => {
      const data = action.payload.object;
      state.arrangeExamScheduleList.data.forEach((item) => {
        if (item._id === data.id) {
          item.hoTen2 = data.hoTen;
          item.maVienChuc2 = data.maVienChuc;
          item.email2 = data.email;
          item.maKhoa2 = data.maKhoa;
          item.maChuongTrinh2 = data.maChuongTrinh;
          return;
        }
      });
    },
  },
});
export default arrangeExamScheduleSlide;
