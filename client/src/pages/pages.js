
import PagesLecturers from "../lecturers/pages/pagesLectures";
import PagesSecretarys from "../secretary/pagesSecretarys";
import React, { Fragment } from "react";
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
