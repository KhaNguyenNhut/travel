import axiosClient from "./axiosClient";

const url = "/comment";
const commentApi = {
  create: (data) => axiosClient.post(`${url}`, data),
  getComment: (id) => axiosClient.get(`${url}/${id}`),
  update: (id) => axiosClient.put(`${url}/${id}`),
};

export default commentApi;
