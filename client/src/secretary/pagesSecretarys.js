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
import ProfileLecturers from "../lecturers/pages/ProfileLecturers/ProfileLecturers";
import { Routes, Route, useLocation } from "react-router-dom";
function PagesSecretarys() {
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
            element={<ArrangeExamSchedule />}
          />
          <Route
            exact
            path="/HomeSecretary/lecturers"
            element={<LecturersList />}
          />
          <Route
            exact
            path="/HomeSecretary/lecturers/:lecturersId"
            element={<Lecturers />}
          />
          <Route
            exact
            path="/HomeSecretary/newLecturers"
            element={<NewLecturers />}
          />
          <Route
            exact
            path="/HomeSecretary/subjects"
            element={<SubjectsList />}
          />
          <Route
            exact
            path="/HomeSecretary/subjects/:subjectsId"
            element={<Subjects />}
          />
          <Route
            exact
            path="/HomeSecretary/newSubjects"
            element={<NewSubjects />}
          />
          <Route
            exact
            path="/HomeSecretary/testSchedule"
            element={<TestScheduleList />}
          />
          <Route
            exact
            path="/HomeSecretary/testSchedule/:testScheduleID"
            element={<TestSchedule />}
          />
          <Route
            exact
            path="/HomeSecretary/profileSecretary"
            element={<ProfileLecturers />}
          />
          <Route
            exact
            path="/HomeSecretary/accountSercetary"
            element={<AccountSecretary />}
          />
        </Routes>

        {/* end of  Link url */}
      </div>
    </Fragment>
  );
}

export default PagesSecretarys;
