import { useEffect, useRef } from 'react';
import {
  NEW_ADDRESS_INTERVAL,
  NEW_BLOCK_INTERVAL,
  NEW_TRANSACTION_INTERVAL,
  TRANSACTION_FEE,
} from '../constants';
import { IAccount, IBlock, ITransaction } from '../types';
import {
  addressGenerator,
  amountGenerator,
  idGenerator,
  randomArrSelect,
  txHashGenerator,
} from '../utils';
import useInterval from './useInterval';

export interface UseMakerProps {
  accounts: Array<IAccount>;
  onMakeAccount: (address: string) => void;
  onMakeTransaction: (transaction: ITransaction) => void;
  onMakeBlock: (block: IBlock) => void;
}

const useMaker = ({ accounts, onMakeAccount, onMakeBlock, onMakeTransaction }: UseMakerProps) => {
  const accountsRef = useRef<Array<IAccount>>([]);
  const currentTransactions = useRef<Array<ITransaction>>([]);

  const onMakeAddressHandler = () => {
    onMakeAccount(addressGenerator());
  };

  const onMakeTransactionHandler = () => {
    const newTransaction: ITransaction = {
      fee: TRANSACTION_FEE,
      amount: amountGenerator(),
      txHash: txHashGenerator(),
      to: randomArrSelect(accountsRef.current)?.address,
      from: randomArrSelect(accountsRef.current)?.address,
    };
    onMakeTransaction(newTransaction);
    currentTransactions.current.push(newTransaction);
  };

  const onMakeBlockHandler = () => {
    onMakeBlock({
      id: idGenerator(),
      winner: randomArrSelect(accountsRef.current)?.address,
      transactions: currentTransactions.current.map(el => el.txHash),
    });
    currentTransactions.current = [];
  };

  useEffect(() => {
    accountsRef.current = accounts;
  }, [accounts]);

  useInterval(NEW_BLOCK_INTERVAL, onMakeBlockHandler);
  useInterval(NEW_ADDRESS_INTERVAL, onMakeAddressHandler);
  useInterval(NEW_TRANSACTION_INTERVAL, onMakeTransactionHandler);
};

export default useMaker;
