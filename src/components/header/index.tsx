import { Link, useNavigate } from "react-router-dom";
import {  useState } from "react";
import "./header.scss";
import { useAuth } from "../../states/auth";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
const [active,setActive]=useState("navbar")
const [toggleIcon,setToggleIcon]=useState("nav_toggler")

const navToggle=()=>{
  active==='navbar'?setActive('navbar nav_active'):setActive('navbar')

  toggleIcon==='nav_toggler'?setToggleIcon('nav_toggler toggle'):setToggleIcon('nav_toggler')
}



  return (
    <header>
      <div className="container header ">
        <Link className="logo" to="#home">
          Partfolio
        </Link>
        <nav className={active}>
          <a className="" href="#home">
            Home
          </a>
          <a className="" href="#about">
            About
          </a>

          <a className="" href="#partfolio">
            Partfolio
          </a>
          <a className="" href="#services">
            Services
          </a>

          <a className="" href="#contact">
            Contact
          </a>

          <Link to="" onClick={() => logout(navigate)}>
            Logout
          </Link>
        </nav>
        <div onClick={navToggle} className={toggleIcon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
