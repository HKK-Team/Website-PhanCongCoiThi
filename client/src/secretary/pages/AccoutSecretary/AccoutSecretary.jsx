import Button from '@mui/material/Button';

export default function AccountSecretary() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Thông tin tài khoản</h1>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Mật khẩu cũ</label>
                <input type="password" className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>Mật khẩu mới</label>
                <input type="password" className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>Nhập lại mật khẩu</label>
                <input type="password" className="userUpdateInput" />
              </div>
              <div className="userUpdateItem" style={{paddingTop:10 }}>
              <Button variant="contained" color="success">Xác nhận</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
