import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/UserList/UserList";
import User from "./pages/User/User";
import NewUser from "./pages/NewUser/NewUser";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import NewProduct from "./pages/NewProduct/NewProduct";
import BillList from "./pages/BillList/BillList";
import TestSchedule from "./pages/TestSchedule/TestSchedule";
import ArrangeExamSchedule from "./pages/ArrangeExamSchedule/ArrangeExamSchedule";
import ProfileSecretary from "./pages/ProfileSecretary/ProfileSecretary";
import AccountSecretary from "./pages/AccoutSecretary/AccoutSecretary";
function navBarAdmin() {
  return (
    <Router>
      <Topbar />
      <div className="containerAdmin">
        {/* Menu nav */}
        <Sidebar />
        {/* Link url */}
        <Switch>
          <Route
            exact
            path="/arrangeExamSchedule"
            component={ArrangeExamSchedule}
          />
          <Route exact path="/lecturers" component={UserList} />
          <Route exact path="/lecturers/:lecturersId" component={User} />
          <Route exact path="/newLecturers" component={NewUser} />
          <Route exact path="/subjects" component={ProductList} />
          <Route exact path="/subjects/:subjectsId" component={Product} />
          <Route exact path="/newSubjects" component={NewProduct} />
          <Route exact path="/testSchedule" component={BillList} />
          <Route
            exact
            path="/testSchedule/:testScheduleID"
            component={TestSchedule}
          />
          <Route exact path="/profileSecretary" component={ProfileSecretary} />
          <Route exact path="/accountSercetary" component={AccountSecretary} />
        </Switch>
        {/* end of  Link url */}
      </div>
    </Router>
  );
}

export default navBarAdmin;
