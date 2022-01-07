import { makeStyles } from "@material-ui/styles";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { createTheme } from "@mui/material/styles";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { getSecretaryAccLogin } from "../../../redux/selectors";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import Loading from "../../../utils/loading/Loading";
import HeaderTable from "../../components/headerTable/headerTable";
import formMH from "./../../../ExcelForm/BIEUMAUMONTHI_HC.xlsx";
import "./SubjectsList.css";

export function ExcelDateToJSDate(serial) {
  let utc_days = Math.floor(serial - 25569);
  let utc_value = utc_days * 86400;
  let date_info = new Date(utc_value * 1000);

  // date formats yyyy/mm/dd
  const date = new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate() + 1
  );
  return date;
}

export default function SubjectsList() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.Subjects.SubjectsApi);
  const [monthi, setMonthi] = useState([]);

  const secretaryAccount = useSelector(getSecretaryAccLogin);
  const maKhoa = secretaryAccount?.maKhoa;
  const chuongTrinhDaoTao = secretaryAccount?.chuongTrinhDaoTao;

  const data = useSelector((state) =>
    state.Subjects.SubjectsApi.data.filter(
      (item) =>
        item.maKhoa === maKhoa && item.maChuongTrinh === chuongTrinhDaoTao
    )
  );

  const readExcelMonThi = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[1];

        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, {
          raw: true,
          defval: "",
        });
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      d.forEach((item) => {
        item.ngayKiemTra = ExcelDateToJSDate(item.ngayKiemTra);
      });
      console.log(d);
      d.shift();
      d.maKhoa = maKhoa;
      d.maChuongTrinh = chuongTrinhDaoTao;
      d.forEach((item) => {
        item.soLuong -= 0;
        item.soPhutKiemTra -= 0;
      });
      setMonthi(d);
      ImportMonThi();
    });
  };

  const ImportMonThi = () => {
    toastPromise(
      axios.post("http://localhost:5000/import/monthi", {
        ...monthi,
      }),
      (data) => {
        setTimeout(() => {
          navigate("/HomeSecretary/subjects");
        }, 1000);
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
            navigate("/HomeSecretary/subjects");
          }, 1000);
          return "Xóa thành công !";
        }
      );
    }
  };

  const columns = [
    { field: "maHp", headerName: "Mã học phần", width: 140 },
    { field: "tenHp", headerName: "Tên Học Phần", width: 200 },
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
      field: "hinhThucKT",
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
      field: "heDT",
      headerName: "Hệ đào tạo",
      width: 150,
    },
    {
      field: "canBoCoiKiem3",
      headerName: "Cán bộ giám sát",
      width: 200,
    },
    {
      field: "maCanBoCoiKiem3",
      headerName: "Mã VC giám sát",
      width: 180,
    },
    {
      field: "canBoDuBi",
      headerName: "Cán bộ dự bị",
      width: 200,
    },
    {
      field: "maCanBoDuBi",
      headerName: "Mã VC dự bị",
      width: 180,
    },

    {
      field: "action",
      headerName: "Action",
      width: 130,
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
    <div className="productList">
      <HeaderTable
        title="Bảng Môn Thi"
        name="Thêm môn thi"
        urlNew="/HomeSecretary/newSubjects"
        form={formMH}
        onChange={(e) => readExcelMonThi(e.target.files[0])}
      />
      <DataGridPro
        className={classes.root}
        getRowId={(row) => row._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        initialState={{
          pinnedColumns: { left: ["maHp", "tenHp"], right: ["action"] },
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
