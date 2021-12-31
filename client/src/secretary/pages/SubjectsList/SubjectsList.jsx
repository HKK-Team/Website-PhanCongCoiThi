import { makeStyles } from "@material-ui/styles";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { Button, Modal, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { getSecretaryAccLogin } from "../../../redux/selectors";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import HeaderTable from "../../components/headerTable/headerTable";
import formMH from "./../../../ExcelForm/BIEUMAUMONTHI_HC.xlsx";
import "./SubjectsList.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "White",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SubjectsList() {
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
          raw: false,
          defval: "",
        });

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
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

  const ImportMonThi = async () => {
    await toastPromise(
      axios.post("http://localhost:5000/import/monthi", {
        ...monthi,
      }),
      (data) => {
        setTimeout(() => {
          window.location.reload();
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
            window.location.reload();
          }, 1000);
          return "Xóa thành công !";
        }
      );
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      headerName: "Cán bộ coi kiểm tra 03",
      width: 200,
    },
    {
      field: "maCanBoCoiKiem3",
      headerName: "Mã viên chức CB03",
      width: 180,
    },
    {
      field: "ghiChu",
      headerName: "ghi chú",
      width: 140,
      renderCell: (params) => {
        if (params.value !== "" && params.id === params.row._id)
          return (
            <>
              <Button
                variant="contained"
                style={{ color: "white" }}
                onClick={handleOpen}
              >
                Mở
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Ghi chú
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {params.value}
                  </Typography>
                </Box>
              </Modal>
            </>
          );
      },
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
  if (loading) return <div className="loading">Loading...</div>;

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
        // autoHeight
        rows={data}
        disableSelectionOnClick
        columns={columns}
        initialState={{
          pinnedColumns: { left: ["maHp", "tenHp"], right: ["action"] },
        }}
        density="compact"
        scrollbarSize={10}
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
