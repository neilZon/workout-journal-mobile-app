import axios from "axios";

export const signup = async (user: Signup) => {
  const res = await axios.post(`127.0.0.1:8000/api/auth/signup`, user);
  return res.data;
};

export const login = async (user: Login) => {
  const res = await axios.post(`http://192.168.1.67:8000/api/auth/token`, user);
  return res.data;
};

export const refreshToken = async (refreshToken: string) => {
  const res = await axios.post(`127.0.0.1:8000/api/auth/refreshToken`, {
    refreshToken,
  });
  return res.data;
};
