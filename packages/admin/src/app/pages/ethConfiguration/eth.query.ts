import { useQuery, useMutation, useQueryClient } from "react-query";
import { Paging } from "app/models/paging";
import {
  fetchAccounts,
  deleteAccount,
  mutateAccountStatus,
  addAccount,
  setPrikey,
  unsetPrikey,
} from "../../services/eth.service";

export const ETH_ACCOUNT_LIST = "ETH_ACCOUNT_LIST";

export const useAccountListing = (pagination: Paging) => {
  return useQuery(
    [ETH_ACCOUNT_LIST, pagination],
    () => fetchAccounts(pagination),
    { keepPreviousData: true, enabled: false }
  );
};

export const useAddAccount = () => {
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

export const useMutateAccountStatus = () => {
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

export const useAccountDelete = () => {
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
