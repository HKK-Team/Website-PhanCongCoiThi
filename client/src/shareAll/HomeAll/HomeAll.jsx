import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import schedulesSlice from "../../secretary/sliceApi/SchedulesSlice/schedulesSlice";
import FilterSearchHome from "../FilterSearchHome/FilterSearchHome";
import logo from "./../../../src/images/tdmu-elearning-banner.png";
import "./HomeAll.css";
export default function HomeAll() {
  const keyWord = useSelector(
    (state) => state.Schedules.filters.maVienChucVSTenLop
  );
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    dispatch(schedulesSlice.actions.FilterKeyWord(e.target.value.toUpperCase()));
  };

  useEffect(() => {
    const topbarSecretary = document.querySelector(".topbarSecretary");
    const containerAdminSecretarys = document.querySelector(
      ".containerAdmin-Secretarys"
    );
    const topBarLecturers = document.querySelector(".topBarLecturers");
    const containerAdminLecturers = document.querySelector(
      ".containerAdmin-Lecturers"
    );
    topbarSecretary.style.display = "none";
    containerAdminSecretarys.style.display = "none";
    topBarLecturers.style.display = "none";
    containerAdminLecturers.style.display = "none";
    document.body.style.overflowY = "auto";
  }, []);

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
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              onChange={handleInputChange}
              value={keyWord}
            />
            <Button
              variant="contained"
              size="small"
              style={{ marginTop: 10 }}
              // onClick={eventSearch}
            >
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
        <div className="FilterSearchHome">
          <FilterSearchHome />
        </div>
      </div>
    </Fragment>
  );
}
