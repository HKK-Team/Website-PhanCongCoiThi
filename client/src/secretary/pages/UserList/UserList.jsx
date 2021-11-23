import "./UserList.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../totalData";
import { Link } from "react-router-dom";
import { useState } from "react";
import HeaderTable from "./../../components/headerTable/headerTable";
import { Tooltip } from "@mui/material";

// Bảng Giảng Viên
export default function UserList() {
  const [data, setData] = useState(userRows);

  // xóa user khỏi bảng
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  // khởi tạo dữ liệu bảng
  const columns = [
    {
      field: "hoTen",
      headerName: "Họ Và Tên",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src="https://as2.ftcdn.net/v2/jpg/02/50/31/95/500_F_250319577_BuOE8gd49LUD41DFH6eY3mahs0Q6n8Jp.jpg"
              alt=""
            />
            {params.row.lastname} {params.row.firstname}
          </div>
        );
      },
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
            <Link to={"/lecturers/" + params.row.id}>
              <Tooltip title="Chỉnh sửa giảng viên" arrow>
                <button className="userListEdit">Chỉnh sửa</button>
              </Tooltip>
            </Link>
            <Tooltip title="Xóa giảng viên" arrow>
              <DeleteOutline
                className="userListDelete"
                onClick={() => handleDelete(params.row.id)}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <HeaderTable
        title="Bảng Giảng Viên"
        name="Thêm giảng viên"
        urlNew="/newlecturers"
      />
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
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
