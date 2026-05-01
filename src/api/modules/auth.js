import axiosClient from "../axiosClint";

export const LoginApi = (data) => {
  return axiosClient.post("/Users/Login", data);
};
export const RegisterApi = (data) => {
  return axiosClient.post("/Users/Register", data);
};
export const VerifyApi = (data) => {
  return axiosClient.put("/Users/verify", data);
};
export const ResetApi = (data) => {
  return axiosClient.post("/Users/Reset", data);
};
export const ForgetApi = (data) => {
  return axiosClient.post("/Users/Reset/Request", data);
};

 