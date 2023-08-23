import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import UserDashboard from "../../pages/UserDashboard";
import Footer from "../footer";

const FrontLayout = () => {
  return (
    <Fragment>
      <UserDashboard/>
      <Header/>
      <Outlet />
      <Footer/>
    </Fragment>
  );
};

export default FrontLayout;
