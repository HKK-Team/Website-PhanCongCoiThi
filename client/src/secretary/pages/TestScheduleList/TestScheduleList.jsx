import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactExport from "react-export-excel";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSecretaryAccLogin } from "../../../redux/selectors";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import scheduleSlice, {
  getSchedulesApiAsync,
} from "../../sliceApi/SchedulesSlice/schedulesSlice";
import "./../../components/headerTable/headerTable.css";
import "./TestScheduleList.css";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// bảng lịch thi
export default function TestScheduleList() {
  const { loading } = useSelector((state) => state.Schedules.SchedulesApi);

  const secretaryAccount = useSelector(getSecretaryAccLogin);
  const maKhoa = secretaryAccount?.maKhoa;
  const chuongTrinhDaoTao = secretaryAccount?.chuongTrinhDaoTao;

  const setTenHocKy = useSelector(
    (state) =>
      new Set(
        state.Schedules.SchedulesApi.data.map((element) =>
          element.maKhoa === maKhoa &&
          element.maChuongTrinh === chuongTrinhDaoTao
            ? element.tenHocKi
            : "Không có lịch thi nào"
        )
      )
  );

  const keyTenHocKy = [...setTenHocKy];
  const [key, setkey] = useState(keyTenHocKy[0]);
  const data = useSelector((state) =>
    state.Schedules.SchedulesApi.data.filter(
      (e) => e.tenHocKi === state.Schedules.filters.tenHocKi
    )
  );

  const handleChange = (event) => {
    setkey(event.target.value);
    dispatch(scheduleSlice.actions.FilterTenHocKi(event.target.value));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchedulesApiAsync());
  }, [dispatch]);

  const handleDeleteLichThi = (key) => {
    if (window.confirm("Bạn thực sự muốn xóa không?")) {
      toastPromise(
        axios.delete(`http://localhost:5000/import/deleteAllLichThi/${key}`),
        () => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return "Xóa thành công !";
        }
      );
    }
  };

  // xóa hóa đơn khỏi bảng
  const handleDelete = (id) => {
    if (window.confirm("Bạn thực sự muốn xóa không?")) {
      toastPromise(
        axios.delete(`http://localhost:5000/import/deleteLichThi/${id}`),
        () => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return "Xóa thành công !";
        }
      );
    }
  };

  const isChecked = useSelector((state) =>
    state.Schedules.SchedulesApi.data.find((item) => item.tenHocKi === key)
  );
  const handleCheckBoxChange = (event) => {
    toastPromise(
      axios.put(
        `http://localhost:5000/import/publicLichThi/${key},${event.target.checked}`
      ),
      () => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return "Trạng thái lịch thi đã được cập nhật !";
      }
    );
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
            <Link to={"/HomeSecretary/testSchedule/" + params.id}>
              <button className="userListEdit">Chỉnh sửa</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
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

  if (loading) return <div className="loading">Loading...</div>;
  return (
    <div className="userList">
      <div className="header-table">
        <h1 className="header-table-title">Bảng Lịch Thi Đã Phân Công</h1>
        <div className="header-table-buttons">
          <FormControl style={{ marginRight: 10, width: 200 }} size="small">
            <InputLabel id="demo-simple-select-label">Chọn lịch thi</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="demo-simple-select"
              value={key}
              label="Chọn lịch thi"
              onChange={handleChange}
            >
              {keyTenHocKy.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tooltip title="Gửi mail thông báo tất cả giảng viên" arrow>
            <Button
              variant="contained"
              size="small"
              style={{ marginRight: 10 }}
            >
              Gửi mail thông báo tất cả
            </Button>
          </Tooltip>
          <Tooltip
            title="Gửi mail thông báo một vài giảng viên đã chỉnh sửa"
            arrow
          >
            <Button
              variant="contained"
              size="small"
              style={{ marginRight: 10 }}
            >
              Gửi mail thông báo một vài giảng viên
            </Button>
          </Tooltip>

          <ExcelFile
            filename={`PhânCôngLichThi_${key}`}
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
            <ExcelSheet data={data} name="Sheet1">
              <ExcelColumn label="Mã học phần" value="maHocPhan" />
              <ExcelColumn label="Tên học phần" value="tenHocPhan" />
              <ExcelColumn label="Nhóm kiểm tra" value="nhomKiemTra" />
              <ExcelColumn label="Tổ kiểm" value="toKiem" />
              <ExcelColumn label="Số lượng sinh viên" value="soLuongSinhVien" />
              <ExcelColumn
                label="Đơn vị tổ chức kiểm tra"
                value="donViToChucKiemTra"
              />
              <ExcelColumn
                label="Chương trình/Bộ môn"
                value="chuongTrinhBoMon"
              />
              <ExcelColumn label="Ngày kiểm tra" value="ngayKiemTra" />
              <ExcelColumn label="Giờ bắt đầu" value="gioBatDau" />
              <ExcelColumn label="Teamcode/Phòng" value="maPhong" />
              <ExcelColumn label="Số phút kiểm tra" value="soPhutKiemTra" />
              <ExcelColumn
                label="Cán bộ coi kiểm tra 01(CB01)"
                value={(item) => item.giangVien[0]?.hoTen}
              />
              <ExcelColumn
                label="Mã viên chức CB01"
                value={(item) => item.giangVien[0]?.maVienChuc}
              />
              <ExcelColumn
                label="Cán bộ coi kiểm tra 02(CB02)"
                value={(item) => item.giangVien[1]?.hoTen}
              />
              <ExcelColumn
                label="Mã viên chức CB02"
                value={(item) => item.giangVien[1]?.maVienChuc}
              />
              <ExcelColumn label="GVGD" value="GVGD" />
              <ExcelColumn label="MGV" value="maGV" />
              <ExcelColumn label="Hệ đào tạo" value="heDaoTao" />
            </ExcelSheet>
          </ExcelFile>
          {/* export Excel */}

          <Tooltip title="xóa lịch thi này" arrow>
            <Button
              variant="contained"
              color="error"
              size="small"
              style={{ marginRight: 10 }}
              onClick={() => handleDeleteLichThi(key)}
            >
              Xóa lịch thi này
            </Button>
          </Tooltip>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  style={{ color: "green" }}
                  onChange={handleCheckBoxChange}
                  checked={isChecked?.public || false}
                />
              }
              label="Cho phép mọi người xem lịch thi này"
            />
          </FormGroup>
          <p className="header-table-ps">
            P/s: Mọi người sẽ không thể xem được lịch thi nếu bạn không cho phép
          </p>
          <p className="header-table-ps">
            P/s: Hãy kiểm tra thật kỹ tất cả thông tin trước khi gửi mail
          </p>
          <p className="header-table-ps">
            P/s: Hãy click vào select box để chọn giảng viên cần gửi mail, trong
            trường hợp muốn gửi số ít
          </p>
        </div>
      </div>
      <DataGrid
        className={classes.root}
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
