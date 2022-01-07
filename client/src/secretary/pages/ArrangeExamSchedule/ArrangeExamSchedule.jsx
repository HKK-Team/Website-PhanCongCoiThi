import { makeStyles } from "@material-ui/styles";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { MenuItem, Select, Tooltip } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSecretaryAccLogin } from "../../../redux/selectors";
import { toastInfor } from "../../../shareAll/toastMassage/toastMassage";
import Loading from "../../../utils/loading/Loading";
import { HeaderTableArrangeExamSchedule } from "../../components/headerTable/headerTable";
import arrangeExamScheduleSlide from "../../sliceApi/ArrangeExamSchedule/arrangeExamScheduleSlide";
import { getSchedulesApiAsync } from "../../sliceApi/SchedulesSlice/schedulesSlice";

export default function ArrangeExamSchedule() {
  const secretaryAccount = useSelector(getSecretaryAccLogin);
  const maKhoa = secretaryAccount?.maKhoa;
  const chuongTrinhDaoTao = secretaryAccount?.chuongTrinhDaoTao;

  let { loading } = useSelector((state) => state.Lecturers.LecturersApi);
  let { loading: loading2 } = useSelector(
    (state) => state.Subjects.SubjectsApi
  );

  // khoi tao mang chua giang vien
  const lecturers = useSelector((state) =>
    state.Lecturers.LecturersApi.data.filter((item) => item.maKhoa === maKhoa)
  );

  const schudules = useSelector((state) => state.Schedules.SchedulesApi.data);

  const subjects = useSelector((state) =>
    state.Subjects.SubjectsApi.data.filter(
      (item) =>
        item.maKhoa === maKhoa &&
        item.maChuongTrinh === chuongTrinhDaoTao &&
        item.hinhThucKT !== "Tiểu luận" &&
        item.hinhThucKT !== "Báo cáo"
    )
  );

  const ArrangeExamSchedules = useSelector(
    (state) => state.ArrangeExamSchedule.arrangeExamScheduleList.data
  );

  const boundLecturers = useSelector(
    (state) => state.ArrangeExamSchedule.arrangeExamScheduleList.boundLecturers
  );

  useEffect(() => {
    window.moveTo(0, 300);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSchedulesApiAsync());
  }, [dispatch]);

  const [checkOut, setCheckOut] = useState(false);

  // tự động sắp xếp lịch
  function handleAutoMatic(e) {
    if (!subjects.length) {
      toastInfor("Không có dữ liệu vui lòng kiểm tra môn thi");
    }
    if (checkOut === true) {
      if (window.confirm("Bạn có chắc chắn muốn tạo lại lịch thi không?")) {
        dispatch(arrangeExamScheduleSlide.actions.BoundLecturers("reset"));
        if (ArrangeExamSchedules.length === subjects.length) {
          dispatch(arrangeExamScheduleSlide.actions.CreateList("reset"));
          for (let key = 0; key < subjects.length; key++) {
            dispatch(
              arrangeExamScheduleSlide.actions.CreateList(subjects[key])
            );
          }
        } else {
          for (let key = 0; key < subjects.length; key++) {
            dispatch(
              arrangeExamScheduleSlide.actions.CreateList(subjects[key])
            );
          }
        }
      }
    } else {
      if (ArrangeExamSchedules.length === subjects.length) {
        dispatch(arrangeExamScheduleSlide.actions.CreateList("reset"));
        for (let key = 0; key < subjects.length; key++) {
          dispatch(arrangeExamScheduleSlide.actions.CreateList(subjects[key]));
        }
      } else {
        for (let key = 0; key < subjects.length; key++) {
          dispatch(arrangeExamScheduleSlide.actions.CreateList(subjects[key]));
        }
      }
    }
    setCheckOut(true);
  }

  // lưu lại thay đổi trong data
  const handleEditRowsModelChange = useCallback(
    (model) => {
      let object = Object.values(model);
      let objectKey = Object.keys(model);
      if (object.length === 0 || objectKey.length === 0) {
        return;
      } else {
        dispatch(
          arrangeExamScheduleSlide.actions.EditList({ object, objectKey })
        );
      }
    },
    [dispatch]
  );

  // ngăn chặn rời đi khi chưa lưu
  useEffect(() => {
    if (checkOut) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
  }, [checkOut]);

  // xóa dữ liệu
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      dispatch(arrangeExamScheduleSlide.actions.DeleteList(id));
    }
  };

  const getMaVienChuc = (hoTen) => {
    let a = "";
    for (const key in hoTen) {
      if (hoTen[key] === "-") {
        break;
      } else {
        a += hoTen[key];
      }
    }
    const maVienChuc1 = lecturers.find((item) =>
      item.hoTen === a.trim() ? item.maVienChuc : ""
    );
    return maVienChuc1;
  };

  function handleChanges(id, field, value, ngayKiemTra, GioBatDau) {
    const TTGiangVien = getMaVienChuc(value);
    const object = {
      id: id,
      maVienChuc: TTGiangVien?.maVienChuc,
      ngayKiemTra: ngayKiemTra,
      gioBatDau: GioBatDau,
      hoTen: value,
      email: TTGiangVien?.email,
      maChuongTrinh: TTGiangVien?.maChuongTrinh,
      maKhoa: TTGiangVien?.maKhoa,
      field: field,
    };
    dispatch(
      arrangeExamScheduleSlide.actions.BoundLecturers({
        object,
      })
    );
    if (field === "hoTen1") {
      dispatch(
        arrangeExamScheduleSlide.actions.EditLecturersOne({
          object,
        })
      );
    } else {
      dispatch(
        arrangeExamScheduleSlide.actions.EditLecturersTwo({
          object,
        })
      );
    }
    navigate("/HomeSecretary/arrangeExamSchedule");
  }

  const navigate = useNavigate();
  // khởi tạo dữ liệu bảng
  const columns = [
    {
      editable: false,
      field: "ngayKiemTra",
      headerName: "Ngày kiểm tra",
      type: "date",
      width: 102,
    },
    {
      editable: false,
      field: "gioBatDau",
      headerName: "Giờ bắt đầu",
      width: 85,
    },
    {
      editable: true,
      field: "hoTen1",
      headerName: "Cán bộ coi kiểm tra 01(CB01)",
      width: 182,
      renderEditCell: (params) => {
        const ngay = params.row.ngayKiemTra;
        const gio = params.row.gioBatDau;
        const FilterLecturers = [];
        schudules.filter((item) =>
          item?.ngayKiemTra === ngay &&
          item?.gioBatDau === gio &&
          item?.maChuongTrinh !== chuongTrinhDaoTao &&
          item?.public === true
            ? item.giangVien.filter((item) =>
                FilterLecturers.push(item.maVienChuc)
              )
            : ""
        );
        const arr = boundLecturers.filter(
          (item) => item?.ngayKiemTra === ngay && item?.gioBatDau === gio
        );
        let setArr = [...new Set(arr.map((item) => item.maVienChuc))];
        setArr = setArr.concat(FilterLecturers);

        setArr.concat(FilterLecturers);
        // eslint-disable-next-line array-callback-return
        const listArr = lecturers.filter((items) => {
          const arr = setArr.map((item) =>
            item === items.maVienChuc ? true : false
          );
          if (arr.find((item) => item === true)) {
          } else {
            return items;
          }
        });
        listArr.sort((a, b) => {
          let nameA = chuongTrinhDaoTao.toUpperCase();
          let nameB = b.maChuongTrinh.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        return (
          <Select
            filterSelectedOptions={true}
            style={{ width: "100%" }}
            value={params.value}
            onChange={(e) =>
              handleChanges(
                params.id,
                "hoTen1",
                e.target.value,
                params.row.ngayKiemTra,
                params.row.gioBatDau
              )
            }
          >
            {listArr.map((item) => (
              <MenuItem value={item.hoTen} key={item.hoTen}>
                {`${item.hoTen} - ${item.maChuongTrinh}`}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      editable: true,
      field: "maVienChuc1",
      headerName: "Mã viên chức CB01",
      width: 107,
    },
    {
      editable: true,
      field: "hoTen2",
      headerName: "Cán bộ coi kiểm tra 02(CB02)",
      width: 182,
      renderEditCell: (params) => {
        const ngay = params.row.ngayKiemTra;
        const gio = params.row.gioBatDau;

        const FilterLecturers = [];
        schudules.filter((item) =>
          item?.ngayKiemTra === ngay &&
          item?.gioBatDau === gio &&
          item?.maChuongTrinh !== chuongTrinhDaoTao &&
          item.public === true
            ? item.giangVien.filter((item) =>
                FilterLecturers.push(item.maVienChuc)
              )
            : ""
        );
        const arr = boundLecturers.filter(
          (item) => item?.ngayKiemTra === ngay && item?.gioBatDau === gio
        );
        let setArr = [...new Set(arr.map((item) => item.maVienChuc))];

        setArr.concat(FilterLecturers);
        // eslint-disable-next-line array-callback-return
        const listArr = lecturers.filter((items) => {
          const arr = setArr.map((item) =>
            item === items.maVienChuc ? true : false
          );
          if (arr.find((item) => item === true)) {
          } else {
            return items;
          }
        });
        listArr.sort((a, b) => {
          let nameA = chuongTrinhDaoTao.toUpperCase();
          let nameB = b.maChuongTrinh.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        return (
          <Select
            style={{ width: "100%" }}
            value={params.value}
            onChange={(e) =>
              handleChanges(
                params.id,
                "hoTen2",
                e.target.value,
                params.row.ngayKiemTra,
                params.row.gioBatDau
              )
            }
          >
            {listArr.map((item) => (
              <MenuItem value={item.hoTen} key={item.hoTen}>
                {`${item.hoTen} - ${item.maChuongTrinh}`}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      editable: true,
      field: "maVienChuc2",
      headerName: "Mã viên chức CB02",
      width: 107,
    },
    {
      editable: true,
      field: "maHp",
      headerName: "Mã học phần",
      width: 97,
    },
    {
      editable: true,
      field: "tenHp",
      headerName: "Tên học phần",
      width: 194,
      renderCell(params) {
        return (
          <div>
            <Tooltip title={params.value}>
              <span>{params.value}</span>
            </Tooltip>
          </div>
        );
      },
    },
    {
      editable: true,
      field: "nhomKT",
      headerName: "Nhóm kiểm tra",
      width: 200,
    },
    {
      editable: true,
      field: "toKiem",
      headerName: "Tổ kiểm",
      width: 130,
    },
    {
      editable: true,
      field: "soLuong",
      headerName: "Số lượng SV",
      width: 130,
    },
    {
      editable: true,
      field: "maPhong",
      headerName: "Teamcode/Phòng",
      width: 160,
    },
    {
      editable: true,
      field: "soPhutKiemTra",
      headerName: "Số phút kiểm tra",
      width: 180,
      type: "number",
    },
    {
      editable: true,
      field: "doViToChuc",
      headerName: "Đơn vị tổ chức",
      width: 200,
    },
    {
      editable: true,
      field: "chuongTrinh",
      headerName: "Chương trình/Bộ môn",
      width: 400,
    },
    {
      editable: true,
      field: "hinhThucKT",
      headerName: "Hình thức kiểm tra",
      width: 200,
    },
    {
      editable: true,
      field: "GVGD",
      headerName: "GVGD",
      width: 200,
    },
    {
      editable: true,
      field: "maGV",
      headerName: "MGV",
      width: 140,
    },
    {
      editable: true,
      field: "heDT",
      headerName: "Hệ đào tạo",
      width: 140,
    },
    {
      editable: true,
      field: "canBoCoiKiem3",
      headerName: "Cán bộ giám sát",
      width: 182,
    },
    {
      editable: true,
      field: "maCanBoCoiKiem3",
      headerName: "Mã cán bộ giám sát",
      width: 107,
    },
    {
      editable: true,
      field: "canBoDuBi",
      headerName: "Cán bộ dự bị",
      width: 182,
    },
    {
      editable: true,
      field: "maCanBoDuBi",
      headerName: "Mã cán bộ dự bị",
      width: 107,
    },
    {
      editable: true,
      field: "action",
      headerName: "Xóa",
      width: 50,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const defaultTheme = createTheme();
  const useStyles = makeStyles(
    (theme) => {
      const backgroundColor = theme.palette.mode === "dark" ? "red" : "white";
      return {
        root: {
          "& .MuiDataGrid-cell--editable": {
            backgroundColor,
          },
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

  if (loading && loading2)
    return (
      <div className="loading">
        <Loading />
      </div>
    );

  return (
    <div className="userList">
      <HeaderTableArrangeExamSchedule
        title="Bảng Sắp Xếp Lịch Thi"
        onClick={handleAutoMatic}
        data={ArrangeExamSchedules}
      />
      <DataGridPro
        initialState={{
          pinnedColumns: {
            left: ["ngayKiemTra", "gioBatDau"],
            right: ["action"],
          },
        }}
        density="compact"
        className={classes.root}
        getRowId={(row) => row?._id}
        rows={ArrangeExamSchedules}
        disableSelectionOnClick
        columns={columns}
        editMode="row"
        onEditRowsModelChange={handleEditRowsModelChange}
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
