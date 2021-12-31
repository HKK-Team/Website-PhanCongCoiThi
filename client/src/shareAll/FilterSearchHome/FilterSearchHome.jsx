import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getSchedulesApiAsync } from "../../secretary/sliceApi/SchedulesSlice/schedulesSlice";

export default function FilterSearchHome() {
  useEffect(() => {
    const topbarSecretary = document.querySelector(".topbarSecretary");
    const containerAdminSecretarys = document.querySelector(
      ".containerAdmin-Secretarys"
    );
    const topBarLecturers = document.querySelector(".topBarLecturers");
    const containerAdminLecturers = document.querySelector(
      ".containerAdmin-Lecturers"
    );
    topbarSecretary.style.display = "none";
    containerAdminSecretarys.style.display = "none";
    topBarLecturers.style.display = "none";
    containerAdminLecturers.style.display = "none";
    document.body.style.overflowY = "auto";
  }, []);

  const param = useParams();

  const data = useSelector((state) =>
    state.Schedules.SchedulesApi.data.filter((items) =>
      items.public === true
        ? items.giangVien.find((item) => item.maVienChuc === param.keyWord) ||
          items.nhomKiemTra.indexOf(param.keyWord) !== -1
        : null
    )
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchedulesApiAsync());
  }, [dispatch]);

  const columns = [
    { field: "maHocPhan", headerName: "Mã môn học", width: 150 },
    { field: "tenHocPhan", headerName: "Tên môn học", width: 300 },
    { field: "nhomKiemTra", headerName: "Nhóm kiểm tra", width: 180 },
    { field: "soLuongSinhVien", headerName: "Số lượng SV", width: 130 },
    { field: "soPhutKiemTra", headerName: "Số phút", width: 130 },
    { field: "ngayKiemTra", headerName: "Ngày Thi", width: 130 },
    { field: "gioBatDau", headerName: "Giờ BĐ", width: 130 },
    { field: "maPhong", headerName: "Teamcode/Phòng", width: 130 },
    { field: "hinhThucKiemTra", headerName: "Ghi chú", width: 200 },
  ];
  return (
    <div>
      <Button variant="contained" size="small" style={{margin:10}}>
        <Link to="/" style={{ color: "white" }}>
          {" "}
          Trở lại
        </Link>
      </Button>
      <h1 style={{ textAlign: "center" }}>Hệ Thống Tra cứu lịch thi</h1>
      <h2 style={{ textAlign: "center" }}>Từ Khóa : {param.keyWord}</h2>
      <div style={{ padding: 10, boxShadow: "rgb(0 0 0 / 35%) 0px 5px 15px" }}>
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
    </div>
  );
}
