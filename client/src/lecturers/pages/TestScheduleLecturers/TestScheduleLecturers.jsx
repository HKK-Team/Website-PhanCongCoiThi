import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { userRows } from "../../../secretary/totalData";
import { useState, useContext } from "react";
import { GlobalState } from "../../../globalState";
import { getdata } from "../../../secretary/totalData";
import GetData from "../../../secretary/totalData";

export default function TestScheduleLecturers() {
  GetData();
  const [data] = useState(getdata.schedule);

  // khởi tạo dữ liệu bảng
  const columns = [
    {
      field: "toKiem",
      headerName: "Tổ kiểm tra",
      width: 150,
    },
    { field: "maHocPhan", headerName: "Nhóm học", width: 150 },
    { field: "soLuongSinhVien", headerName: "Số lượng sinh viên", width: 250 },
    { field: "ngayKiemTra", headerName: "Ngày kiểm tra", width: 200 },
    { field: "gioBatDau", headerName: "Giờ bắt đầu", width: 180 },
    { field: "maPhong", headerName: "Phòng", width: 150 },
    { field: "hinhThucKiemTra", headerName: "Hình thức kiểm tra", width: 250 },
    { field: "soPhutKiemTra", headerName: "Số phút kiểm tra", width: 250 },
    {
      field: "canBo1",
      headerName: "Cán bộ coi kiểm tra 01(CB01)",
      width: 250,
      renderCell: (params) => {
        return params?.row?.giangVien[0]?.hoTen;
      },
    },
    {
      field: "maVienChuc1",
      headerName: "Mã viên chức CB01",
      width: 250,
      renderCell: (params) => {
        return params?.row?.giangVien[0]?.maVienChuc;
      },
    },
    {
      field: "canBo2",
      headerName: "Cán bộ coi kiểm tra 02(CB02)",
      width: 250,
      renderCell: (params) => {
        return params?.row?.giangVien[1]?.hoTen;
      },
    },
    {
      field: "maVienChuc2",
      headerName: "Mã viên chức CB02",
      width: 250,
      renderCell: (params) => {
        return params?.row?.giangVien[1]?.maVienChuc;
      },
    },
    {
      field: "canBo3",
      headerName: "Cán bộ coi kiểm tra 03(CB03)",
      width: 250,
      renderCell: (params) => {
        return params?.row?.giangVien[2]?.hoTen;
      },
    },
    {
      field: "maVienChuc3",
      headerName: "Mã viên chức CB03",
      width: 250,
      renderCell: (params) => {
        return params?.row?.giangVien[2]?.maVienChuc;
      },
    },
    {
      field: "chuongTrinhBoMon",
      headerName: "Chương trình/Bộ môn",
      width: 250,
    },
    { field: "heDaoTao", headerName: "Hệ đào tạo", width: 150 },
    { field: "ghiChu", headerName: "Ghi chú", width: 150 },
  ];

  return (
    <div className="userList">
      <h2>Bảng Phân công coi thi</h2>
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        localeText={{
          toolbarDensity: "Size",
          toolbarDensityLabel: "Size",
          toolbarDensityCompact: "Small",
          toolbarDensityStandard: "Medium",
          toolbarDensityComfortable: "Large",
        }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}
