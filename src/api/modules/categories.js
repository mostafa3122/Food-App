import axiosClient from "../axiosClint";

export const GetCategories = () => {
  return axiosClient.get("/Category");
};
export const DeleteCategory = (id) => {
  return axiosClient.delete(`/Category/${id}`);
};
export const CreateGategory = (data) => {
  return axiosClient.post("/Category", data);
};
export const UpdateCategory = (id, data) => {
  return axiosClient.put(`/Category/${id}`, data);
};

// export const GetCategoryById = (id) => {
//   return axiosClient.get(`/Category/${id}`, data);
// };
