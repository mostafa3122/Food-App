import axiosClient from "../axiosClint";

export const GetRecipes = (params) => {
  return axiosClient.get("/Recipe", { params });
};
export const DeleteRecipe = (id) => {
  return axiosClient.delete(`/Recipe/${id}`);
};
export const CreateRecipe = (data) => {
  return axiosClient.post("/Recipe", data);
};
export const UpdateRecipe = (id, data) => {
  return axiosClient.put(`/Recipe/${id}`, data);
};
// export const GetRecipeById = (id) => {
//   return axiosClient.get(`/Recipe/${id}`);
// };