import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { getSecretaryAccApiAsync } from "../api/secretarysAccountSlice";
import NotFound from "../utils/not_found/NotFound";
import "./app.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import AccountSecretary from "./pages/AccoutSecretary/AccoutSecretary";
import ArrangeExamSchedule from "./pages/ArrangeExamSchedule/ArrangeExamSchedule";
import EssaySubjectSecretaryManage from "./pages/EssaySubjectSecretaryManage/EssaySubjectSecretaryManage";
import SuggestEssaySubject from "./pages/EssaySubjectSecretaryManage/SuggestEssaySubject";
import Lecturers from "./pages/Lecturers/Lecturers";
import LecturersList from "./pages/LecturersList/LecturersList";
import NewLecturers from "./pages/NewLecturers/NewLecturers";
import NewSubjects from "./pages/NewSubjects/NewSubjects";
import ProfileSecretary from "./pages/ProfileSecretary/ProfileSecretary";
import Subjects from "./pages/Subjects/Subjects";
import SubjectsList from "./pages/SubjectsList/SubjectsList";
import TestSchedule from "./pages/TestSchedule/TestSchedule";
import TestScheduleList from "./pages/TestScheduleList/TestScheduleList";
import { getLecturersApiAsync } from "./sliceApi/LecturersSlice/lecturersSlice";
import { getNamHocApiAsync } from "./sliceApi/namHocSlice/namHocSlide";
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
    if (param.pathname.search("/HomeSecretary") === 0) {
      dispatch(getLecturersApiAsync());
      dispatch(getSubjectsApiAsync());
      dispatch(getSecretaryAccApiAsync());
      dispatch(getNamHocApiAsync());
    }
  }, [dispatch, param]);
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
            path="/HomeSecretary/suggestEssaySubject/:id"
            element={isLogged ? <SuggestEssaySubject /> : NotFound()}
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
          <Route
            exact
            path="/HomeSecretary/essaySubjectSecretaryManage"
            element={isLogged ? <EssaySubjectSecretaryManage /> : NotFound()}
          />
        </Routes>

        {/* end of  Link url */}
      </div>
    </Fragment>
  );
}

export default PagesSecretarys;
