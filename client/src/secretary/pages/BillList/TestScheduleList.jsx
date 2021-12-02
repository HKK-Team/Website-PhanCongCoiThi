import "./TestScheduleList.css";
import "./../../components/headerTable/headerTable.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import GetData, { getdata } from "../../totalData";
import { Link } from "react-router-dom";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import axios from "axios";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// bảng lịch thi
export default function TestScheduleList() {
  GetData();
  const [data] = useState(getdata.getSchedulesApi);
  const tenHocKy = [];
  data.forEach((item) => tenHocKy.push(item.tenHocKi));
  const setTenHocKy = new Set(tenHocKy);
  const keyTenHocKy = [...setTenHocKy];
  const [key, setkey] = useState(keyTenHocKy[0]);
  const handleChange = (event) => {
    setkey(event.target.value);
  };
  const dataTenHocKy = [];
  data.forEach((item) => {
    if (item.tenHocKi === key) dataTenHocKy.push(item);
  });
  console.log(dataTenHocKy);
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
            <ExcelSheet data={dataTenHocKy} name="Sheet1">
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
        getRowId={(row) => row._id}
        rows={dataTenHocKy}
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
