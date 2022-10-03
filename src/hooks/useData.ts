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
  // const accountsRef = useRef<Array<IAccount>>([]);
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
    setAccounts(prev => [...prev, { address, balance: 0, isSuspend: false }]);
  };

  const addNewTransaction = (transaction: ITransaction) => {
    // console.log('New Transaction', transaction);

    // const fromIdx = findAccountIndexFromAddress(transaction.from, prev);
    // const toIdx = findAccountIndexFromAddress(transaction.to, prev);
    // if (fromIdx === -1 || toIdx === -1) return;
    // const isTransactionValid = transactionValidation(
    //   transaction,
    //   accountsRef.current[fromIdx],
    //   accountsRef.current[toIdx],
    // );
    // if (isTransactionValid) {
    //   accountsRef.current[fromIdx] = changeAccountBalance(
    //     accountsRef.current[fromIdx],
    //     transaction.amount + transaction.fee,
    //     'minus',
    //   );
    //   accountsRef.current[toIdx] = changeAccountBalance(
    //     accountsRef.current[toIdx],
    //     transaction.amount,
    //     'add',
    //   );
    // } else {
    //   accountsRef.current[fromIdx] = suspendAccount(accountsRef.current[fromIdx]);
    // }
    let isTransactionValid = false;
    setAccounts(prevState => {
      const prev = [...prevState];
      const fromIdx = findAccountIndexFromAddress(transaction.from, prev);
      const toIdx = findAccountIndexFromAddress(transaction.to, prev);
      isTransactionValid = transactionValidation(transaction, prev[fromIdx], prev[toIdx]);
      if (isTransactionValid) {
        prev[fromIdx] = changeAccountBalance(
          prev[fromIdx],
          transaction.amount + transaction.fee,
          'minus',
        );
        prev[toIdx] = changeAccountBalance(prev[toIdx], transaction.amount, 'add');
      } else {
        prev[fromIdx] = suspendAccount(prev[fromIdx]);
      }
      return prev;
    });
    setTransactions(prev => [...prev, { ...transaction, isSuccess: isTransactionValid }]);
  };

  const addNewBlock = (block: IBlock) => {
    // console.log('New Block', block);

    setAccounts(prev => {
      const idx = findAccountIndexFromAddress(block.winner, prev);
      prev[idx] = changeAccountBalance(prev[idx], BLOCK_WINNER_REWARD, 'add');
      return prev;
    });
    setBlocks(prev => [...prev, block]);
  };

  useEffect(() => {
    setAccounts(ADDRESSES);
  }, []);

  // useEffect(() => {
  //   console.log(2, accounts);
  //   accountsRef.current = [...accounts];
  // }, [accounts]);

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
