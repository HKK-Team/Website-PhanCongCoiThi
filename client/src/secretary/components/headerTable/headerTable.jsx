import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import "./headerTable.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import axios from "axios";

export default function headerTable(props) {
  const Input = styled("input")({
    display: "none",
  });
  return (
    <div className="header-table">
      <h1 className="header-table-title">{props.title}</h1>
      <div className="header-table-buttons">
        <Link to={props.urlNew} style={{ textDecoration: "none" }}>
          <Tooltip title={props.name} arrow>
            <Button
              variant="contained"
              size="small"
              style={{ marginRight: 10 }}
            >
              {props.name}
            </Button>
          </Tooltip>
        </Link>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={props.onChange}
          />
          <Tooltip title="Thêm dữ liệu bằng file Excel" arrow>
            <Button
              variant="contained"
              component="span"
              color="success"
              size="small"
              style={{ marginRight: 10 }}
              onClick={props.onClick}
            >
              Import Excel
            </Button>
          </Tooltip>
        </label>
        <Tooltip title="lấy biểu mẫu Excel" arrow>
          <Button
            variant="contained"
            color="success"
            size="small"
            style={{ marginRight: 10 }}
            href={props.form}
            download
          >
            lấy biểu mẫu{" "}
          </Button>
        </Tooltip>
        <p className="header-table-ps">
          P/s: Hãy sử dụng biểu mẫu của chúng tôi, để có sự chính xác nhất
        </p>
      </div>
    </div>
  );
}
export function HeaderTableArrangeExamSchedule(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let datas = props.data;
    await toastPromise(
      axios.post("http://localhost:5000/import/createLichthi", {
        ...data,
        datas,
      }),
      () => {
        setTimeout(() => {
          window.location.href = "/testSchedule";
        }, 1000);
        return "Lịch thi đã được lưu lại";
      }
    );
  };
  return (
    <div className="header-table">
      <h1 className="header-table-title">{props.title}</h1>
      <div className="header-table-buttons">
        <Tooltip title="Lưu lịch thi" arrow>
          <Button
            variant="contained"
            size="small"
            style={{ marginRight: 10 }}
            onClick={handleSubmit(onSubmit)}
          >
            Lưu lịch thi
          </Button>
        </Tooltip>
        <Tooltip title="Tự động sắp xếp lịch thi một các nhanh gọn" arrow>
          <Button
            variant="contained"
            size="small"
            style={{ marginRight: 10 }}
            color="success"
            onClick={props.onClick}
          >
            Sắp xếp tự động
          </Button>
        </Tooltip>
        <TextField
          id="outlined-basic"
          label="Tên lịch thi"
          variant="outlined"
          size="small"
          style={{ width: 300 }}
          {...register("tenHocKy", { required: true, maxLength: 80 })}
        />
        <span style={{ fontSize: 16, color: "red", paddingLeft: 20 }}>
          {errors.tenHocKy?.type === "required" && "Vui lòng điền tên lịch thi"}
        </span>
        <p className="header-table-ps">
          P/s: Dữ liệu sẽ mất khi bạn rời khỏi trang. Hãy kiểm tra thật kỹ tất
          cả thông tin và lưu lại
        </p>
      </div>
    </div>
  );
}
