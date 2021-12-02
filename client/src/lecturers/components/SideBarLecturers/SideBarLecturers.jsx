
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import DynamicFeed from '@mui/icons-material/DynamicFeed';
import MailOutline from '@mui/icons-material/MailOutline';
import "./../../../secretary/components/Sidebar/Sidebar.css";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { NavLink } from "react-router-dom";

export default function SideBarLecturers() {
  return (
    <div className="sidebarAdmin">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý</h3>
          <ul className="sidebarList">
            <NavLink to="/HomeLecturers/testScheduleLecturers" className="link">
              <li className="sidebarListItem">
                <EventNoteIcon className="sidebarIcon" />
                Lịch coi thi
              </li>
            </NavLink>
            <NavLink to="/HomeLecturers/essaySubject" className="link">
              <li className="sidebarListItem">
                <LibraryBooksIcon className="sidebarIcon" />
                Đăng ký tiểu luận
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
