import axiosClient from "../axiosClint";

export const GetFavourites = (params) => {
  return axiosClient.get("/userRecipe",{params});
};
export const DeleteFavourite = (id) => {
  return axiosClient.delete(`/userRecipe/${id}`);
};
export const CreateFavourite = (data) => {
  return axiosClient.post("/userRecipe", data);
};
