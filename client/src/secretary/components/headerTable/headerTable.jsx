import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import "./headerTable.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
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
          />
          <Tooltip title="Thêm dữ liệu bằng file Excel" arrow>
            <Button
              variant="contained"
              component="span"
              color="success"
              size="small"
              style={{ marginRight: 10 }}
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

export function HeaderTableTestSchedule(props) {
  return (
    <div className="header-table">
      <h1 className="header-table-title">{props.title}</h1>
      <div className="header-table-buttons">
        <FormControl style={{ marginRight: 10, width: 200 }} size="small">
          <InputLabel id="demo-simple-select-label">Chọn lịch thi</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value="Chọn lịch thi"
            label="Chọn lịch thi"
          >
            <MenuItem value={10}>HKI</MenuItem>
            <MenuItem value={20}>HKI</MenuItem>
            <MenuItem value={30}>HKIII</MenuItem>
          </Select>
        </FormControl>
        <Tooltip title="Gửi mail thông báo tất cả giảng viên" arrow>
          <Button variant="contained" size="small" style={{ marginRight: 10 }}>
            Gửi mail thông báo tất cả
          </Button>
        </Tooltip>
        <Tooltip
          title="Gửi mail thông báo một vài giảng viên đã chỉnh sửa"
          arrow
        >
          <Button variant="contained" size="small" style={{ marginRight: 10 }}>
            Gửi mail thông báo một vài giảng viên
          </Button>
        </Tooltip>
        <Tooltip title="xuất dữ liệu Excel" arrow>
          <Button
            variant="contained"
            color="success"
            size="small"
            style={{ marginRight: 10 }}
          >
            export Excel{" "}
          </Button>
        </Tooltip>
        <p className="header-table-ps">
          P/s: Hãy kiểm tra thật kỹ tất cả thông tin trước khi gửi mail
        </p>
        <p className="header-table-ps">
          P/s: Hãy click vào select box để chọn giảng viên cần gửi mail, trong
          trường hợp muốn gửi số ít
        </p>
      </div>
    </div>
  );
}
export function HeaderTableArrangeExamSchedule(props) {
  return (
    <div className="header-table">
      <h1 className="header-table-title">{props.title}</h1>
      <div className="header-table-buttons">
        <Tooltip title="Lưu lịch thi" arrow>
          <Button variant="contained" size="small" style={{ marginRight: 10 }}>
            Lưu lịch thi
          </Button>
        </Tooltip>
        <Tooltip
          title="Tự động sắp xếp lịch thi một các nhanh gọn"
          arrow
        >
          <Button variant="contained" size="small" style={{ marginRight: 10 }}  color="success">
            Sắp xếp tự động 
          </Button>
        </Tooltip>
        <p className="header-table-ps">
          P/s: Dữ liệu sẽ mất khi bạn rời khỏi trang. Hãy kiểm tra thật kỹ tất cả thông tin và lưu lại 
        </p>
      </div>
    </div>
  );
}