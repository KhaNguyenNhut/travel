import axiosClient from "./axiosClient";

const url = "/users";

const authApi = {
  login: (data) => axiosClient.post(`${url}/login`, data),
  // getAccount: (id) => axiosClient.get(`${url}/account/${id}`),
};

export default authApi;
