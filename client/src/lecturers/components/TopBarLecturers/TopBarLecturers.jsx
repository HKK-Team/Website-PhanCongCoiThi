import Language from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import Settings from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toastInfor } from "../../../shareAll/toastMassage/toastMassage";
import TDMU from "./../../../images/TDMU.ico";
import "./../../../secretary/components/Topbar/Topbar.css";

export default function TopBarLecturers() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ticky, setTicky] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setTicky(window.pageYOffset > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    window.sessionStorage.removeItem("LecturerLogin");
    window.sessionStorage.removeItem("LecturerEmail");
  };
  return (
    <div className={ticky ? "topBarLecturers scroll" : "topBarLecturers"}>
      <div className="topbarWrapper">
        <div className="topLeft">
          <img alt="logo" src={TDMU} className="LogoTDMU" />
          <Link to="/HomeLecturers">
            <span className="Topleft-text">TDMU</span>{" "}
            <span className="Topleft-span">exam schedule.</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone style={{ color: "#000000" }} />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language style={{ color: "#000000" }} />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings onClick={handleClick} style={{ color: "#000000" }} />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Link
                  to="/HomeLecturers/profileLecturers"
                  style={{ color: "black" }}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/HomeLecturers/profileLecturers"
                  style={{ color: "black" }}
                >
                  My Account
                </Link>
              </MenuItem>
              <MenuItem>
                <a href="/login" onClick={logout}>
                  Logout
                </a>
              </MenuItem>
            </Menu>
          </div>
          <div className="topbarIconContainer">
            <img
              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt=""
              className="topAvatar"
              onClick={() => {
                toastInfor("Xin chào");
              }}
            />
          </div>
          <div className="topbarIconContainer">
            <a href="/login" onClick={logout}>
              <LogoutIcon style={{ color: "#000000" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
