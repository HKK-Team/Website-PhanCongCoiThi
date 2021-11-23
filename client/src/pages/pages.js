
import { Switch, Route } from "react-router-dom";
import HomeAll from "../shareAll/HomeAll/HomeAll";
import LoginAll from "../shareAll/LoginAll/LoginAll";
import PagesLecturers from "../lecturers/pages/pagesLectures";
import NavBarAdmin from "../secretary/navBarAdmin";

function Pages() {
  return (
    <Switch>
      <Route exact path="/" component={HomeAll} />
      <Route exact path="/login" component={LoginAll} />
      <PagesLecturers />
      {/* <NavBarAdmin /> */}
    </Switch>
  );
}
export default Pages;
