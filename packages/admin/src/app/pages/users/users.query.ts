import { useQuery, useMutation, useQueryClient } from "react-query";
import { Paging } from "app/models/paging";
import {
  mutateUser,
  fetchUsers,
  getUserRole,
  deleteUser,
} from "../../services/user.service";
import { User } from "../../models/user";

export const WELUPS_ADMIN_USERS_LIST = "WELUPS_ADMIN_USERS_LIST";
export const WELUPS_ADMIN_USER_ROLE = "WELUPS_ADMIN_USERS_LIST";

export const useUserListing = (pagination: Paging) => {
  return useQuery(
    [WELUPS_ADMIN_USERS_LIST, pagination],
    () => fetchUsers(pagination),
    { keepPreviousData: true }
  );
};

export const useGetUserRole = (u: User) => {
  return useQuery([WELUPS_ADMIN_USER_ROLE, u?.id], () => getUserRole(u));
};

export const useUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(mutateUser, {
    onSuccess: (data) => {
      //queryClient;
    },
    onError: (data) => {
      console.log(data);
    },
  });
};

export const useUserDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: (data) => {
      //queryClient;
    },
    onError: (data) => {
      console.log(data);
    },
  });
};
