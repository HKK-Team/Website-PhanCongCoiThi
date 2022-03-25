import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toastInfor } from "../../../shareAll/toastMassage/toastMassage";
import TDMU from "./../../../images/TDMU.ico";

export default function Topbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [scroll, setScroll] = React.useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.pageYOffset > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout = async () => {
    window.sessionStorage.removeItem("SecretaryLogin");
    window.sessionStorage.removeItem("SecretaryUserEmail");
    window.sessionStorage.removeItem("SecretaryUserName");
  };
  return (
    <div className={scroll ? "topbarSecretary scroll" : "topbarSecretary"}>
      <div className="topbarWrapper">
        <div className="topLeft">
          <img alt="logo" src={TDMU} className="LogoTDMU" />
          <Link to="/HomeSecretary">
            <span className="Topleft-text">TDMU</span>{" "}
            <span className="Topleft-span">exam schedule.</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon style={{ color: "#000000" }} />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon style={{ color: "#000000" }} />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon onClick={handleClick} style={{ color: "#000000" }} />
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
                  to="/HomeSecretary/profileSecretary"
                  style={{ color: "black" }}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/HomeSecretary/accountSercetary"
                  style={{ color: "black" }}
                >
                  My Account
                </Link>
              </MenuItem>
              <MenuItem>
                <a href="/login" onClick={Logout}>
                  Logout
                </a>
              </MenuItem>
            </Menu>
          </div>
          <div className="topbarIconContainer">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt=""
              className="topAvatar"
              onClick={() => {
                toastInfor("Xin chào");
              }}
            />
          </div>
          <div className="topbarIconContainer">
            <a href="/login" onClick={Logout}>
              <LogoutIcon style={{ color: "#000000" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
