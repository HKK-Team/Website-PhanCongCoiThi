import Publish from "@mui/icons-material/Publish";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import { useContext, useState } from "react";
import { GlobalState } from "../../../globalState";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import axios from "axios";
// chỉnh sửa thông tin khách hàng
export default function ProfileSecretary() {
  const state = useContext(GlobalState);
  const users = state.secretaryApi.secretary;
  const Name = users[0].map((item) => item.hoTen);
  const Phone = users[0].map((item) => item.soDienThoai);
  const id = users[0].map((item) => item._id);
  const [profile, setProfile] = useState({
    _id: id[0],
    email: window.sessionStorage.getItem("SecretaryEmail"),
    hoTen: Name[0],
    soDienThoai: Phone[0],
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const EditUserSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/secretary/edituser", { ...profile });
    alert("Update User Succesfully!");
    window.location.href = "/HomeSecretary";
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Thông tin thứ ký</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://as2.ftcdn.net/v2/jpg/02/50/31/95/500_F_250319577_BuOE8gd49LUD41DFH6eY3mahs0Q6n8Jp.jpg"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {users[0].map((item) => item.hoTen)}
              </span>
              <span className="userShowUserTitle">
                {users[0].map((item) => item.maKhoa)}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Chi tiết liên hệ</span>

            <div className="userShowInfo">
              <PermIdentity
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">
                {users[0].map((item) => item.email)}
              </span>
            </div>
            <div className="userShowInfo">
              <LocalPhoneIcon
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">
                Phone Number : {users[0].map((item) => item.soDienThoai)}
              </span>
            </div>
            <div className="userShowInfo">
              <MailOutline
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">{users[0].map((item) => item.chuongTrinhDaoTao)}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm" onSubmit={EditUserSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Họ và Tên</label>
                <input
                  type="text"
                  placeholder={users[0].map((item) => item.hoTen)}
                  name="hoTen"
                  value={profile.hoTen}
                  className="userUpdateInput"
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={users[0].map((item) => item.email)}
                  value={profile.email}
                  className="userUpdateInput"
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  placeholder={users[0].map((item) => item.soDienThoai)}
                  name="soDienThoai"
                  value={profile.soDienThoai}
                  className="userUpdateInput"
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://as2.ftcdn.net/v2/jpg/02/50/31/95/500_F_250319577_BuOE8gd49LUD41DFH6eY3mahs0Q6n8Jp.jpg"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
