import Sidebar from "./components/Sidebar/Sidebar";
import { Fragment, useEffect } from "react";
import Topbar from "./components/Topbar/Topbar";
import "./app.css";
import TestSchedule from "./pages/TestSchedule/TestSchedule";
import ArrangeExamSchedule from "./pages/ArrangeExamSchedule/ArrangeExamSchedule";
import AccountSecretary from "./pages/AccoutSecretary/AccoutSecretary";
import TestScheduleList from "./pages/TestScheduleList/TestScheduleList";
import NewSubjects from "./pages/NewSubjects/NewSubjects";
import Subjects from "./pages/Subjects/Subjects";
import SubjectsList from "./pages/SubjectsList/SubjectsList";
import NewLecturers from "./pages/NewLecturers/NewLecturers";
import Lecturers from "./pages/Lecturers/Lecturers";
import LecturersList from "./pages/LecturersList/LecturersList";
import ProfileSecretary from "./pages/ProfileSecretary/ProfileSecretary";
import { Routes, Route, useLocation } from "react-router-dom";
import NotFound from "../utils/not_found/NotFound";
import { useDispatch } from "react-redux";
import { getSecretaryAccApiAsync } from "../api/secretarysAccountSlice";
import { getLecturersApiAsync } from "./sliceApi/LecturersSlice/lecturersSlice";
import { getSubjectsApiAsync } from "./sliceApi/SubjectsSlice/subjectsSlice";

function PagesSecretarys() {
  const isLogged = sessionStorage.getItem("SecretaryLogin");
  const param = useLocation();
  useEffect(() => {
    if (param.pathname.search("/HomeSecretary") === 0) {
      document.querySelector(".containerAdmin-Lecturers")?.remove();
      document.querySelector(".topBarLecturers")?.remove();
    }
  }, [param]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLecturersApiAsync());
    dispatch(getSubjectsApiAsync());
    dispatch(getSecretaryAccApiAsync());
  }, [dispatch]);
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
            element={isLogged ? <ProfileSecretary /> : NotFound()}
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
