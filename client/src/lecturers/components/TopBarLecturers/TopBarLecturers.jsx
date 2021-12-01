import React from "react";
import './../../../secretary/components/Topbar/Topbar.css'
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "./../../../images/tdmu-elearning-banner.png";
import { Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function TopBarLecturers() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () =>{
    window.localStorage.removeItem("LecturerLogin");
    window.localStorage.removeItem("email");
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src={logo} alt="" className="logo" />
          {/* <span className="logo">HKK team</span> */}
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings onClick={handleClick} />
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
                <Link to="/profileLecturers" style={{ color: "black" }}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem><Link to="/accountLecturers" style={{ color: "black" }}>
                  My Account
                </Link></MenuItem>
              <MenuItem><a href="/login" onClick={logout}>Logout</a></MenuItem>
            </Menu>
          </div>
          <div className="topbarIconContainer">
            <img
              src="https://as2.ftcdn.net/v2/jpg/02/50/31/95/500_F_250319577_BuOE8gd49LUD41DFH6eY3mahs0Q6n8Jp.jpg"
              alt=""
              className="topAvatar"
              onClick={() => {
                alert("hello");
              }}
            />
          </div>
          <div className="topbarIconContainer">
            <a href="/login" onClick={logout}><LogoutIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}
