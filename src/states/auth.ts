import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";
import Cookies from "js-cookie";

import { ID, ROLE, TOKEN } from "../constants";
import { request } from "../request";
import { userLogin, userRegister } from "../types";
import { message } from "antd";

type AuthTypes = {
  isAuthenticated: boolean;
  role: string;
  login: (userLogin: userLogin, navigate: NavigateFunction) => void;
  register: (userRegister: userRegister, navigate: NavigateFunction) => void;
  logout: (navigate: NavigateFunction) => void;
};


export const useAuth = create<AuthTypes>((set) => ({
  isAuthenticated: Cookies.get(TOKEN) ? true : false,
  role: Cookies.get(ROLE) || "",
  login: async (userLogin, navigate) => {
    try {
      const res = await request.post("auth/login", userLogin);
      Cookies.set(TOKEN, res.data.token);
      Cookies.set(ROLE, res.data.user.role);
      Cookies.set(ID, res.data.user._id);
      set({ isAuthenticated: true, role: res.data.user.role });
      const role = res.data.user.role;
      navigate(role === "admin" ? "/dashboard" : "/client");
     
    } catch (err) {
      message.error("Username or password is wrong!");
    }
  },
  register: async (userRegister, navigate) => {
    try {
      const res= await request.post("auth/register", userRegister);
      message.success("Registration completed successfully");
   console.log(res);
   
      Cookies.set(TOKEN, res.data.token);
      Cookies.set(ROLE, res.data.user.role);
      Cookies.set(ID, res.data.user._id);
      set({ isAuthenticated: true, role: res.data.user.role });
      const role = res.data.user.role;
      navigate(role === "admin" ? "/dashboard" : "/client");
    } catch (err) {
      message.error("Registration failed");
    }
  },
  logout: (navigate) => {
    Cookies.remove(TOKEN);
    Cookies.remove(ROLE);
    Cookies.remove(ID);
    set({ isAuthenticated: false, role: "" });
    navigate("/");
  },
 
}));


