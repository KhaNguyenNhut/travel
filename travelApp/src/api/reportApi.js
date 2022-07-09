import axiosClient from "./axiosClient";

const url = "/report";
const reportApi = {
  create: (data) => axiosClient.post(`${url}`, data),
  getComment: (id) => axiosClient.get(`${url}/${id}`),
};

export default reportApi;
