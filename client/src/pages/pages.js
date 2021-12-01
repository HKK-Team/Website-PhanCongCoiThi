
import { Switch, Route } from "react-router-dom";
import HomeAll from "../shareAll/HomeAll/HomeAll";
import LoginAll from "../shareAll/LoginAll/LoginAll";
import PagesLecturers from "../lecturers/pages/pagesLectures";
import PagesSecretarys from "../secretary/pagesSecretarys";
// import NavBarAdmin from "../secretary/navBarAdmin";
import React, { useContext } from "react";
import { GlobalState } from "../globalState";
import NotFound from "../utils/not_found/NotFound";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.secretaryApi.isLogin;
  const login = localStorage.getItem('LecturerLogin');
  return (
    <Switch>
      <Route exact path="/" component={HomeAll} />
      <Route exact path="/login" component={((login ? NotFound : LoginAll) || (isLogged ? NotFound: LoginAll))} />
      {/* <PagesSecretarys /> */}
      <PagesLecturers />
    </Switch>
  );
}
export default Pages;
