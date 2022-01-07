import { makeStyles } from "@material-ui/styles";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import { Tooltip } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toastInfor } from "../../../shareAll/toastMassage/toastMassage";
import Loading from "../../../utils/loading/Loading";
import "./EssaySubjectManage.css";

export default function EssaySubjectManage() {
  const LecturersAccLogin = useSelector(
    (state) => state.LecturersAccount.lecturersAccountApi.data[0]
  );
  const data = [];
  // eslint-disable-next-line no-unused-vars
  const datas = useSelector((state) =>
    state.TieuLuan.tieuLuanApi.data.forEach((items) =>
      items.maGV === LecturersAccLogin?.maVienChuc ? data.push(items) : null
    )
  );
  const loading = useSelector((state) => state.TieuLuan.tieuLuanApi.loading);


  const columns = [
    {
      field: "Actions",
      headerName: "Chỉnh sữa",
      width: 150,
      renderCell: (params) => {
        if (params.row.status === "Đang kiểm tra") {
          return (
            <>
              <Link to={"/HomeLecturers/editEssaySubject/" + params.id}>
                <button className="userListEdit">Chỉnh sữa</button>
              </Link>
            </>
          );
        } else if (params.row.status === "Bị từ chối") {
          return (
            <>
              <Link to={"/HomeLecturers/editEssaySubject/" + params.id}>
                <button className="userListEdit">Đăng kí lại</button>
              </Link>
            </>
          );
        } else {
          return (
            <>
              <button
                className="userListEdit"
                disabled
                style={{ background: "gray" }}
              >
                Khóa
              </button>
            </>
          );
        }
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        if (params.value === "Đang kiểm tra") {
          return <span className="pending">{params.value}</span>;
        } else if (params.value === "Đã xác nhận") {
          return <span className="success">{params.value}</span>;
        } else {
          return <span className="cancel">{params.value}</span>;
        }
      },
    },
    {
      field: "phanHoi",
      headerName: "Phản Hồi",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.value === false ? (
              <MarkEmailUnreadIcon
                onClick={() => {
                  toastInfor("Chưa có phản hồi nào !");
                }}
                style={{
                  cursor: "pointer",
                  paddingTop: "5px",
                  paddingLeft: "23px",
                  fontSize: 33,
                }}
              />
            ) : (
              <Tooltip title="Thông báo mới">
                <Link to={"/HomeLecturers/suggestEssaySubjectLecrurers/" + params.id}>
                  <MarkEmailUnreadIcon
                    style={{
                      cursor: "pointer",
                      paddingTop: "23px",
                      paddingLeft: "23px",
                      fontSize: 33,
                      color: "red",
                    }}
                  />
                </Link>
              </Tooltip>
            )}
          </>
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
        return params?.value.slice(0, 10);
      },
    },
    { field: "gioBatDau", headerName: "Giờ Bắt Đầu", width: 140 },
    { field: "maPhong", headerName: "Mã phòng / teamCode", width: 140 },
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
      <h2>Theo Dõi Đăng Ký</h2>
      <DataGridPro
        className={classes.root}
        rows={data}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        initialState={{
          pinnedColumns: { left: ["Actions", "status", "phanHoi"] },
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
