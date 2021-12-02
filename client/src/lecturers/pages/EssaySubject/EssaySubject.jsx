import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useContext } from "react";
import { GlobalState } from "../../../globalState";
export default function EssaySubject() {
  const [data] = useState([]);
  const state = useContext(GlobalState);
  // const [isLogged] = state.lecturerApi.isLogin;
  console.log(state.lecturerApi);
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
  ];

  return (
    <div className="userList">
      <h2>Bảng đăng ký môn tiểu luận</h2>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
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
