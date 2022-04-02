import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentity from "@mui/icons-material/MailOutline";
import MailOutline from "@mui/icons-material/PermIdentity";
import Publish from "@mui/icons-material/Publish";
import { Box, Button, Input, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  sendMailOtpcode,
  conFirmOtpCode,
  sendMailContextConfirmEmail,
} from "../../../api/mailService";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
// chỉnh sửa thông tin Thư ký
export default function ProfileSecretary() {
  const navigate = useNavigate();
  const data = useSelector(
    (state) => state.SecretaryAccount.secretaryAccountApi.data[0]
  );

  const [profile, setProfile] = useState({
    _id: data?._id,
    email: data?.email,
    hoTen: data?.hoTen,
    soDienThoai: data?.soDienThoai,
  });
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [open, setOpen] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const errMessage = useRef();
  const handleClose = () => {
    if (window.confirm("Bạn có chắc chắn muốn thoát không?")) {
      setOpen(false);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    if (data.email === value && name === "email") {
      setIsChangeEmail(false);
    } else if (data.email !== value && name === "email") {
      setIsChangeEmail(true);
    }

    setProfile({ ...profile, [name]: value });
  };

  const EditUserSubmit = async (e) => {
    e.preventDefault();
    if (isChangeEmail) {
      sendMailOtpcode(profile.email);
      setOpen(true);
    } else {
      toastPromise(
        axios.post("http://localhost:5000/secretary/edituser", { ...profile }),
        () => {
          setTimeout(() => {
            navigate("/HomeSecretary");
          }, 1000);
          return "Thông tin người dùng đã được cập nhật !";
        }
      );
    }
  };

  const conFirmOtp = (e) => {
    e.preventDefault();
    conFirmOtpCode(otpCode).then((value) => {
      if (value.data) {
        toastPromise(
          axios.post("http://localhost:5000/secretary/edituser", {
            ...profile,
          }),
          () => {
            setTimeout(() => {
              navigate("/HomeSecretary");
            }, 1000);
            sendMailContextConfirmEmail(profile.email);
            return "Thông tin người dùng đã được cập nhật !";
          }
        );
      } else {
        console.log(errMessage.current);
        errMessage.current.innerHTML = "Mã OTP không đúng !. Vui lòng xem lại";
      }
    });
  };

  const ariaLabel = { "aria-label": "description" };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="user">
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
            style={{ textAlign: "center" }}
          >
            Xác nhận email
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ textAlign: "center" }}
          >
            <Input
              placeholder="OTP code"
              inputProps={ariaLabel}
              onChange={(e) => {
                setOtpCode(e.target.value);
              }}
            />
            <Box style={{ marginTop: 10 }}>
              <Button variant="contained" size="small" onClick={conFirmOtp}>
                Xác nhận
              </Button>
            </Box>
            <Box style={{ marginTop: 5 }}>
              <Typography
                id="modal-modal-title"
                variant="p"
                fontSize={12}
                style={{ textAlign: "center" }}
                ref={errMessage}
              >
                Một mã xác thực đã được gửi tới email của bạn.
              </Typography>
            </Box>
          </Typography>
        </Box>
      </Modal>

      <div className="userTitleContainer">
        <h1 className="userTitle">Thông tin thứ ký</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data?.hoTen}</span>
              <span className="userShowUserTitle">{data?.maKhoa}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Chi tiết liên hệ</span>

            <div className="userShowInfo">
              <PermIdentity
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">{data?.email}</span>
            </div>
            <div className="userShowInfo">
              <LocalPhoneIcon
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">{data?.soDienThoai}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
              <span className="userShowInfoTitle">
                {data?.chuongTrinhDaoTao}
              </span>
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
                  placeholder={data?.hoTen}
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
                  placeholder={data?.email}
                  value={profile.email}
                  className="userUpdateInput"
                  onChange={onChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  placeholder={data?.soDienThoai}
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
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
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


