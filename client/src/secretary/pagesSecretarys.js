import Sidebar from "./components/Sidebar/Sidebar";
import { Fragment, useEffect } from "react";
import Topbar from "./components/Topbar/Topbar";
import "./app.css";
import TestSchedule from "./pages/TestSchedule/TestSchedule";
import ArrangeExamSchedule from "./pages/ArrangeExamSchedule/ArrangeExamSchedule";
import AccountSecretary from "./pages/AccoutSecretary/AccoutSecretary";
import TestScheduleList from "./pages/BillList/TestScheduleList";
import NewSubjects from "./pages/NewProduct/NewSubjects";
import Subjects from "./pages/Product/Subjects";
import SubjectsList from "./pages/ProductList/SubjectsList";
import NewLecturers from "./pages/NewUser/NewLecturers";
import Lecturers from "./pages/User/Lecturers";
import LecturersList from "./pages/UserList/LecturersList";
import ProfilSecretart from "./pages/ProfileSecretary/ProfileSecretary"
import { Routes, Route, useLocation } from "react-router-dom";
import NotFound from "../utils/not_found/NotFound";
function PagesSecretarys() {
  const isLogged = sessionStorage.getItem("SecretaryLogin");
  const param = useLocation();
  useEffect(() => {
    if (param.pathname.search("/HomeSecretary")===0) {
      document.querySelector(".containerAdmin-Lecturers")?.remove();
      document.querySelector(".topBarLecturers")?.remove();
    }
    // return () => {
    //   const containerAdminLecturers = document.createElement(".containerAdmin-Lecturers");
    //   const topBarLecturers = document.createElement(".topBarLecturers");
    //   const root = document.getElementById("root");
    //   root.appendChild(containerAdminLecturers);
    //   root.appendChild(topBarLecturers);
    // };
  }, [param]);

  return (
    <Fragment>
      <Topbar />
      <div className="containerAdmin-Secretarys">
        {/* Menu nav */}
        <Sidebar />
        {/* Link url */}
        <Routes>
          <Route
            exact
            path="/HomeSecretary/arrangeExamSchedule"
            element={isLogged ? <ArrangeExamSchedule /> : NotFound()}
          />
          <Route
            exact
            path="/HomeSecretary/lecturers"
            element={isLogged ? <LecturersList /> : NotFound()}
          />
          <Route
            exact
            path="/HomeSecretary/lecturers/:lecturersId"
            element={isLogged ? <Lecturers /> : NotFound()}
          />
          <Route
            exact
            path="/HomeSecretary/newLecturers"
            element={isLogged ? <NewLecturers /> : NotFound()}
          />
          <Route
            exact
            path="/HomeSecretary/subjects"
            element={isLogged ? <SubjectsList /> : NotFound()}
          />
          <Route
            exact
            path="/HomeSecretary/subjects/:subjectsId"
            element={isLogged ? <Subjects /> : NotFound()}
          />
          <Route
            exact
            path="/HomeSecretary/newSubjects"
            element={isLogged ? <NewSubjects /> : NotFound()}
          />
          <Route
            exact
            path="/HomeSecretary/testSchedule"
            element={isLogged ? <TestScheduleList /> : NotFound()}
          />
          <Route
            exact
            path="/HomeSecretary/testSchedule/:testScheduleID"
            element={isLogged ? <TestSchedule /> : NotFound()}
          />
          <Route
            exact
            path="/HomeSecretary/profileSecretary"
            element={isLogged ? <ProfilSecretart /> : NotFound()}
          />
          <Route
            exact
            path="/HomeSecretary/accountSercetary"
            element={isLogged ? <AccountSecretary /> : NotFound()}
          />
        </Routes>

        {/* end of  Link url */}
      </div>
    </Fragment>
  );
}

export default PagesSecretarys;
