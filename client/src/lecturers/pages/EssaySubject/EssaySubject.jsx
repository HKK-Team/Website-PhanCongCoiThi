import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { userRows } from "../../../secretary/totalData";
import { getdata } from "../../../secretary/totalData";
import GetData from "../../../secretary/totalData";
import { useState, useContext } from "react";
import { GlobalState } from "../../../globalState";
import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";

export default function EssaySubject() {
  GetData();
  const [data] = useState(getdata.rgSubjects);

  const state = useContext(GlobalState);
  // const [isLogged] = state.lecturerApi.isLogin;
  //console.log(state.lecturerApi);
  // khởi tạo dữ liệu bảng
  // console.log(getdata.rgSubjects[0].dsDangKi.length)
  const columns = [
    { field: "hoTen", headerName: "Họ tên", width: 150 },
    { field: "maGiangVien", headerName: "Mã giảng viên", width: 150 },
    {
      field: "nhomKT",
      headerName: "Nhóm kiểm tra",
      width: 190,
      renderCell: (params) => {
        return params?.row?.dsDangKi?.nhomKT;
      },
    },
    {
      field: "tenHp",
      headerName: "Tên học phần",
      width: 250,
      renderCell: (params) => {
        return params?.row?.dsDangKi?.tenHp;
      },
    },
    {
      field: "maHp",
      headerName: "Mã học phần",
      width: 150,
      renderCell: (params) => {
        return params?.row?.dsDangKi?.maHp;
      },
    },
    {
      field: "hinhThucKT",
      headerName: "Hình thức kiểm tra",
      width: 150,
      renderCell: (params) => {
        return params?.row?.dsDangKi?.hinhThucKT;
      },
    },
    {
      field: "thoiGianBatDau",
      headerName: "Thời gian bắt đầu",
      width: 150,
      renderCell: (params) => {
        return params?.row?.dsDangKi?.thoiGianBatDau;
      },
    },
    {
      field: "thoiGianKetThuc",
      headerName: "Thời gian kết thúc",
      width: 150,
      renderCell: (params) => {
        return params?.row?.dsDangKi?.thoiGianKetThuc;
      },
    },
    {
      field: "maPhong",
      headerName: "Tên phòng",
      width: 150,
      renderCell: (params) => {
        return params?.row?.dsDangKi?.maPhong;
      },
    },
    {
      field: "ngayDangKi",
      headerName: "Ngày đăng kí",
      width: 150,
      renderCell: (params) => {
        return params?.row?.dsDangKi?.ngayDangKi;
      },
    },
  ];
  const defaultTheme = createTheme();
  const useStyles = makeStyles(
    (theme) => {
      return {
        root: {
          "& .MuiButton-root": {
            color: "#1976d2",
            fontWeight: "700",
          },
          "& .MuiSvgIcon-root": {
            color: "#1976d2",
            fontWeight: "700",
          },
        },
      };
    },
    { defaultTheme }
  );
  const classes = useStyles();
  return (
    <div className="userList">
      <h2>Bảng đăng ký môn tiểu luận</h2>
      <DataGrid
        className={classes.root}
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
