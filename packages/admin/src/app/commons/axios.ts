import {base_account_url} from '../../variables';
import axios from 'axios';

const createAxios = () => {
  axios.defaults.withCredentials = true;
  return axios.create({
    baseURL: base_account_url,
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // withCredentials: true,
  });
};
export const apiClient = createAxios();
