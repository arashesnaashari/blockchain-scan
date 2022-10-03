import React from 'react';
import Accounts from './components/commons/Accounts';
import Blocks from './components/commons/Blocks';
import Transactions from './components/commons/Transactions';
import { useData, useMaker } from './hooks';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const {
    accounts,
    successTransactions,
    failTransactions,
    blocks,
    addNewAccount,
    addNewBlock,
    addNewTransaction,
  } = useData();
  useMaker({
    accounts,
    onMakeAccount: addNewAccount,
    onMakeBlock: addNewBlock,
    onMakeTransaction: addNewTransaction,
  });

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Blockchain Scan</h1>
      <div className="row">
        <div className="col-lg-6 col-12">
          <Blocks blocks={blocks} />
        </div>
        <div className="col-lg-6 col-12">
          <Accounts accounts={accounts} />
        </div>
        <div className="col-lg-6 col-12">
          <Transactions title="Latest Success Transactions" transactions={successTransactions} />
        </div>
        <div className="col-lg-6 col-12">
          <Transactions title="Latest Failed Transactions" transactions={failTransactions} />
        </div>
      </div>
    </div>
  );
};

export default App;
