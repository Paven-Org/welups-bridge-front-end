import { User } from '../models/user';
// import { apiClient } from '../commons/axios';
import { AxiosResponse } from 'axios';
import axios from 'axios';

export const login = ({
  username,
  password,
}: User): Promise<AxiosResponse<unknown>> => {
  let url = `http://52.220.114.136/v1/u/login`;
  return axios.post(
    url,
    {
      username,
      password,
    },
    { withCredentials: true }
  );
};

export const logout = (): Promise<AxiosResponse<unknown>> => {
  let url = `http://52.220.114.136/v1/u/logout`;
  return axios.post(url, '', { withCredentials: true });
};
