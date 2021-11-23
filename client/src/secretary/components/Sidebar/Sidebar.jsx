import "./Sidebar.css";
import {
  PermIdentity,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
} from "@material-ui/icons";
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
            <NavLink to="/arrangeExamSchedule" className="link">
              <li className="sidebarListItem">
                <AssignmentIcon className="sidebarIcon" />
                Sắp xếp lịch thi
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý</h3>
          <ul className="sidebarList">
            <NavLink to="/lecturers" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Giảng viên
              </li>
            </NavLink>
            <NavLink to="/subjects" className="link">
              <li className="sidebarListItem">
                <LibraryBooksIcon className="sidebarIcon" />
                Môn học
              </li>
            </NavLink>
            <NavLink to="/testSchedule" className="link">
              <li className="sidebarListItem">
                <EventNoteIcon className="sidebarIcon" />
                Lịch thi
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thông báo</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
