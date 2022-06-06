import { useQuery, useMutation, useQueryClient } from "react-query";
import { Paging } from "app/models/paging";
import {
  fetchAccounts,
  deleteAccount,
  mutateAccountStatus,
  addAccount,
  setPrikey,
  unsetPrikey,
} from "../../services/wel.service";

export const WELUPS_ACCOUNT_LIST = "WELUPS_ACCOUNT_LIST";
export const WELUPS_ADMIN_USER_ROLE = "WELUPS_ADMIN_USERS_LIST";

export const useWelAccountListing = (pagination: Paging) => {
  return useQuery(
    [WELUPS_ACCOUNT_LIST, pagination],
    () => fetchAccounts(pagination),
    { keepPreviousData: true, enabled: false }
  );
};

export const useAddWelAccount = () => {
  const queryClient = useQueryClient();
  return useMutation(addAccount, {
    onSuccess: (data) => {
      //queryClient;
    },
    onError: (data) => {
      console.log(data);
    },
  });
};

export const useMutateWelAccountStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(mutateAccountStatus, {
    onSuccess: (data) => {
      //queryClient;
    },
    onError: (data) => {
      console.log(data);
    },
  });
};

export const useWelAccountDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAccount, {
    onSuccess: (data) => {
      //queryClient;
    },
    onError: (data) => {
      console.log(data);
    },
  });
};

export const useSetPrikey = () => {
  return useMutation(setPrikey);
};

export const useUnsetPrikey = () => {
  return useMutation(unsetPrikey);
};
