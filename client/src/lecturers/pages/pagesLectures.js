import { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import TopBarLecturers from "./../components/TopBarLecturers/TopBarLecturers";
import SideBarLecturers from "./../components/SideBarLecturers/SideBarLecturers";
import TestScheduleLecturers from "./TestScheduleLecturers/TestScheduleLecturers";
import ProfileLecturers from "./../pages/ProfileLecturers/ProfileLecturers";
import AccountLecturers from "./../pages/AccountLeturers/AccountLeturers";
import EssaySubject from "./EssaySubject/EssaySubject";
import React from "react";
import NotFound from "../../utils/not_found/NotFound";
function PagesLecturers() {
  const [isLogged] = localStorage.getItem("LecturerLogin") || "";
  const param = useLocation();
  useEffect(() => {
    if (param.pathname.search("/HomeLecturers") ===0) {
      document.querySelector(".containerAdmin-Secretarys")?.remove();
      document.querySelector(".topbarSecretary")?.remove();
    }
    // return () => {
    //   cleanup
    // }
  }, [param])

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
            path="/HomeLecturers/accountLecturers"
            element={isLogged ? <AccountLecturers /> : <NotFound />}
          />
          <Route
            exact
            path="/HomeLecturers/essaySubject"
            element={isLogged ? <EssaySubject /> : <NotFound />}
          />
          <Route
            exact
            path="/HomeLecturers/testScheduleLecturers"
            element={<TestScheduleLecturers />}
          />
        </Routes>
      </div>
    </Fragment>
  );
}
export default PagesLecturers;
