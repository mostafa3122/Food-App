import axiosClient from "../axiosClint";

export const GetTags = () => {
  return axiosClient.get("/tag");
};
