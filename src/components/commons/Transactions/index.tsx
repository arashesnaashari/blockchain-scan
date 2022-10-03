import clsx from 'clsx';
import React from 'react';
import { IBlock, ITransaction } from '../../../types';
import { fitString } from '../../../utils';
import Box from '../../cubes/Box';

export interface TransactionsProps {
  title: string;
  selectedBlock?: null | IBlock;
  transactions: Array<ITransaction>;
}

const Transactions: React.FunctionComponent<TransactionsProps> = ({
  title,
  transactions,
  selectedBlock,
}) => {
  return (
    <Box title={title}>
      <ul className="list-group list-group-flush">
        {transactions.map(el => (
          <li
            className={clsx('list-group-item d-flex justify-content-between align-items-start', {
              'list-group-item-info': selectedBlock?.transactions?.includes?.(el.txHash),
            })}
            key={el.txHash}
          >
            <div className="me-auto">
              <div className="fw-bold">
                <span className="text-muted">TxHash: </span> {fitString(el.txHash)}
              </div>
              <div className="fw-bold">
                <span className="text-muted">From: </span> {fitString(el.from)}
              </div>
              <div className="fw-bold">
                <span className="text-muted">To: </span> {fitString(el.to)}
              </div>
            </div>
            <span className="badge bg-primary rounded-pill">{el.amount}</span>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Transactions;
