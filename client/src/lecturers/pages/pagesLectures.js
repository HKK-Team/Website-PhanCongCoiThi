// import { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopBarLecturers from "./../components/TopBarLecturers/TopBarLecturers";
import SideBarLecturers from "./../components/SideBarLecturers/SideBarLecturers";
import TestScheduleLecturers from "./TestScheduleLecturers/TestScheduleLecturers";
import ProfileLecturers from "./../pages/ProfileLecturers/ProfileLecturers";
import AccountLecturers from "./../pages/AccountLeturers/AccountLeturers";
import EssaySubject from "./EssaySubject/EssaySubject";
import React from "react";
import NotFound from "../../utils/not_found/NotFound";
function PagesLecturers() {
  const [isLogged] = localStorage.getItem('LecturerLogin');
  return (
    <Router>
      <TopBarLecturers />
      <div className="containerAdmin">
        <SideBarLecturers />
        <Switch>
          <Route exact path="/profileLecturers" component={isLogged ? ProfileLecturers : NotFound} />
          <Route exact path="/accountLecturers" component={isLogged ? AccountLecturers : NotFound} />
          <Route exact path="/essaySubject" component={isLogged ?EssaySubject : NotFound} />
          <Route
            exact
            path="/testScheduleLecturers"
            component={TestScheduleLecturers}
          />
        </Switch>
      </div>
    </Router>
  );
}
export default PagesLecturers;
