import { IAccount, ITransaction } from '../types';

export const transactionValidation = (
  transaction: ITransaction,
  from: IAccount,
  to: IAccount,
): boolean => {
  return !from.isSuspend && !to.isSuspend && transaction.amount + transaction.fee <= from.balance;
};

export const changeAccountBalance = (
  account: IAccount,
  changes: number,
  type: 'add' | 'minus',
): IAccount => {
  const mul = type === 'add' ? 1 : -1;
  return {
    ...account,
    balance: Number((account.balance + mul * changes).toPrecision(4)),
  };
};

export const suspendAccount = (account: IAccount): IAccount => {
  return {
    ...account,
    isSuspend: true,
  };
};

export const findAccountIndexFromAddress = (address: string, accounts: Array<IAccount>): number => {
  return accounts.findIndex(el => el.address === address);
};
