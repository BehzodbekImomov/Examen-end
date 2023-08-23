import axios from "axios";
import Cookies from "js-cookie";
import { ENDPOINT, TOKEN } from "../constants";

const token = Cookies.get(TOKEN);

export const request = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
