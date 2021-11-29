import "./BillList.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import GetData, { getdata } from "../../totalData";
import { useState } from "react";
import { HeaderTableTestSchedule } from "../../components/headerTable/headerTable";
import { Link } from "react-router-dom";

// bảng lịch thi
export default function BillList() {
  GetData();
  const data = [...getdata.getSchedulesApi];
  console.log(data);
  // xóa hóa đơn khỏi bảng
  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
  };
  // khởi tạo dữ liệu bảng
  const columns = [
    { field: "maHocPhan", headerName: "Mã học phần", width: 180 },
    { field: "tenHocPhan", headerName: "Tên học phần", width: 400 },
    { field: "nhomKiemTra", headerName: "Nhóm kiểm tra", width: 200 },

    { field: "toKiem", headerName: "Tổ Kiểm", width: 140 },
    { field: "soLuongSinhVien", headerName: "Số lượng SV", width: 160 },
    {
      field: "donViToChucKiemTra",
      headerName: "Đơn vị tổ chức kiểm tra",
      width: 250,
    },
    {
      field: "chuongTrinhBoMon",
      headerName: "Chương trình/Bộ môn",
      width: 350,
    },

    { field: "ngayKiemTra", headerName: "Ngày kiểm tra", width: 180 },
    { field: "gioBatDau", headerName: "Giờ bắt đầu", width: 150 },
    { field: "maPhong", headerName: "Teamcode/Phòng", width: 200 },
    { field: "hinhThucKiemTra", headerName: "Hình thức kiểm tra", width: 200 },
    { field: "soPhutKiemTra", headerName: "Số phút kiểm tra", width: 180 },

    {
      field: "giangVien[0].hoTen",
      headerName: "Cán bộ coi kiểm tra 01(CB01)",
      width: 230,
      renderCell: (params) => {
        return params.row?.giangVien[0]?.hoTen;
      },
    },
    {
      field: "giangVien[0].maVienChuc",
      headerName: "Mã viên chức CB01",
      width: 200,
      renderCell: (params) => {
        return params.row?.giangVien[0]?.maVienChuc;
      },
    },
    {
      field: "giangVien[1].hoTen",
      headerName: "Cán bộ coi kiểm tra 02(CB02)",
      width: 230,
      renderCell: (params) => {
        return params.row?.giangVien[1]?.hoTen;
      },
    },
    {
      field: "giangVien[1].maVienChuc",
      headerName: "Mã viên chức CB02",
      width: 200,
      renderCell: (params) => {
        return params.row?.giangVien[1]?.maVienChuc;
      },
    },
    { field: "GVGD", headerName: "GVGD", width: 200 },
    { field: "maGV", headerName: "MGV", width: 150 },
    { field: "heDaoTao", headerName: "Hệ đào tạo", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/testSchedule/" + params.row.id}>
              <button className="userListEdit">Chỉnh sửa</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <HeaderTableTestSchedule title="Bảng Lịch Thi Đã Phân Công" />
      <DataGrid
        getRowId={(row) => row._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        checkboxSelection
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
