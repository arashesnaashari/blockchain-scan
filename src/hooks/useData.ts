import { useEffect, useMemo, useRef, useState } from 'react';
import { BLOCK_WINNER_REWARD } from '../constants';
import { ADDRESSES } from '../data';
import {
  changeAccountBalance,
  findAccountIndexFromAddress,
  suspendAccount,
  transactionValidation,
} from '../functions';
import { IAccount, IBlock, ITransaction } from '../types';

const useData = () => {
  const accountsRef = useRef<Array<IAccount>>([]);
  const [accounts, setAccounts] = useState<Array<IAccount>>([]);
  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);
  const [blocks, setBlocks] = useState<Array<IBlock>>([]);

  const successTransactions = useMemo(() => {
    return transactions.filter(el => el.isSuccess);
  }, [transactions]);

  const failTransactions = useMemo(() => {
    return transactions.filter(el => !el.isSuccess);
  }, [transactions]);

  const addNewAccount = (address: string) => {
    console.log('New Address', address);
    setAccounts(prev => {
      console.log(22, prev.length);
      return [...prev, { address, balance: 0, isSuspend: false }];
    });
  };

  const addNewTransaction = (transaction: ITransaction) => {
    // console.log('New Transaction', transaction);
    const fromIdx = findAccountIndexFromAddress(transaction.from, accountsRef.current);
    const toIdx = findAccountIndexFromAddress(transaction.to, accountsRef.current);

    if (fromIdx === -1 || toIdx === -1) return;
    const isTransactionValid = transactionValidation(
      transaction,
      accountsRef.current[fromIdx],
      accountsRef.current[toIdx],
    );
    if (isTransactionValid) {
      accountsRef.current[fromIdx] = changeAccountBalance(
        accountsRef.current[fromIdx],
        transaction.amount + transaction.fee,
        'minus',
      );
      accountsRef.current[toIdx] = changeAccountBalance(
        accountsRef.current[toIdx],
        transaction.amount,
        'add',
      );
    } else {
      accountsRef.current[fromIdx] = suspendAccount(accountsRef.current[fromIdx]);
    }
    setAccounts(accountsRef.current);
    setTransactions(prev => [...prev, { ...transaction, isSuccess: isTransactionValid }]);
  };

  const addNewBlock = (block: IBlock) => {
    // console.log('New Block', block);
    const idx = findAccountIndexFromAddress(block.winner, accountsRef.current);
    accountsRef.current[idx] = changeAccountBalance(
      accountsRef.current[idx],
      BLOCK_WINNER_REWARD,
      'add',
    );
    setAccounts(accountsRef.current);
    setBlocks(prev => [...prev, block]);
  };

  useEffect(() => {
    setAccounts(ADDRESSES);
  }, []);

  useEffect(() => {
    console.log(2, accounts);
    accountsRef.current = [...accounts];
  }, [accounts]);

  return {
    accounts,
    transactions,
    blocks,
    successTransactions,
    failTransactions,
    addNewAccount,
    addNewTransaction,
    addNewBlock,
  };
};

export default useData;
