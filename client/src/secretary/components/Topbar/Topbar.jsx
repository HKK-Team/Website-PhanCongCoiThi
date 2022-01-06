import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { Link } from "react-router-dom";
import { toastInfor } from "../../../shareAll/toastMassage/toastMassage";
import logo from "./../../../images/tdmu-elearning-banner.png";

export default function Topbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout = async () => {
    window.sessionStorage.removeItem("SecretaryLogin");
    window.sessionStorage.removeItem("SecretaryEmail");
  };
  return (
    <div className="topbarSecretary">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src={logo} alt="" className="logo" />
          {/* <span className="logo">HKK team</span> */}
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
              src="https://as2.ftcdn.net/v2/jpg/02/50/31/95/500_F_250319577_BuOE8gd49LUD41DFH6eY3mahs0Q6n8Jp.jpg"
              alt=""
              className="topAvatar"
              onClick={() => {
                toastInfor('Xin chào')
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
