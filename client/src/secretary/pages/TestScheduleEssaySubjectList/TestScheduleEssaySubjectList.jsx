import { createTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import axios from "axios";
import React, { useEffect } from "react";
import ReactExport from "react-export-excel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTieuLuanApiAsync } from "../../../api/tieuLuanSlide";
import { getSecretaryAccLogin } from "../../../redux/selectors";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import Loading from "../../../utils/loading/Loading";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function TestScheduleEssaySubjectList() {
  const secretaryAccount = useSelector(getSecretaryAccLogin);
  const maKhoa = secretaryAccount?.maKhoa;
  const chuongTrinhDaoTao = secretaryAccount?.chuongTrinhDaoTao;

  const data = useSelector((state) =>
    state.TieuLuan.tieuLuanApi.data.filter(
      (item) =>
        item.maKhoa === maKhoa &&
        item.maChuongTrinh === chuongTrinhDaoTao &&
        item.status === "Đã xác nhận"
    )
  );

  const loading = useSelector((state) => state.TieuLuan.tieuLuanApi.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTieuLuanApiAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa?");
    if (confirm) {
      toastPromise(
        axios.delete(
          `http://localhost:5000/lecturersTieuLuan/deleteTieuLuan/${id}`
        ),
        () => {
          setTimeout(() => {
            navigate(0);
          }, 1000);
          return "Xóa thành công";
        }
      );
    }
  };

  const navigate = useNavigate();

  const columns = [
    { field: "maHocPhan", headerName: "Mã học phần", width: 140 },
    { field: "tenHocPhan", headerName: "Tên Học Phần", width: 200 },
    {
      field: "nhomKiemTra",
      headerName: "Nhóm kiểm tra",
      width: 200,
    },
    { field: "toKiem", headerName: "Tổ kiểm", width: 130 },
    {
      field: "soLuongSinhVien",
      headerName: "Số lượng SV",
      width: 150,
    },
    {
      field: "donViToChucKiemTra",
      headerName: "Đơn vị tổ chức kiểm tra",
      width: 250,
    },
    {
      field: "chuongTrinhBoMon",
      headerName: "Chương trình/Bộ môn",
      width: 300,
    },
    {
      field: "ngayKiemTra",
      headerName: "Ngày kiểm tra",
      width: 150,
      type: "date",
      renderCell: (rowData) => {
        return rowData?.value.slice(0, 10);
      },
    },
    {
      field: "gioBatDau",
      headerName: "Giờ bắt đầu",
      width: 150,
    },
    {
      field: "maPhong",
      headerName: "mã phòng/teamCode",
      width: 180,
    },
    {
      field: "hinhThucKiemTra",
      headerName: "Hình thức kiểm tra",
      width: 200,
    },
    {
      field: "soPhutKiemTra",
      headerName: "Số phút kiểm tra",
      width: 150,
    },
    {
      field: "GVGD",
      headerName: "GVGD",
      width: 200,
    },
    {
      field: "maGV",
      headerName: "MGV",
      width: 120,
    },
    {
      field: "heDaoTao",
      headerName: "Hệ đào tạo",
      width: 150,
    },
    {
      field: "action",
      headerName: "Xóa",
      width: 60,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/HomeSecretary/testSchedule/" + params.id}>
              <button className="productListEdit">Chỉnh sửa</button>
            </Link> */}
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.id)}
            />
          </>
        );
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

  if (loading)
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  return (
    <div className="userList">
      <div className="header-table" style={{ marginBottom: 10 }}>
        <h1 className="header-table-title">Bảng Phân Công Coi Thi Tiểu luận</h1>
        <ExcelFile
          filename={`PhânCôngLichThiTieuLuan`}
          element={
            <Tooltip title="xuất dữ liệu Excel" arrow>
              <Button
                variant="contained"
                color="success"
                size="small"
                style={{ marginRight: 10 }}
              >
                Export Excel
              </Button>
            </Tooltip>
          }
        >
          <ExcelSheet data={data} name="Bảng phân công Tiểu Luận">
            <ExcelColumn label="Mã học phần" value="maHocPhan" />
            <ExcelColumn label="Tên học phần" value="tenHocPhan" />
            <ExcelColumn label="Nhóm kiểm tra" value="nhomKiemTra" />
            <ExcelColumn label="Tổ kiểm" value="toKiem" />
            <ExcelColumn label="Số lượng sinh viên" value="soLuongSinhVien" />
            <ExcelColumn
              label="Đơn vị tổ chức kiểm tra"
              value="donViToChucKiemTra"
            />
            <ExcelColumn label="Chương trình/Bộ môn" value="chuongTrinhBoMon" />
            <ExcelColumn label="Ngày kiểm tra" value="ngayKiemTra" />
            <ExcelColumn label="Giờ bắt đầu" value="gioBatDau" />
            <ExcelColumn label="Teamcode/Phòng" value="maPhong" />
            <ExcelColumn label="Số phút kiểm tra" value="soPhutKiemTra" />
            <ExcelColumn label="GVGD" value="GVGD" />
            <ExcelColumn label="MGV" value="maGV" />
            <ExcelColumn label="Hệ đào tạo" value="heDaoTao" />
          </ExcelSheet>
        </ExcelFile>
      </div>
      <DataGridPro
        className={classes.root}
        getRowId={(row) => row._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        initialState={{
          pinnedColumns: {
            left: ["maHocPhan", "tenHocPhan"],
            right: ["action"],
          },
        }}
        density="compact"
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
