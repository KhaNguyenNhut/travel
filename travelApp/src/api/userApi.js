import axiosClient from "./axiosClient";

const url = "/users";

const userApi = {
  getAccount: (id) => axiosClient.get(`${url}/${id}`),
};

export default userApi;
