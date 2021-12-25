import "./LecturersList.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import HeaderTable from "../../components/headerTable/headerTable";
import { Tooltip } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import formGV from "./../../../ExcelForm/BIEUMAUGV_HC.xlsx";
import * as XLSX from "xlsx";
import axios from "axios";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import { useDispatch, useSelector } from "react-redux";
import { getLecturersApiAsync } from "../../sliceApi/LecturersSlice/lecturersSlice";
import { useEffect, useState } from "react";
import { getSubjectsApiAsync } from "../../sliceApi/SubjectsSlice/subjectsSlice";

// Bảng Giảng Viên
export default function LecturersList() {
  const { data, loading } = useSelector(
    (state) => state.Lecturers.LecturersApi
  );
  const [giangvien, setgiangvien] = useState([]);
  const [maKhoa, setMakhoa] = useState("KTPM");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLecturersApiAsync());
  }, [dispatch]);

  // read excel import from giangvien
  const readExcelGiangVien = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { raw: true, defval: null });
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      d.shift();
      d.maKhoa = maKhoa;
      setgiangvien(d);
      ImportGiangVien();
    });
  };

  const ImportGiangVien = async () => {
    await toastPromise(
      axios.post("http://localhost:5000/import/giangvien", {
        ...giangvien,
      }),
      (data) => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return (
          JSON.stringify(data?.data?.response?.data?.msg) ||
          "Bạn đã nhập dữ liệu giảng viên thành công"
        );
      }
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn thực sự muốn xóa không?")) {
      toastPromise(
        axios.delete(`http://localhost:5000/import/deleteGiangVien/${id}`),
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
    {
      field: "hoTen",
      headerName: "Họ Và Tên",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "maVienChuc",
      headerName: "Mã viên chức",
      width: 260,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/HomeSecretary/lecturers/" + params.id}>
              <Tooltip title="Chỉnh sửa giảng viên" arrow>
                <button className="userListEdit">Chỉnh sửa</button>
              </Tooltip>
            </Link>
            <Tooltip title="Xóa giảng viên" arrow>
              <DeleteOutline
                className="userListDelete"
                onClick={() => handleDelete(params.id)}
              />
            </Tooltip>
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
      <HeaderTable
        title="Bảng Giảng Viên"
        name="Thêm giảng viên"
        urlNew="/HomeSecretary/newlecturers"
        form={formGV}
        onChange={(e) => readExcelGiangVien(e.target.files[0])}
      />
      <DataGrid
        className={classes.root}
        getRowId={(row) => row._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        // pageSize={10}
        // checkboxSelection
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
