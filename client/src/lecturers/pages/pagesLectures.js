import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  // BrowserRouter as Router,
  Routes,
  useLocation
} from "react-router-dom";
import { getLecturersAccApiAsync } from "../../api/lecturersAccountSlice";
import NotFound from "../../utils/not_found/NotFound";
import SideBarLecturers from "./../components/SideBarLecturers/SideBarLecturers";
import TopBarLecturers from "./../components/TopBarLecturers/TopBarLecturers";
import ProfileLecturers from "./../pages/ProfileLecturers/ProfileLecturers";
import EssaySubject from "./EssaySubject/EssaySubject";
import NewEssaySubject from "./NewEssaySubject/NewEssaySubject";
import TestScheduleLecturers from "./TestScheduleLecturers/TestScheduleLecturers";
function PagesLecturers() {
  const [isLogged] = sessionStorage.getItem("LecturerLogin") || "";
  const param = useLocation();

  const data = useSelector(
    (state) => state.LecturersAccount.lecturersAccountApi.data[0]
  );

  useEffect(() => {
    if (param.pathname.search("/HomeLecturers") === 0) {
      document.querySelector(".containerAdmin-Secretarys")?.remove();
      document.querySelector(".topbarSecretary")?.remove();
    }
  }, [param]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (param.pathname.search("/HomeLecturers") === 0) {
      dispatch(getLecturersAccApiAsync());
    }
  }, [dispatch, param]);

  // kiểm tra giảng viên đã nhập mã Viên chức chưa ?
  useEffect(() => {
    if (data?.maKhoa === "" || data?.maVienChuc === "") {
      if (
        // eslint-disable-next-line no-restricted-globals
        confirm(
          "Bạn chưa cập nhật mã khoa và mã viên chức, vui lòng cập nhật để sử dụng"
        )
      ) {
        if (param.pathname.search("/HomeLecturers/profileLecturers") === 0) {
          return;
        } else {
          window.location.href = "/HomeLecturers/profileLecturers";
        }
      }
    }
  }, [data, param]);

  return (
    <Fragment>
      <TopBarLecturers />
      <div className="containerAdmin-Lecturers">
        <SideBarLecturers />
        <Routes>
          <Route
            exact
            path="/HomeLecturers/profileLecturers"
            element={isLogged ? <ProfileLecturers /> : <NotFound />}
          />
          <Route
            exact
            path="/HomeLecturers/essaySubject"
            element={isLogged ? <EssaySubject /> : <NotFound />}
          />
          <Route
            exact
            path="/HomeLecturers/testScheduleLecturers"
            element={isLogged ? <TestScheduleLecturers /> : <NotFound />}
          />
          <Route
            exact
            path="/HomeLecturers/newEssaySubject/:id"
            element={isLogged ? <NewEssaySubject /> : <NotFound />}
          />
        </Routes>
      </div>
    </Fragment>
  );
}
export default PagesLecturers;
