import { apiClient } from "../commons/axios";
import { Paging } from "app/models/paging";
import { User } from "../models/user";

export const fetchUsers = async ({ page, page_size }: Paging) => {
  let url = `/v1/a/m/u/users/${page}?limit=${page_size}`;
  return apiClient.get(url);
};

export const mutateUser = (u: User) => {
  let url = `/v1/a/m/u/add`;

  if (u.id && u.id > 0) {
    url = `/v1/a/m/u/update/${u.username}`;
    return apiClient.post(url, u);
  }
  return apiClient.post(url, u);
};

export const getUserRole = async (u: User) => {
  let url = `/v1/a/m/u/roles/of/${u.username}`;
  return apiClient.get(url);
};

export const fetchRoles = async () => {
  let url = `/v1/a/m/u/roles`;
  return apiClient.get(url);
};

export const deleteUser = (u: User) => {
  debugger;
  let url = `/v1/a/m/u/remove/${u.username}`;
  return apiClient.post(url, u);
};
