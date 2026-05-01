import axiosClient from "../axiosClint";

export const GetCategories = () => {
  return axiosClient.get("/Category");
};
// export const CreateGategory = (data) => {
//   return axiosClient.post("/Category", data);
// };
// export const GetCategoryById = (id) => {
//   return axiosClient.get(`/Category/${id}`, data);
// };
// export const UpdateCategory = (data) => {
//   return axiosClient.post("/Category", data);
// };
export const DeleteCategory = (id) => {
  return axiosClient.delete(`/Category/${id}`, id);
};
