import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { getdata } from "../../totalData";
import { useCallback, useContext, useEffect, useState } from "react";
import { HeaderTableArrangeExamSchedule } from "../../components/headerTable/headerTable";
import GetData from "./../../totalData.js";
import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import { usePrompt } from "react-router-dom";
import { GlobalState } from "../../../globalState";
let today = new Date();
let date =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
// object khởi tạo ngày giờ coi thi
let d = {
  ngayKiemTra: date,
  gioBatDau: "08:00",
  maPhong: "",
  soPhutKiemTra: 60,
};
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
export default function ArrangeExamSchedule() {
  const state = useContext(GlobalState);

  let maKhoa = "";
  if (state?.secretaryApi?.secretary[0].length === 0) {
    maKhoa = " ";
  } else {
    maKhoa = state?.secretaryApi?.secretary[0]?.user[0]?.maKhoa;
  }
  GetData();
  let a = [...getdata.getSubjectApi]; // khoi tao mang chua mon hoc
  let b = [...getdata.getLecturersApi]; // khoi tao mang chua giang vien
  const length = Math.round(a.length / b.length);
  //xử lý khi giảng viên ít hơn môn học
  for (let key = 0; key < length; key++) {
    if (length === 1) {
      break;
    } else {
      b = b.concat(getdata.getLecturersApi);
    }
  }
  const [c, setC] = useState([]); // mảng gộp dữ liệu của giảng viên và môn học
  const [checkOut, setCheckOut] = useState(false); // check xem có thay đổi khi edit

  // tự động sắp xếp lịch
  function handleAutoMatic(e) {
    if (checkOut === true) {
      if (window.confirm("Bạn có chắc chắn muốn tạo lại lịch thi không?")) {
        shuffle(a);
        shuffle(b);
        if (c.length === a.length) {
          setC([]);
          for (let key = 0; key < a.length; key++) {
            setC((prev) => [...prev, [a[key], b[key], b[key + 1], d]]);
          }
        } else {
          for (let key = 0; key < a.length; key++) {
            setC((prev) => [...prev, [a[key], b[key], b[key + 1], d]]);
          }
        }
      }
    } else {
      shuffle(a);
      shuffle(b);
      if (c.length === a.length) {
        setC([]);
        for (let key = 0; key < a.length; key++) {
          setC((prev) => [...prev, [a[key], b[key], b[key + 1], d]]);
        }
      } else {
        for (let key = 0; key < a.length; key++) {
          setC((prev) => [...prev, [a[key], b[key], b[key + 1], d]]);
        }
      }
      setCheckOut(true);
    }
  }

  let data = []; // khởi tạo mảng data
  // thêm dữ liệu vào data
  c.forEach((item) => {
    let dsGiangVien = {
      hoTen1: item[1]?.hoTen,
      maVienChuc1: item[1]?.maVienChuc,
      email1: item[1]?.email,
      maKhoa1: maKhoa,
      hoTen2: item[2]?.hoTen,
      maVienChuc2: item[2]?.maVienChuc,
      email2: item[2]?.email,
      maKhoa2: maKhoa,
    };
    // setData((prev) => [...prev,{...item[0],...dsGiangVien,...item[3]}]);
    data.push({ ...item[0], ...dsGiangVien, ...item[3] });
  });
  // lưu lại thay đổi trong data
  const handleEditRowsModelChange = useCallback(
    (model) => {
      let object = Object.values(model);
      let objectKey = Object.keys(model);
      data.forEach((item) => {
        if (item._id === objectKey[0]) {
          item.GVGD = object[0].GVGD.value;
          item.chuongTrinh = object[0].chuongTrinh.value;
          item.doViToChuc = object[0].doViToChuc.value;
          item.gioBatDau = object[0].gioBatDau.value;
          item.heDT = object[0].heDT.value;
          item.hinhThucKT = object[0].hinhThucKT.value;
          item.hoTen1 = object[0].hoTen1.value;
          item.hoTen2 = object[0].hoTen2.value;
          item.maGV = object[0].maGV.value;
          item.maHp = object[0].maHp.value;
          item.maPhong = object[0].maPhong.value;
          item.maVienChuc1 = object[0].maVienChuc1.value;
          item.maVienChuc2 = object[0].maVienChuc2.value;
          item.ngayKiemTra = object[0].ngayKiemTra.value;
          item.nhomKT = object[0].nhomKT.value;
          item.soLuong = object[0].soLuong.value;
          item.soPhutKiemTra = object[0].soPhutKiemTra.value;
          item.tenHp = object[0].tenHp.value;
          item.toKiem = object[0].toKiem.value;
          item.maKhoa = maKhoa;
        }
      });
    },
    [data]
  );
  // ngăn chặn rời đi khi chưa lưu
  useEffect(() => {
    if (checkOut) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
  }, [checkOut]);
  usePrompt(
    "Bạn có các thay đổi chưa được lưu, bạn có chắc chắn muốn thoát không?",
    checkOut
  );
  // xóa dữ liệu
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      const index = data.findIndex((x) => x._id === id);
      let ob = [...data];
      ob.splice(`${index}`, 1);
      data = ob;
    }
  };
  // khởi tạo dữ liệu bảng
  const columns = [
    {
      editable: true,
      field: "ngayKiemTra",
      headerName: "Ngày kiểm tra",
      width: 150,
      type: "date",
    },
    {
      editable: true,
      field: "gioBatDau",
      headerName: "Giờ bắt đầu",
      width: 150,
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
      field: "hoTen1",
      headerName: "Cán bộ coi kiểm tra 01(CB01)",
      width: 230,
    },
    {
      editable: true,
      field: "maVienChuc1",
      headerName: "Mã viên chức CB01",
      width: 200,
    },
    {
      editable: true,
      field: "hoTen2",
      headerName: "Cán bộ coi kiểm tra 02(CB02)",
      width: 230,
    },
    {
      editable: true,
      field: "maVienChuc2",
      headerName: "Mã viên chức CB02",
      width: 200,
    },
    {
      editable: true,
      field: "maHp",
      headerName: "Mã học phần",
      width: 170,
    },
    {
      editable: true,
      field: "tenHp",
      headerName: "Tên học phần",
      width: 400,
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
      field: "action",
      headerName: "Action",
      width: 150,
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
      const backgroundColor =
        theme.palette.mode === "dark" ? "#376331" : "rgb(217 243 190)";
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
  return (
    <div className="userList">
      <HeaderTableArrangeExamSchedule
        title="Bảng Sắp Xếp Lịch Thi"
        onClick={handleAutoMatic}
        data={data}
      />

      <DataGrid
        className={classes.root}
        getRowId={(row) => row?._id}
        rows={data}
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
