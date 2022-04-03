import { useQuery } from 'react-query';
import { Paging } from 'app/models/paging';
import { fetchTransactions } from 'app/services/transaction.service';

export const WELUPS_USER_TRANSACTIONS = 'WELUPS_USER_TRANSACTIONS';

export const useUserTxnListing = (pagination: Paging) => {
  return useQuery(
    [WELUPS_USER_TRANSACTIONS, pagination],
    () => fetchTransactions(pagination),
    { keepPreviousData: true, enabled: false }
  );
};
