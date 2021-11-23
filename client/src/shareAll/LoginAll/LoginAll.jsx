import React, { Fragment } from "react";
import logo from "./../../../src/images/tdmu-elearning-banner.png";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import "./LoginAll.css";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
export default function LoginAll() {
  return (
    <Fragment>
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <Link to="/">
              <img src={logo} alt="" className="logo" />
            </Link>
          </div>
          <div className="topRight">
            <Stack spacing={1} direction="row">
              <Button variant="contained" size="small">
                <Link to="/" style={{ color: "white" }}>
                  Trang chủ
                </Link>
              </Button>
            </Stack>
          </div>
        </div>
      </div>
      <section className="home"></section>
      <div className="information-lookup-box">
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            style={{ width: "50%" }}
            onClick={(e) => {
              e.preventDefault();
              let a = document.querySelector(".btn-login-email");
              let b = document.querySelector(".form-login-secretary");
              a.style.display = "block";
              b.style.display = "none";
            }}
          >
            Giảng viên
          </Button>
          <Button
            variant="contained"
            style={{ width: "50%" }}
            onClick={(e) => {
              e.preventDefault();
              let a = document.querySelector(".btn-login-email");
              let b = document.querySelector(".form-login-secretary");
              b.style.display = "block";
              a.style.display = "none";
            }}
          >
            Thư ký
          </Button>
        </Stack>

        <div className="information-lookup-box-login">
          <Button
            variant="contained"
            style={{ display: "none" }}
            className="btn-login-email"
          >
            <EmailIcon style={{ paddingRight: 10 }} />
            Đăng nhập bằng Email
          </Button>

          <div className="information-lookup-box-secretary">
            <form className="form-login-secretary">
              <h2>Thư ký</h2>
              <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">
                  Email sẽ không được chia sẽ.
                </FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 10 }}>
                <InputLabel htmlFor="my-input">PassWord</InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  type="password"
                />
                <FormHelperText id="my-helper-text">
                  Hãy nhập mật khẩu
                </FormHelperText>
              </FormControl>
              <Button
                variant="contained"
                size="small"
                style={{ marginTop: 20, display: "block", width: "100%" }}
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
