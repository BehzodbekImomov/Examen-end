import {  useState } from "react";

import { useAuth } from "../states/auth";
import { Link, useNavigate } from "react-router-dom";
import "./page.scss";
import RegisterP from "./RegisterP";



const LoginP = () => {
  const { login } = useAuth();
  const navigate = useNavigate();


  

const [userLogin,setUserLogin]=useState({
  username: "",
  password: "",
})


   const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };


  const loginSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    };
   

  const wrapper = document.querySelector(".wrapper");

  const singUp = () => {
    wrapper?.classList.toggle("active");
  };



  return (
    <div className="container authorization">
      <div className="wrapper" >
        <div id="login" className="form-wrapper sign-in">
          <form  onSubmit={loginSubmit}>
            <h2>Login</h2>
            <div className="input-group">
              <input value={userLogin.username} name="username" onChange={handleChangeLogin} type="text" required />
              <label>Username</label>
            </div>
            <div className="input-group">
              <input value={userLogin.password} name="password" onChange={handleChangeLogin} type="password" required />
              <label>Password</label>
            </div>

            <div className="remember">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
            </div>
            <button type="submit" onClick={() => login(userLogin, navigate)}>
              Login
            </button>
            <div className="signUp-link">
              <p>
                Dont have an account?{" "}
                <Link onClick={singUp} to="#" className="signUpBtn-link">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>

      <RegisterP/>
      </div>
    </div>
  );
};

export default LoginP;
