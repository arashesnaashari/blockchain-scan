import React, { memo } from 'react';
import clsx from 'clsx';
import { IAccount } from '../../../types';
import Box from '../../cubes/Box';
import { fitString } from '../../../utils';

export interface AccountsProps {
  accounts: Array<IAccount>;
}

const Accounts: React.FunctionComponent<AccountsProps> = memo<AccountsProps>(
  ({ accounts }) => {
    return (
      <Box title="Latest Accounts">
        <ul className="list-group list-group-flush">
          {accounts.map(el => (
            <li
              className={clsx('list-group-item d-flex justify-content-between align-items-center', {
                disabled: el.isSuspend,
              })}
              key={el.address}
            >
              <p className="mb-0">
                {el.isSuspend ? <s>{fitString(el.address, 8)}</s> : fitString(el.address, 8)}
              </p>
              <span className="badge bg-primary rounded-pill">{el.balance}</span>
            </li>
          ))}
        </ul>
      </Box>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.accounts.length === nextProps.accounts.length;
  },
);

export default Accounts;
