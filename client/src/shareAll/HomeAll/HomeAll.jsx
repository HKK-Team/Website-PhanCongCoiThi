import React, { Fragment } from "react";
import logo from "./../../../src/images/tdmu-elearning-banner.png";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./HomeAll.css";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
export default function HomeAll() {
  return (
    <Fragment>
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <img src={logo} alt="" className="logo" />
          </div>
          <div className="topRight">
            <Stack spacing={1} direction="row">
              <Button variant="contained" size="small">
                <Link to="/login" style={{ color: "white" }}>
                  {" "}
                  Đăng Nhập
                </Link>
              </Button>
            </Stack>
          </div>
        </div>
      </div>
      <section className="home"></section>
      <div className="information-lookup-box">
        <h2 className="information-lookup-box-title">
          Hệ thống tra cứu lịch thi <p>đại học Thủ Dầu Một</p>
        </h2>
        <div className="information-lookup-box-form">
          <FormControl>
            <InputLabel htmlFor="my-input">
              Mã giảng viên hoặc tên lớp
            </InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <Button variant="contained" size="small" style={{ marginTop: 10 }}>
              Tìm
            </Button>
            <FormHelperText id="my-helper-text">
              Nhập mã giảng viên nếu bạn là giảng viên
            </FormHelperText>
            <FormHelperText id="my-helper-text">
              Nhập tên lớp nếu bạn là sinh viên
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    </Fragment>
  );
}
