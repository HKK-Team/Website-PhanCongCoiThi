
import Publish from '@mui/icons-material/Publish';
import PermIdentity from '@mui/icons-material/PermIdentity';
import MailOutline from '@mui/icons-material/MailOutline';
import { Tooltip } from "@mui/material";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../../globalState";
import { useForm } from "react-hook-form";
import "./User.css";
import axios from "axios";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";

// chỉnh sửa thông tin khách hàng
export default function Lecturers() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await toastPromise(
      axios.put("http://localhost:5000/import/editGiangVien", {
        ...data,
        params,
      }),
      () => {
        setTimeout(() => {
          window.location.href = "/lecturers";
        }, 1000);
        return "Cập Nhật Thành Công";
      }
    );
  };

  const params = useParams();

  const state = useContext(GlobalState);

  const [lecturers] = state.getLecturersApi.getLecturers;

  const [data] = lecturers.filter((item) => item._id === params.lecturersId);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chỉnh sửa thông tin giảng viên</h1>
        <Link to="/newlecturers">
          <button className="userAddButton">Thêm giảng viên</button>
        </Link>
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
              <span className="userShowUsername">{data?.hoTen}</span>
              <span className="userShowUserTitle">{data?.maKhoa}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Chi tiết liên hệ</span>

            <div className="userShowInfo">
              <Tooltip title="Mã viên chức" arrow>
                <PermIdentity className="userShowIcon" />
              </Tooltip>
              <Tooltip title="Mã viên chức" arrow>
                <span className="userShowInfoTitle">{data?.maVienChuc}</span>
              </Tooltip>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{data?.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Họ và Tên</label>
                <input
                  type="text"
                  placeholder={data?.hoTen}
                  className="userUpdateInput"
                  {...register("hoTen", { required: true, maxLength: 80 })}
                />
                <p style={{ fontSize: 12, color: "red" }}>
                  {errors.hoTen?.type === "required" && "Vui lòng nhập họ tên"}
                </p>
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={data?.email}
                  className="userUpdateInput"
                  {...register("Email", {
                    required: true,
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email không hợp lệ",
                    },
                  })}
                />
                <p style={{ fontSize: 12, color: "red" }}>
                  {(errors.Email?.type === "required" &&
                    "Vui lòng nhập email") ||
                    errors.Email?.message}
                </p>
              </div>
              <div className="userUpdateItem">
                <label>Mã viên chức</label>
                <input
                  type="text"
                  placeholder={data?.maVienChuc}
                  className="userUpdateInput"
                  {...register("maVienChuc", { required: true, maxLength: 80 })}
                />
                <p style={{ fontSize: 12, color: "red" }}>
                  {errors.maVienChuc?.type === "required" &&
                    "Vui lòng điền mã viên chức"}
                </p>
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
