import React from "react";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "./../../../images/tdmu-elearning-banner.png";
import { Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Topbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout = async() =>{
    window.sessionStorage.removeItem('SecretaryLogin');
    window.sessionStorage.removeItem('SecretaryEmail');
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
                <Link to="/profileSecretary" style={{ color: "black" }}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem><Link to="/accountSercetary" style={{ color: "black" }}>
                  My Account
                </Link></MenuItem>
              <MenuItem><a href="/login" onClick={Logout}>Logout</a></MenuItem>
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
          <a href="/login" onClick={Logout}><LogoutIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}
