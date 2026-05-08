import axiosClient from "../axiosClint";

export const GetUsers = (params) => {
  return axiosClient.get("/Users", { params});
};
export const GetUsersById = (id) => {
  return axiosClient.post(`/Users/${id}`);
};
export const DeletUsersById = (id) => {
  return axiosClient.delete(`/Users/${id}`);
};
export const CreateUser = (data) => {
  return axiosClient.post("/Users", data);
};
