import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import HomeAll from "../shareAll/HomeAll/HomeAll";
import LoginAll from "../shareAll/LoginAll/LoginAll";
import NotFound from "../utils/not_found/NotFound";

export default function PagesHome() {
  const param = useLocation();
  useEffect(() => {
    if (
      !!param.pathname.search("/") === 0 ||
      param.pathname.search("/login") === 0
    ) {
      document.querySelector(".containerAdmin-Secretarys").style.display =
        "none";
      document.querySelector(".topbarSecretary").style.display = "none";
      document.querySelector(".containerAdmin-Lecturers").style.display =
        "none";
      document.querySelector(".topBarLecturers").style.display = "none";
    }
  }, [param]);

  const isLogged = sessionStorage.getItem("SecretaryLogin") || "";
  const login = sessionStorage.getItem("LecturerLogin") || "";
  return (
    <Routes>
      <Route exact path="/" element={<HomeAll />} />
      <Route
        exact
        path="/login"
        element={
          (login ? <NotFound /> : <LoginAll />) ||
          (isLogged ? <NotFound /> : <LoginAll />)
        }
      />
    </Routes>
  );
}
