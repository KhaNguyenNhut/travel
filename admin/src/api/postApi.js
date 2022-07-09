/* eslint-disable prettier/prettier */
import axiosClient from './axiosClient';

const url = '/post';

const userApi = {
  create: (data) => axiosClient.post(`${url}/`, data),
  getAllPost: (data) => axiosClient.get(`${url}/`)
};

export default userApi;
