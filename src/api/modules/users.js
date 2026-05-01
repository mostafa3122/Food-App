export const getUsers = (params) => {
  return axiosClient.get("/Users", params);
};
export const getUsersById = (id) => {
  return axiosClient.post(`/Users/${id}`);
};
export const createUser = (data) => {
  return axiosClient.post("/Users", data);
};