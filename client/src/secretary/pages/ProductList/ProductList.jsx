import "./ProductList.css";
import {  DataGrid, GridToolbar } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../totalData";
import { Link } from "react-router-dom";
import { useState } from "react";
import HeaderTable from "../../components/headerTable/headerTable";

export default function ProductList() {
  const [data, setData] = useState(productRows);

//Xóa sản phẩm
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
// khởi tạo dữ liệu sản phẩm dạng cột
  const columns = [
    { field: "maHocPhan", headerName: "Mã học phần", width: 170 },
    { field: "tenHocPhan", headerName: "Tên Học Phần", width: 165 },
    {
      field: "nhomKiemTra",
      headerName: "Nhóm kiểm tra",
      width: 200,
    },
    { field: "toKiem", headerName: "Tổ kiểm", width: 170 },
    {
      field: "soLuongSinhVien",
      headerName: "Số lượng",
      width: 150,
    },
    {
      field: "doViToChuc",
      headerName: "Đơn vị tổ chức kiểm tra" ,
      width: 180,
    },
    {
      field: "soLuongSinhVien",
      headerName: "Số lượng SV",
      width: 170,
    },
    {
      field: "chuongTrinhBoMon",
      headerName: "Chương trình/Bộ môn",
      width: 240,
    },
    {
      field: "hinhThucKiemTra",
      headerName: "Hình thức kiểm tra",
      width: 240,
    },
    {
      field: "GVGD",
      headerName: "GVGD",
      width: 200,
    },
    {
      field: "maGV",
      headerName: "MGV",
      width: 140,
    },
    {
      field: "heDaoTao",
      headerName: "Hệ đào tạo",
      width: 140,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/subjects/" + params.row.id}>
              <button className="productListEdit">Chỉnh sửa</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
       <HeaderTable title="Bảng Môn Học" name="Thêm môn học" urlNew="/newSubjects"/>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection

        localeText={{
          toolbarDensity: 'Size',
          toolbarDensityLabel: 'Size',
          toolbarDensityCompact: 'Small',
          toolbarDensityStandard: 'Medium',
          toolbarDensityComfortable: 'Large',
        }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}