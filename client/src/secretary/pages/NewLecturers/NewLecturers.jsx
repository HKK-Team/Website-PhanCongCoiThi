import "./NewLecturers.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import { useSelector } from "react-redux";
import { getSecretaryAccLogin } from "../../../redux/selectors";
import { useNavigate } from "react-router-dom";

// tạo mới người dùng
export default function NewLecturers() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const secretaryAccount = useSelector(getSecretaryAccLogin);
  const maKhoa = secretaryAccount?.maKhoa;
  const chuongTrinhDaoTao = secretaryAccount?.chuongTrinhDaoTao;
  const onSubmit = async (data) => {
    data.maKhoa = maKhoa;
    data.maChuongTrinh = chuongTrinhDaoTao;
    data.maVienChuc = data.maVienChuc.toUpperCase();
    await toastPromise(
      axios.post("http://localhost:5000/import/createGiangVien", {
        ...data,
      }),
      () => {
        setTimeout(() => {
          navigate('/HomeSecretary/lecturers')
        }, 1000);
        return "Thêm Thành Công";
      }
    );
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm Giảng Viên</h1>
      <form className="newUserForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="newUserItem">
          <label>Họ Và Tên</label>
          <input
            type="text"
            placeholder="Họ và Tên"
            {...register("hoTen", { required: true, maxLength: 80 })}
          />
          <p style={{ fontSize: 12, color: "red" }}>
            {errors.hoTen?.type === "required" && "Vui lòng nhập họ tên"}
          </p>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email không hợp lệ",
              },
            })}
          />
          <p style={{ fontSize: 12, color: "red" }}>
            {(errors.Email?.type === "required" && "Vui lòng nhập email") ||
              errors.Email?.message}
          </p>
        </div>
        <div className="newUserItem">
          <label>Mã viên chức</label>
          <input
            type="text"
            placeholder="Mã Viên Chức"
            {...register("maVienChuc", { required: true, maxLength: 80 })}
          />
          <p style={{ fontSize: 12, color: "red" }}>
            {errors.maVienChuc?.type === "required" &&
              "Vui lòng điền mã viên chức"}
          </p>
        </div>
        <button className="newUserButton">Thêm</button>
      </form>
    </div>
  );
}
