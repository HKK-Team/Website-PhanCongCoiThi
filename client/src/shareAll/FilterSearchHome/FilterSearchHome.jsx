import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSchedulesApiAsync } from "../../secretary/sliceApi/SchedulesSlice/schedulesSlice";

export default function FilterSearchHome() {

  const keyWord = useSelector(
    (state) => state.Schedules.filters?.maVienChucVSTenLop
  );

  const data = useSelector((state) =>
    state.Schedules.SchedulesApi.data.filter((items) =>
      items.public === true
        ? items.giangVien.find((item) => item.maVienChuc === keyWord) ||
          items.nhomKiemTra.indexOf(keyWord) !== -1
        : null
    )
  );
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchedulesApiAsync());
  }, [dispatch]);

  const columns = [
    { field: "maHocPhan", headerName: "Mã môn học", width: 180 },
    { field: "tenHocPhan", headerName: "Tên môn học", width: 400 },
    { field: "nhomKiemTra", headerName: "Nhóm kiểm tra", width: 200 },
    { field: "soLuongSinhVien", headerName: "Số lượng SV", width: 160 },
    { field: "soPhutKiemTra", headerName: "Số phút", width: 180 },
    { field: "ngayKiemTra", headerName: "Ngày Thi", width: 180 },
    { field: "gioBatDau", headerName: "Giờ BĐ", width: 150 },
    { field: "maPhong", headerName: "Teamcode/Phòng", width: 200 },
    { field: "hinhThucKiemTra", headerName: "Ghi chú", width: 200 },
  ];

  const ref = useRef();
  useEffect(() => {
    const elm = ref.current;
    if (keyWord === "") {
      elm.style.display = "none";
    } else {
      elm.style.display = "block";
    }
  }, [keyWord]);

  return (
    <div ref={ref}>
      <DataGrid
        autoHeight
        getRowId={(row) => row._id}
        rows={data}
        hideFooter
        disableSelectionOnClick
        columns={columns}
        localeText={{
          toolbarDensity: "Size",
          toolbarDensityLabel: "Size",
          toolbarDensityCompact: "Small",
          toolbarDensityStandard: "Medium",
          toolbarDensityComfortable: "Large",
        }}
      />
    </div>
  );
}
