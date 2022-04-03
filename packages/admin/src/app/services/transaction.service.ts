import { apiClient } from '../commons/axios';
import { Paging } from 'app/models/paging';
import { PaginationTxnResult } from 'app/pages/home/home.interface';

export const fetchTransactions = async (_paging: Paging) => {
  let url = `/v1/u/login`;
  return apiClient.get<PaginationTxnResult>(url);
};
