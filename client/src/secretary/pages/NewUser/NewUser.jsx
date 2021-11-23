import "./NewUser.css";

// tạo mới người dùng
export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm Giảng Viên</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Họ Và Tên</label>
          <input type="text" placeholder="Đoàn Minh khánh" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="Khanhdoan693@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Mã viên chức</label>
          <input type="text" placeholder="123456" />
        </div>
        <button className="newUserButton">Tạo</button>
      </form>
    </div>
  );
}