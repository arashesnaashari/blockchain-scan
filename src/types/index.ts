import { ReactNode } from 'react';

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
  id: string;
  transactions: Array<string>;
  winner: string;
}

export interface CommonProps {
  children?: ReactNode;
}
