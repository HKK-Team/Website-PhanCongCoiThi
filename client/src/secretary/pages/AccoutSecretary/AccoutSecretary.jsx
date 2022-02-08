import Button from "@mui/material/Button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";

export default function AccountSecretary() {
  const navigate = useNavigate();
  const datas = useSelector(
    (state) => state.SecretaryAccount.secretaryAccountApi.data[0]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data._id = datas._id;
    toastPromise(
      axios.post("http://localhost:5000/secretary/editPassWord", { ...data }),
      () => {
        setTimeout(() => {
          navigate("/HomeSecretary");
        }, 1000);
        return "Cập nhật password thành công !";
      }
    );
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Thông tin tài khoản</h1>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Mật khẩu cũ</label>
                <input
                  style={{ outline: "none" }}
                  type="password"
                  name="old_password"
                  className="userUpdateInput"
                  {...register("old_password", {
                    required: true,
                    maxLength: 20,
                    minLength: 6,
                  })}
                />
              </div>
              <div className="userUpdateItem">
                <label>Mật khẩu mới</label>
                <input
                  style={{ outline: "none" }}
                  type="password"
                  className="userUpdateInput"
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                  })}
                />
              </div>
              <p style={{ fontSize: 12, color: "red" }}>
                {errors.password?.type === "required" &&
                  "Mật khẩu phải chứa ít nhất một chữ số [0-9]. Một ký tự Latinh viết thường [a-z]. Một ký tự Latinh viết hoa [A-Z]. Độ dài ít nhất 6 ký tự và tối đa 20 ký tự."}
              </p>
              <div className="userUpdateItem">
                <label>Nhập lại mật khẩu</label>
                <input
                  style={{ outline: "none" }}
                  type="password"
                  name="confirm_password"
                  className="userUpdateInput"
                  {...register("confirm_password", {
                    required: true,
                    maxLength: 20,
                    minLength: 6,
                  })}
                />
              </div>
              <div className="userUpdateItem" style={{ paddingTop: 10 }}>
                <Button variant="contained" color="success" type="Submit">
                  Xác nhận
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
