import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import DynamicFeed from "@mui/icons-material/DynamicFeed";
import MailOutline from "@mui/icons-material/MailOutline";
import "./../../../secretary/components/Sidebar/Sidebar.css";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";

export default function SideBarLecturers() {
  return (
    <div className="sidebarAdmin">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Bảng điều khiển</h3>
          <ul className="sidebarList">
            <NavLink to="/HomeLecturers/essaySubject" className="link">
              <Tooltip title="Đăng ký tiểu luận">
                <li className="sidebarListItem">
                  <LibraryBooksIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                </li>
              </Tooltip>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý</h3>
          <ul className="sidebarList">
            <NavLink to="/HomeLecturers/manageEssaySubject" className="link">
              <Tooltip title="Quản lý lịch đăng ký">
                <li className="sidebarListItem">
                  <FactCheckIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                </li>
              </Tooltip>
            </NavLink>
            <NavLink to="/HomeLecturers/testScheduleLecturers" className="link">
              <Tooltip title="Lịch coi thi">
                <li className="sidebarListItem">
                  <EventNoteIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                </li>
              </Tooltip>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thông báo</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline
                className="sidebarIcon"
                style={{ color: "#000000" }}
              />
            </li>
            <li className="sidebarListItem">
              <DynamicFeed
                className="sidebarIcon"
                style={{ color: "#000000" }}
              />
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline
                className="sidebarIcon"
                style={{ color: "#000000" }}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
