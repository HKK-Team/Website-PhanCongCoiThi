import { makeStyles } from "@material-ui/styles";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import { Tooltip } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSubjectsApiAsync } from "../../../secretary/sliceApi/SubjectsSlice/subjectsSlice";
import { toastInfor } from "../../../shareAll/toastMassage/toastMassage";

export default function EssaySubject() {
  const LecturersAccLogin = useSelector(
    (state) => state.LecturersAccount.lecturersAccountApi.data[0]
  );
  const { loading } = useSelector((state) => state.Schedules.SchedulesApi);
  const data = [];

  // eslint-disable-next-line no-unused-vars
  const datas = useSelector((state) =>
    state.Subjects.SubjectsApi.data.forEach((items) =>
      (items.hinhThucKT === "Tiểu luận" &&
        items.maGV === LecturersAccLogin?.maVienChuc) ||
      (items.hinhThucKT === "Đồ án" &&
        items.maGV === LecturersAccLogin?.maVienChuc)
        ? data.push(items)
        : null
    )
  );
  console.log(data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubjectsApiAsync());
  }, [dispatch]);

  const columns = [
    {
      field: "Actions",
      headerName: "Đăng ký",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/HomeLecturers/newEssaySubject/" + params.id}>
              <button className="userListEdit">Đăng ký</button>
            </Link>
          </>
        );
      },
    },
    { field: "status", headerName: "Trạng thái", width: 150 },
    {
      field: "phanHoi",
      headerName: "Phản Hồi",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.phanHoi === false ? (
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
                <Link to={"/HomeSecretary/newEssaySubject/" + params.id}>
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
    { field: "ngayKiemTra", headerName: "Ngày kiểm tra", width: 180 },
    { field: "gioBatDau", headerName: "Giờ bắt đầu", width: 150 },
    { field: "maPhong", headerName: "Teamcode/Phòng", width: 200 },
    { field: "soPhutKiemTra", headerName: "Số phút kiểm tra", width: 180 },
    { field: "maHp", headerName: "Mã học phần", width: 180 },
    { field: "tenHp", headerName: "Tên học phần", width: 400 },
    { field: "nhomKT", headerName: "Nhóm kiểm tra", width: 200 },

    { field: "toKiem", headerName: "Tổ Kiểm", width: 140 },
    { field: "soLuong", headerName: "Số lượng SV", width: 160 },
    {
      field: "doViToChuc",
      headerName: "Đơn vị tổ chức kiểm tra",
      width: 250,
    },
    {
      field: "chuongTrinh",
      headerName: "Chương trình/Bộ môn",
      width: 350,
    },
    { field: "hinhThucKT", headerName: "Hình thức kiểm tra", width: 200 },
    { field: "GVGD", headerName: "GVGD", width: 200 },
    { field: "maGV", headerName: "MGV", width: 150 },
    { field: "heDT", headerName: "Hệ đào tạo", width: 150 },
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

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="userList">
      <h2>Bảng đăng ký môn tiểu luận</h2>
      <DataGrid
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
