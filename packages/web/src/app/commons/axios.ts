import { base_api_url } from "../../variables";
import axios from "axios";

const createAxios = () => {
  return axios.create({
    baseURL: base_api_url,
    timeout: 60000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
export const apiClient = createAxios();
