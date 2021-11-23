import "./WidgetSm.css";
import { Visibility } from "@material-ui/icons";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Thành viên mới tham gia</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.15752-9/175549131_930244867711789_2505231581677305611_n.png?_nc_cat=106&ccb=1-5&_nc_sid=ae9488&_nc_ohc=JH7qcxswaTYAX-yV-yV&_nc_ht=scontent.fsgn5-6.fna&oh=605998dda415b30e5d0d27bd838e11f1&oe=616BB348"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Đoàn Minh Khánh</span>
            <span className="widgetSmUserTitle">Make coffee</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.15752-9/168270377_794225684834473_2331803775706012068_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=ae9488&_nc_ohc=CWhoGWw-T-cAX9Hu9cU&_nc_ht=scontent.fsgn5-6.fna&oh=bef9e73023bcf7b2f20c9fdddd52723d&oe=616BED67"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Vũ Quốc Khánh</span>
            <span className="widgetSmUserTitle">Refill printer ink</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.6435-9/219368961_2670798456546860_270148802336329804_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8ahukAUeL90AX_-l6Vx&_nc_ht=scontent.fsgn5-7.fna&oh=6593ca1dc333d0ce878821b1410786eb&oe=616E2EFC"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Huynh Đức Huy</span>
            <span className="widgetSmUserTitle">Mopping the floor</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.15752-9/226645643_194980795927524_8293117425506626985_n.png?_nc_cat=102&ccb=1-5&_nc_sid=ae9488&_nc_ohc=1269wGoRi4AAX9BPbjk&_nc_ht=scontent.fsgn5-4.fna&oh=eb0f0519c1fde8a094fda0392f2738a7&oe=616A6EBF"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Nguyễn Tiến Đạt</span>
            <span className="widgetSmUserTitle">Pull cable</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}