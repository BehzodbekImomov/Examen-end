import { Link, useNavigate } from "react-router-dom"
import {  useState } from "react";

import { userRegister } from "../types";
import { useAuth } from "../states/auth";

const RegisterP = () => {
    const {  register } = useAuth();
    const navigate = useNavigate();

    const [userRegister, setUserRegister] = useState<userRegister>({
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber:"",
        password: "",
      });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
      };

    const registerSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        
        };

        const wrapper = document.querySelector(".wrapper");

        const signIn = () => {
            console.log(wrapper);
        
            wrapper?.classList.toggle("active");
          };
  return (
    <div id="register" className="form-wrapper sign-up">
    <form onSubmit={registerSubmit}>
      <h2>Sign Up</h2>
      <div className="input-group">
        <input value={userRegister.firstName} name="firstName" onChange={handleChange} type="text" required />
        <label>Firs name</label>
      </div>
      <div className="input-group">
        <input value={userRegister.lastName} name="lastName" onChange={handleChange} type="text" required />
        <label>Last name</label>
      </div>
      <div className="input-group">
        <input value={userRegister.phoneNumber} name="phoneNumber" onChange={handleChange} type="tel" required />
        <label>Phone number</label>
      </div>
      <div className="input-group">
        <input value={userRegister.username} name="username" onChange={handleChange} type="text" required />
        <label>Username</label>
      </div>
      <div className="input-group">
        <input value={userRegister.password} name="password" onChange={handleChange} type="password" required />
        <label>Password</label>
      </div>

      <div className="remember">
        <label>
          <input type="checkbox" />I agree to the terms & conditions
        </label>
      </div>
      <button type="submit" onClick={() => register(userRegister,navigate)}>
        Sign Up
      </button>
      <div className="signUp-link">
        <p>
          Already have an account?{" "}
          <Link onClick={signIn} to="#" className="signInBtn-link">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  </div>
  )
}

export default RegisterP