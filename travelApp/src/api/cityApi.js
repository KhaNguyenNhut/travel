import axiosClient from "./axiosClient";

const url = "/city";
const urlDistrict = "/district";

const cityApi = {
  getCity: () => axiosClient.get(`${url}`),
  getDistrict: (id) => axiosClient.get(`${urlDistrict}`),
};

export default cityApi;
