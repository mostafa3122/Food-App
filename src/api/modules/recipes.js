import axiosClient from "../axiosClint";

export const GetRecipes = () => {
  return axiosClient.get("/Recipe");
};
export const DeleteRecipe = (id) => {
  return axiosClient.delete(`/Recipe/${id}`);
};
export const CreateRecipe = (data) => {
  return axiosClient.post("/Recipe", data);
};

// export const GetRecipeById = (id) => {
//   return axiosClient.get(`/Recipe/${id}`);
// };
// export const UpdateRecipe = (data) => {
//   return axiosClient.put("/Recipe", data);
// };
