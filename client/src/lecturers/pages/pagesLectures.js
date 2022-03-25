import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  // BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getLecturersAccApiAsync } from "../../api/lecturersAccountSlice";
import { getTieuLuanApiAsync } from "../../api/tieuLuanSlide";
import Landingpage from "../../utils/LandingPage/LandingPage";
import NotFound from "../../utils/not_found/NotFound";
import SideBarLecturers from "./../components/SideBarLecturers/SideBarLecturers";
import TopBarLecturers from "./../components/TopBarLecturers/TopBarLecturers";
import ProfileLecturers from "./../pages/ProfileLecturers/ProfileLecturers";
import EditEssaySubject from "./EditEssaySubject/EditEssaySubject";
import EssaySubject from "./EssaySubject/EssaySubject";
import EssaySubjectManage from "./EssaySubjectManage/EssaySubjectManage";
import NewEssaySubject from "./NewEssaySubject/NewEssaySubject";
import SuggestEssaySubjectLecrurers from "./SuggestEssaySubjectLecrurers/SuggestEssaySubjectLecrurers";
import TestScheduleLecturers from "./TestScheduleLecturers/TestScheduleLecturers";
function PagesLecturers() {
  const nagivate = useNavigate();
  const [isLogged] = sessionStorage.getItem("LecturerLogin") || "";
  const param = useLocation();
  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state.LecturersAccount.lecturersAccountApi.data[0]
  );
  useEffect(() => {
    if (param.pathname.search("/HomeLecturers") === 0) {
      document.querySelector(".containerAdmin-Secretarys")?.remove();
      document.querySelector(".topbarSecretary")?.remove();
    }
  }, [param]);

  useEffect(() => {
    if (param.pathname.search("/HomeLecturers") === 0) {
      dispatch(getLecturersAccApiAsync());
      dispatch(getTieuLuanApiAsync());
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
          nagivate("/HomeLecturers/profileLecturers");
        }
      }
    }
  }, [data, param, nagivate]);

  return (
    <Fragment>
      <TopBarLecturers />
      <div className="containerAdmin-Lecturers">
        <SideBarLecturers />
        <Routes>
          <Route
            exact
            path="/HomeLecturers"
            element={isLogged ? <Landingpage /> : <NotFound />}
          />
          <Route
            exact
            path="/HomeLecturers/profileLecturers"
            element={isLogged ? <ProfileLecturers /> : <NotFound />}
          />
          <Route
            exact
            path="/HomeLecturers/manageEssaySubject"
            element={isLogged ? <EssaySubjectManage /> : <NotFound />}
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
          <Route
            exact
            path="/HomeLecturers/editEssaySubject/:id"
            element={isLogged ? <EditEssaySubject /> : <NotFound />}
          />
          <Route
            exact
            path="/HomeLecturers/suggestEssaySubjectLecrurers/:id"
            element={isLogged ? <SuggestEssaySubjectLecrurers /> : <NotFound />}
          />
        </Routes>
      </div>
    </Fragment>
  );
}
export default PagesLecturers;
