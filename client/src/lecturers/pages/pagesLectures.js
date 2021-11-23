import { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopBarLecturers from "./../components/TopBarLecturers/TopBarLecturers";
import SideBarLecturers from "./../components/SideBarLecturers/SideBarLecturers";
import TestScheduleLecturers from "./TestScheduleLecturers/TestScheduleLecturers";
import ProfileLecturers from "./../pages/ProfileLecturers/ProfileLecturers";
import AccountLecturers from "./../pages/AccountLeturers/AccountLeturers";
import EssaySubject from "./EssaySubject/EssaySubject";
function PagesLecturers() {
  return (
    <Router>
      <TopBarLecturers />
      <div className="containerAdmin">
        <SideBarLecturers />
        <Switch>
          <Route exact path="/profileLecturers" component={ProfileLecturers} />
          <Route exact path="/accountLecturers" component={AccountLecturers} />
          <Route exact path="/essaySubject" component={EssaySubject} />
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
