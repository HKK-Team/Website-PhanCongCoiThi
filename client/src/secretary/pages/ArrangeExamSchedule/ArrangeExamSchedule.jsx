import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { billRows } from "../../totalData";
import { useCallback, useState } from "react";
import { HeaderTableArrangeExamSchedule } from "../../components/headerTable/headerTable";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";

export default function ArrangeExamSchedule() {
  const [data, setData] = useState(billRows);
  const [editRowsModel, setEditRowsModel] = useState({});
  const handleEditRowsModelChange = useCallback((model) => {
    setEditRowsModel(model);
  }, []);

  // xóa hóa đơn khỏi bảng
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  // khởi tạo dữ liệu bảng
  const columns = [
    { field: "ngayKiemTra", headerName: "Ngày kiểm tra", width: 200 },
    { field: "gioBatDau", headerName: "Giờ bắt đầu", width: 200 },
    { field: "maPhong", headerName: "Teamcode/Phòng", width: 200 },
    { field: "soPhutKiemTra", headerName: "Số phút kiểm tra", width: 200 },
    {
      field: "giangVien[0].hoTen",
      headerName: "Cán bộ coi kiểm tra 01(CB01)",
      width: 230,
      renderCell: (params) => {
        return params.hoTen;
      },
    },
    {
      field: "giangVien[0].maVienChuc",
      headerName: "Mã viên chức CB01",
      width: 200,
      renderCell: (params) => {
        return params.maVienChuc;
      },
    },
    {
      field: "giangVien[1].hoTen",
      headerName: "Cán bộ coi kiểm tra 02(CB02)",
      width: 230,
      renderCell: (params) => {
        return params.hoTen;
      },
    },
    {
      field: "giangVien[1].maVienChuc",
      headerName: "Mã viên chức CB02",
      width: 200,
      renderCell: (params) => {
        return params.maVienChuc;
      },
    },
    { field: "maHocPhan", headerName: "Mã học phần", width: 200 },
    { field: "tenHocPhan", headerName: "Tên học phần", width: 200 },
    { field: "nhomKiemTra", headerName: "Nhóm kiểm tra", width: 200 },
    {
      field: "chuongTrinhBoMon",
      headerName: "Chương trình/Bộ môn",
      width: 200,
    },
    { field: "hinhThucKiemTra", headerName: "Hình thức kiểm tra", width: 200 },
    { field: "GVGD", headerName: "GVGD", width: 200 },
    { field: "maGV", headerName: "MGV", width: 200 },
    { field: "heDaoTao", headerName: "Hệ đào tạo", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/ArrangeExamSchedule/" + params.row.id}>
              <button className="userListEdit">Chỉnh sửa</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <HeaderTableArrangeExamSchedule title="Bảng Sắp Xếp Lịch Thi" />
      <DataGrid
        pagination
        rows={data}
        disableSelectionOnClick
        columns={columns}
        editRowsModel={editRowsModel}
        editMode="row"
        onEditRowsModelChange={handleEditRowsModelChange}
        pageSize={10}
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
      <Alert severity="info" style={{ marginTop: 8 }}>
        <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
      </Alert>
    </div>
  );
}
