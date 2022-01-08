import "./Sidebar.css";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import PermIdentity from "@mui/icons-material/PermIdentity";
import DynamicFeed from "@mui/icons-material/DynamicFeed";
import MailOutline from "@mui/icons-material/MailOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";
import BallotIcon from '@mui/icons-material/Ballot';

export default function Sidebar() {
  return (
    <div className="sidebarAdmin">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Bảng điều khiển</h3>
          <ul className="sidebarList">
            <NavLink to="/HomeSecretary/arrangeExamSchedule" className="link">
              <Tooltip title=" Sắp xếp lịch thi">
                <li className="sidebarListItem">
                  <AssignmentIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                </li>
              </Tooltip>
            </NavLink>
            <NavLink
              to="/HomeSecretary/essaySubjectSecretaryManage"
              className="link"
            >
              <Tooltip title="Lịch đăng ký thi tiểu luận,...">
                <li className="sidebarListItem">
                  <FactCheckIcon
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
            <NavLink to="/HomeSecretary/lecturers" className="link">
              <Tooltip title="Giảng viên">
                <li className="sidebarListItem">
                  <PermIdentity
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                  {/* Giảng viên */}
                </li>
              </Tooltip>
            </NavLink>
            <NavLink to="/HomeSecretary/subjects" className="link">
              <Tooltip title="Môn thi">
                <li className="sidebarListItem">
                  <LibraryBooksIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                  {/* Môn thi */}
                </li>
              </Tooltip>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Lịch thi</h3>
          <ul className="sidebarList">
            {" "}
            <NavLink to="/HomeSecretary/testSchedule" className="link">
              <Tooltip title="Lịch thi">
                <li className="sidebarListItem">
                  <EventNoteIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                  {/* Lịch thi */}
                </li>
              </Tooltip>
            </NavLink>
            <NavLink to="/HomeSecretary/EssaySubjectListTestSchedule" className="link">
              <Tooltip title="Lịch thi tiểu luận">
                <li className="sidebarListItem">
                  <BallotIcon
                    className="sidebarIcon"
                    style={{ color: "#000000" }}
                  />
                  {/* Lịch thi */}
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
              {/* Mail */}
            </li>
            <li className="sidebarListItem">
              <DynamicFeed
                className="sidebarIcon"
                style={{ color: "#000000" }}
              />
              {/* Feedback */}
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline
                className="sidebarIcon"
                style={{ color: "#000000" }}
              />
              {/* Messages */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
