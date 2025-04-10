// src/utils/cookieUtils.js
import Cookies from "js-cookie";

const COOKIE_KEY = "authUser";

export const setAuthCookie = (userData) => {
  Cookies.set(COOKIE_KEY, JSON.stringify(userData), { expires: 7 }); // expires in 7 days
};

export const getAuthCookie = () => {
  const cookie = Cookies.get(COOKIE_KEY);
  return cookie ? JSON.parse(cookie) : null;
};

export const removeAuthCookie = () => {
  Cookies.remove(COOKIE_KEY);
};
