import "./ProductList.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import GetData, { getdata } from "../../totalData";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import HeaderTable from "../../components/headerTable/headerTable";
import formMH from "./../../../ExcelForm/BIEUMAUMONTHI_HC.xlsx";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import axios from "axios";
import * as XLSX from "xlsx";
import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import { GlobalState } from "../../../globalState";
export default function SubjectsList() {
  const state = useContext(GlobalState);
  let maKhoa = "";
  if (state?.secretaryApi?.secretary[0].length === 0) {
    maKhoa = " ";
  } else {
    maKhoa = state?.secretaryApi?.secretary[0]?.user[0]?.maKhoa;
  }
  GetData();
  const [data] = useState(getdata.getSubjectApi);
  const [monthi, setMonthi] = useState([]);
  const readExcelMonThi = (file) => {
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
      setMonthi(d);
      ImportMonThi();
    });
  };

  const ImportMonThi = async () => {
    await toastPromise(
      axios.post("http://localhost:5000/import/monthi", {
        ...monthi,
      }),
      (data) => {
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
        return (
          JSON.stringify(data?.data?.response?.data?.msg) ||
          "Bạn đã nhập dữ liệu môn thi thành công"
        );
      }
    );
  };
  const handleDelete = (id) => {
    if (window.confirm("Bạn thực sự muốn xóa không?")) {
      toastPromise(
        axios.delete(`http://localhost:5000/import/deleteMonThi/${id}`),
        () => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return "Xóa thành công !";
        }
      );
    }
  };
  const columns = [
    { field: "maHp", headerName: "Mã học phần", width: 170 },
    { field: "tenHp", headerName: "Tên Học Phần", width: 400 },
    {
      field: "nhomKT",
      headerName: "Nhóm kiểm tra",
      width: 200,
    },
    { field: "toKiem", headerName: "Tổ kiểm", width: 130 },
    {
      field: "soLuong",
      headerName: "Số lượng SV",
      width: 150,
    },
    {
      field: "doViToChuc",
      headerName: "Đơn vị tổ chức kiểm tra",
      width: 250,
    },
    {
      field: "chuongTrinh",
      headerName: "Chương trình/Bộ môn",
      width: 300,
    },
    {
      field: "hinhThucKT",
      headerName: "Hình thức kiểm tra",
      width: 200,
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
      field: "heDT",
      headerName: "Hệ đào tạo",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/HomeSecretary/subjects/" + params.id}>
              <button className="productListEdit">Chỉnh sửa</button>
            </Link>
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
            color:'#1976d2',
            fontWeight: "700",
          },
          "& .MuiSvgIcon-root": {
            color:'#1976d2',
            fontWeight: "700",
          },
        },
      };
    },
    { defaultTheme }
  );
  const classes = useStyles();
  return (
    <div className="productList">
      <HeaderTable
        title="Bảng Môn Học"
        name="Thêm môn học"
        urlNew="/HomeSecretary/newSubjects"
        form={formMH}
        onChange={(e) => readExcelMonThi(e.target.files[0])}
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
