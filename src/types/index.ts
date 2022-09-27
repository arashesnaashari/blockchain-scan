export interface IAccount {
  address: string;
  balance: number;
  isSuspend: boolean;
}

export interface ITransaction {
  from: string;
  to: string;
  amount: number;
  fee: number;
  isSuccess?: boolean;
  txHash: string;
}

export interface IBlock {
  id: number;
  transactions: Array<string>;
  winner: string;
}
