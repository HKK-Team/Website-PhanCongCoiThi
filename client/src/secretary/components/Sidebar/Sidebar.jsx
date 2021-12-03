import "./Sidebar.css";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import PermIdentity from "@mui/icons-material/PermIdentity";
import DynamicFeed from "@mui/icons-material/DynamicFeed";
import MailOutline from "@mui/icons-material/MailOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebarAdmin">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Bảng điều khiển</h3>
          <ul className="sidebarList">
            <NavLink to="/HomeSecretary/arrangeExamSchedule" className="link">
              <li className="sidebarListItem">
                <AssignmentIcon className="sidebarIcon" style={{ color: "#000000" }}/>
                Sắp xếp lịch thi
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý</h3>
          <ul className="sidebarList">
            <NavLink to="/HomeSecretary/lecturers" className="link">
              <li className="sidebarListItem">
                <PermIdentity
                  className="sidebarIcon"
                  style={{ color: "#000000" }}
                />
                Giảng viên
              </li>
            </NavLink>
            <NavLink to="/HomeSecretary/subjects" className="link">
              <li className="sidebarListItem">
                <LibraryBooksIcon
                  className="sidebarIcon"
                  style={{ color: "#000000" }}
                />
                Môn học
              </li>
            </NavLink>
            <NavLink to="/HomeSecretary/testSchedule" className="link">
              <li className="sidebarListItem">
                <EventNoteIcon
                  className="sidebarIcon"
                  style={{ color: "#000000" }}
                />
                Lịch thi
              </li>
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
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed
                className="sidebarIcon"
                style={{ color: "#000000" }}
              />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline
                className="sidebarIcon"
                style={{ color: "#000000" }}
              />
              Messages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
