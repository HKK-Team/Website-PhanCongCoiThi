import { ErrorMessage } from "@hookform/error-message";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toastPromise } from "../../../shareAll/toastMassage/toastMassage";
import Loading from "../../../utils/loading/Loading";
import arrangeExamScheduleSlide from "../../sliceApi/ArrangeExamSchedule/arrangeExamScheduleSlide";
import "./headerTable.css";

function headerTable(props) {
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
export default memo(headerTable);

export function HeaderTableArrangeExamSchedule(props) {
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.NamHoc.NamHocApi);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let datas = props.data;

    toastPromise(
      axios.post("http://localhost:5000/import/createLichthi", {
        ...data,
        datas,
      }),
      () => {
        setTimeout(() => {
          navigate("/HomeSecretary/testSchedule");
        }, 1000);
        dispatch(arrangeExamScheduleSlide.actions.CreateList("reset"));
        return "Lịch thi đã được lưu lại";
      }
    );
  };

  if (loading)
    return (
      <div className="loading">
        {" "}
        <Loading />
      </div>
    );
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
            Tạo lịch thi
          </Button>
        </Tooltip>
        <FormControl style={{ display: "inline-block", width: "150px" }}>
          <InputLabel id="demo-simple-select-helper-label">
            Chọn năm học
          </InputLabel>
          <Select
            style={{ width: "100%", height: "50px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Chọn năm học"
            {...register("namHoc", { required: "Vui lòng chọn năm học" })}
          >
            {data.map((item) =>
              item.namHoc.map((item) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))
            )}
          </Select>
          <ErrorMessage
            errors={errors}
            name="namHoc"
            as="span"
            style={{ color: "red" }}
          />
        </FormControl>
        <FormControl
          style={{ display: "inline-block", width: "150px", marginLeft: 10 }}
        >
          <InputLabel id="demo-simple-select-helper-label">
            Chọn học kỳ
          </InputLabel>
          <Select
            style={{ width: "100%", height: "50px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Chọn học kỳ"
            {...register("hocKy", { required: "Vui lòng chọn học kỳ" })}
          >
            {data.map((item) =>
              item.hocKy.map((item) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))
            )}
          </Select>
          <ErrorMessage
            errors={errors}
            name="hocKy"
            as="span"
            style={{ color: "red" }}
          />
        </FormControl>
        <p className="header-table-ps">
          P/s: Dữ liệu sẽ mất khi bạn rời khỏi trang. Hãy kiểm tra thật kỹ tất
          cả thông tin và lưu lại
        </p>
      </div>
    </div>
  );
}
