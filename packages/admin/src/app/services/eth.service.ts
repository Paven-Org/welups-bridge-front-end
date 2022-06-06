import { apiClient } from "../commons/axios";
import { Paging } from "app/models/paging";
import { User } from "../models/user";
import { SetKeyReq, WelAccount } from "../models/wel_account";

export const fetchAccounts = async ({ page, page_size }: Paging) => {
  let url = `/v1/a/m/eth/accounts/${page}?limit=${page_size}`;
  return apiClient.get(url);
};

export const addAccount = (wa: WelAccount) => {
  let url = `/v1/a/m/eth/add`;
  return apiClient.post(url, wa);
};

export const mutateAccountStatus = (wa: WelAccount) => {
  let url = `/v1/a/m/eth/set-status/${wa.address}/${wa.status}`;
  return apiClient.post(url, wa);
};

export const fetchRoles = async () => {
  let url = `/v1/a/m/u/roles`;
  return apiClient.get(url);
};

export const deleteAccount = (wa: WelAccount) => {
  let url = `/v1/a/m/eth/remove/${wa.address}`;
  return apiClient.post(url);
};

export const setPrikey = (req: SetKeyReq) => {
  let url = `/v1/a/m/eth/set/authenticator-prikey`;
  return apiClient.post(url, req);
};

export const unsetPrikey = (s: any) => {
  let url = `/v1/a/m/eth/unset/authenticator-prikey`;
  return apiClient.post(url);
};
