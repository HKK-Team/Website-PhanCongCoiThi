
import PagesLecturers from "../lecturers/pages/pagesLectures";
import NavBarAdmin from "../secretary/navBarAdmin";
// import NavBarAdmin from "../secretary/navBarAdmin";
import React, { useContext,Fragment } from "react";
import { GlobalState } from "../globalState";
import NotFound from "../utils/not_found/NotFound";
import PagesSecretarys from "../secretary/pagesSecretarys";
import PagesHome from "./pagesHome";

function Pages() {
  
  return (
    <Fragment>
      <PagesHome/>
      <PagesSecretarys />
      <PagesLecturers />
    </Fragment>
  );
}
export default Pages;
