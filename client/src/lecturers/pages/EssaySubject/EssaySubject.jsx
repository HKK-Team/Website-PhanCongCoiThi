import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSubjectsApiAsync } from "../../../secretary/sliceApi/SubjectsSlice/subjectsSlice";
import Loading from "../../../utils/loading/Loading";

export default function EssaySubject() {
  const LecturersAccLogin = useSelector(
    (state) => state.LecturersAccount.lecturersAccountApi.data[0]
  );

  const TieuLuan = [];
  // eslint-disable-next-line no-unused-vars
  const Actions = useSelector((state) =>
    state.TieuLuan.tieuLuanApi.data.forEach((items) =>
      items.maGV === LecturersAccLogin?.maVienChuc ? TieuLuan.push(items) : null
    )
  );

  const { loading } = useSelector((state) => state.Subjects.SubjectsApi);
  const data = [];

  // eslint-disable-next-line no-unused-vars
  const datas = useSelector((state) =>
    state.Subjects.SubjectsApi.data.forEach((items) =>
      (items.hinhThucKT === "Tiểu luận" &&
        items.maGV === LecturersAccLogin?.maVienChuc) ||
      (items.hinhThucKT === "Báo cáo" &&
        items.maGV === LecturersAccLogin?.maVienChuc)
        ? data.push(items)
        : null
    )
  );

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
        const check = TieuLuan.find(
          (item) =>
            item.maGV === params.row.maGV &&
            item.nhomKiemTra === params.row.nhomKT &&
            item.maHocPhan === params.row.maHp &&
            item.hinhThucKiemTra === params.row.hinhThucKT
        );
        if (check === undefined) {
          return (
            <>
              <Link to={"/HomeLecturers/newEssaySubject/" + params.id}>
                <button className="userListEdit">Đăng ký</button>
              </Link>
            </>
          );
        } else {
          return (
            <>
              <Link to={"/HomeLecturers/manageEssaySubject"}>
                <button className="userListEdit" style={{ background: "gray" }}>
                  Đã đăng ký
                </button>
              </Link>
            </>
          );
        }
      },
    },
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

  if (loading)
    return (
      <div className="loading">
        {" "}
        <Loading />
      </div>
    );

  return (
    <div className="userList">
      <h2>Bảng đăng ký môn tiểu luận</h2>
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
