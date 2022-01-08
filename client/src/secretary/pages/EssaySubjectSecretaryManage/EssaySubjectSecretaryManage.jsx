import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTieuLuanApiAsync } from "../../../api/tieuLuanSlide";
import { getSecretaryAccLogin } from "../../../redux/selectors";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import Loading from "../../../utils/loading/Loading";
import { getSchedulesApiAsync } from "../../sliceApi/SchedulesSlice/schedulesSlice";

export default function EssaySubjectSecretaryManage() {
  const secretaryAccount = useSelector(getSecretaryAccLogin);
  const maKhoa = secretaryAccount?.maKhoa;
  const chuongTrinhDaoTao = secretaryAccount?.chuongTrinhDaoTao;

  const loading = useSelector((state) => state.TieuLuan.tieuLuanApi.loading);
  const data = useSelector((state) =>
    state.TieuLuan.tieuLuanApi.data.filter(
      (item) =>
        item.maKhoa === maKhoa &&
        item.maChuongTrinh === chuongTrinhDaoTao &&
        item.status === "Đang kiểm tra"
    )
  );
  const schudules = useSelector((state) => state.Schedules.SchedulesApi.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTieuLuanApiAsync());
    dispatch(getSchedulesApiAsync());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleOnClickSuccess = (id) => {
    toastPromise(
      axios.put("http://localhost:5000/lecturersTieuLuan/successTieuLuan", {
        id,
        status: "Đã xác nhận",
      }),
      () => {
        setTimeout(() => {
          navigate(0);
        }, 1000);
        return "Phê duyệt thanh công";
      }
    );
  };
  const handleOnClickCancel = (id) => {
    toastPromise(
      axios.put("http://localhost:5000/lecturersTieuLuan/cancelTieuLuan", {
        id,
        status: "Bị từ chối",
      }),
      () => {
        setTimeout(() => {
          navigate(0);
        }, 1000);
        return "Đã từ chối";
      }
    );
  };

  const columns = [
    {
      field: "Actions",
      headerName: "Phê Duyệt",
      width: 150,
      renderCell: (params) => {
        const id = params.id;
        return (
          <span
            className="success"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              handleOnClickSuccess(id);
            }}
          >
            Phê duyệt
          </span>
        );
      },
    },
    {
      field: "Cancel",
      headerName: "Từ chối",
      width: 150,
      renderCell: (params) => {
        const id = params.id;
        return (
          <span
            className="cancel"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              handleOnClickCancel(id);
            }}
          >
            Từ chối
          </span>
        );
      },
    },
    {
      field: "goiY",
      headerName: "Gợi ý",
      width: 150,
      renderCell: (params) => {
        const id = params.id;
        return (
          <Link to={`/HomeSecretary/suggestEssaySubject/${id}`}>
            <span className="pending" style={{ cursor: "pointer" }}>
              Gợi ý ?
            </span>
          </Link>
        );
      },
    },
    { field: "maHocPhan", headerName: "Mã học phần", width: 180 },
    { field: "tenHocPhan", headerName: "Tên học phần", width: 400 },
    { field: "nhomKiemTra", headerName: "Nhóm kiểm tra", width: 200 },

    { field: "toKiem", headerName: "Tổ Kiểm", width: 140 },
    {
      field: "ngayKiemTra",
      headerName: "Ngày kiểm tra",
      width: 140,
      renderCell: (params) => {
        const ngayKiemTra = params.value;
        const gioBatDau = params.row.gioBatDau;
        const maGV = params.row.maGV;
        const FilterLecturers = [];
        schudules.filter((item) =>
          item?.ngayKiemTra.slice(0, 10) === ngayKiemTra.slice(0, 10) &&
          item?.gioBatDau === gioBatDau &&
          item?.maChuongTrinh === chuongTrinhDaoTao &&
          item?.public === true
            ? item.giangVien.filter((item) =>
                FilterLecturers.push(item.maVienChuc)
              )
            : ""
        );
        if (FilterLecturers.includes(maGV)) {
          return (
            <span style={{ color: "red" }}>{params?.value.slice(0, 10)}</span>
          );
        } else {
          return params?.value.slice(0, 10);
        }
      },
    },
    {
      field: "gioBatDau",
      headerName: "Giờ Bắt Đầu",
      width: 140,
      renderCell: (params) => {
        const ngayKiemTra = params.row.ngayKiemTra;
        const gioBatDau = params.value;
        const maGV = params.row.maGV;
        const FilterLecturers = [];
        schudules.filter((item) =>
          item?.ngayKiemTra.slice(0, 10) === ngayKiemTra.slice(0, 10) &&
          item?.gioBatDau === gioBatDau &&
          item?.maChuongTrinh === chuongTrinhDaoTao &&
          item?.public === true
            ? item.giangVien.filter((item) =>
                FilterLecturers.push(item.maVienChuc)
              )
            : ""
        );
        if (FilterLecturers.includes(maGV)) {
          return <span style={{ color: "red" }}>{params?.value}</span>;
        } else {
          return params?.value;
        }
      },
    },
    {
      field: "maPhong",
      headerName: "Mã phòng / teamCode",
      width: 140,
      renderCell: (params) => {
        const ngayKiemTra = params.row.ngayKiemTra;
        const gioBatDau = params.gioBatDau;
        const maPhong = params.row.value;
        const maGV = params.row.maGV;
        const FilterLecturers = [];
        schudules.filter((item) =>
          item?.ngayKiemTra.slice(0, 10) === ngayKiemTra.slice(0, 10) &&
          item?.gioBatDau === gioBatDau &&
          item?.maPhong === maPhong &&
          item?.maChuongTrinh === chuongTrinhDaoTao &&
          item?.public === true
            ? item.giangVien.filter((item) =>
                FilterLecturers.push(item.maVienChuc)
              )
            : ""
        );
        if (FilterLecturers.includes(maGV)) {
          return <span style={{ color: "red" }}>{params?.value}</span>;
        } else {
          return params?.value;
        }
      },
    },
    { field: "soPhutKiemTra", headerName: "Số phút kiểm tra", width: 140 },
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
    { field: "hinhThucKiemTra", headerName: "Hình thức kiểm tra", width: 200 },
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

  if (loading)
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  return (
    <div className="userList">
      <h2>Lịch đăng ký các môn tiểu luận</h2>
      <DataGridPro
        className={classes.root}
        rows={data}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        initialState={{
          pinnedColumns: { left: ["Actions", "Cancel", "goiY"] },
        }}
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
