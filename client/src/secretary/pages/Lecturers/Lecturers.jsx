import MailOutline from "@mui/icons-material/MailOutline";
import PermIdentity from "@mui/icons-material/PermIdentity";
import Publish from "@mui/icons-material/Publish";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useParams ,useNavigate} from "react-router-dom";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import "./Lecturers.css";

// chỉnh sửa thông tin khách hàng
export default function Lecturers() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.maVienChuc = data.maVienChuc.toUpperCase();
    await toastPromise(
      axios.put("http://localhost:5000/import/editGiangVien", {
        ...data,
        params,
      }),
      () => {
        setTimeout(() => {
          navigate("/HomeSecretary/lecturers");
        }, 1000);
        return "Cập Nhật Thành Công";
      }
    );
  };

  const params = useParams();

  const { data: lecturers, loading } = useSelector(
    (state) => state.Lecturers.LecturersApi
  );

  const [data] = lecturers.filter((item) => item._id === params.lecturersId);

  useEffect(() => {
    setValue("hoTen", data?.hoTen);
    setValue("maVienChuc", data?.maVienChuc);
    setValue("Email", data?.email);
  }, [data, setValue]);

  if (loading) return <div className="loading">Loading...</div>;
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chỉnh sửa thông tin giảng viên</h1>
        <Link to="/HomeSecretary/newlecturers">
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
                <PermIdentity
                  className="userShowIcon"
                  style={{ color: "#000000" }}
                />
              </Tooltip>
              <Tooltip title="Mã viên chức" arrow>
                <span className="userShowInfoTitle">{data?.maVienChuc}</span>
              </Tooltip>
            </div>
            <div className="userShowInfo">
              <MailOutline
                className="userShowIcon"
                style={{ color: "#000000" }}
              />
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
