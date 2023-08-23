import Cookies from "js-cookie";
import { ROLE, TOKEN } from "../constants";

type UserInfo = {
  token?: string | undefined;
  role?: string | undefined;
  expire?: string | undefined;
}

export function setAuthCookies({ token, role }: UserInfo): void {
  if (token !== undefined) {
    Cookies.set(TOKEN, token);
  }
  if (role !== undefined) {
    Cookies.set(ROLE, role);
  }
}
