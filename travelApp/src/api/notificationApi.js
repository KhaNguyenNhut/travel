import axiosClient from "./axiosClient";

const url = "/notification";
const notificationApi = {
  update: (id) => axiosClient.put(`${url}/${id}`),
  getAllNotifications: () => axiosClient.get(`${url}/`),
};

export default notificationApi;
