
import { Switch, Route } from "react-router-dom";
import HomeAll from "../shareAll/HomeAll/HomeAll";
import LoginAll from "../shareAll/LoginAll/LoginAll";
import PagesLecturers from "../lecturers/pages/pagesLectures";
import NavBarAdmin from "../secretary/navBarAdmin";
// import NavBarAdmin from "../secretary/navBarAdmin";
import React, { useContext } from "react";
import { GlobalState } from "../GlobalState";
import NotFound from "../utils/not_found/NotFound";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.secretaryApi.isLogin;
  const login = localStorage.getItem('LecturerLogin');
  return (
    <Switch>
      <Route exact path="/" component={HomeAll} />
      <Route exact path="/login" component={((login ? NotFound : LoginAll) || (isLogged ? NotFound: LoginAll))} />
      {/* <PagesLecturers /> */}
      <NavBarAdmin />
    </Switch>
  );
}
export default Pages;
