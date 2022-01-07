import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../utils/loading/Loading";
import { getSchedulesApiAsync } from "./../../../secretary/sliceApi/SchedulesSlice/schedulesSlice";

export default function TestScheduleLecturers() {
  const LecturersAccLogin = useSelector(
    (state) => state.LecturersAccount.lecturersAccountApi.data[0]
  );
  const { loding } = useSelector((state) => state.Schedules.SchedulesApi);

  const data = [];
  // eslint-disable-next-line no-unused-vars
  const datas = useSelector((state) =>
    state.Schedules.SchedulesApi.data.forEach((items) => {
      if (items.public === true) {
        items.giangVien.filter((item) =>
          item.maVienChuc === LecturersAccLogin?.maVienChuc
            ? data.push(items)
            : null
        );
      }
    })
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchedulesApiAsync());
  }, [dispatch]);

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

    {
      field: "ngayKiemTra",
      headerName: "Ngày kiểm tra",
      width: 180,
      renderCell: (row) => {
        return row.value.slice(0, 10);
      },
    },
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
  if (loding)
    return (
      <div className="loading">
        {" "}
        <Loading />
      </div>
    );

  return (
    <div className="userList">
      <h2>Bảng Phân công coi thi</h2>
      <DataGridPro
        className={classes.root}
        rows={data}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
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
