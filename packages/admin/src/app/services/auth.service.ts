import { User } from '../models/user';
import { apiClient } from '../commons/axios';
import { AxiosResponse } from 'axios';

export const login = ({
  username,
  password,
}: User): Promise<AxiosResponse<unknown>> => {
  let url = `/v1/u/login`;
  return apiClient.post(
    url,
    {
      username,
      password,
    },
    { withCredentials: true }
  );
};

export const logout = (): Promise<AxiosResponse<unknown>> => {
  let url = `/v1/u/logout`;
  return apiClient.post(url, '', { withCredentials: true });
};
