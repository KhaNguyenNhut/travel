import axiosClient from "./axiosClient";

const url = "/post";

const userApi = {
  create: (data) => axiosClient.post(`${url}/`, data),
  getAllPost: (data) => axiosClient.get(`${url}/`),

  // getAccount: (id) => axiosClient.get(`${url}/account/${id}`),
};

export default userApi;
