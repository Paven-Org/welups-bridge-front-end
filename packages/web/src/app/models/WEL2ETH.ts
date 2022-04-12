export interface WEL2ETH {
  eth_address?: string;
  amount?: number;
}

export interface RequestClaimResp {
  token_address?: string;
  amount?: string;
  request_id?: string;
  request_id_raw?: string;
  request_id_hex?: string;
  signature?: string;
  signature_hex?: string;
}

export interface Transaction {
  tran_hex?: string;
  tran_id?: string;
  tran_raw_hex?: string;
}
