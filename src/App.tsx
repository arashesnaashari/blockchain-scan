import React, { useState } from 'react';
import Accounts from './components/commons/Accounts';
import Blocks from './components/commons/Blocks';
import Transactions from './components/commons/Transactions';
import { useData, useMaker } from './hooks';
import { IBlock } from './types';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const [selectedBlock, setSelectedBlock] = useState<IBlock | null>(null);
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

  const onChangeSelectedBlockHandler = (block: IBlock) => {
    setSelectedBlock(prev => {
      return prev?.id === block.id ? null : block;
    });
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Blockchain Scan</h1>
      <div className="row gy-4">
        <div className="col-lg-6 col-12">
          <Blocks
            blocks={blocks}
            selectedBlock={selectedBlock}
            onChange={onChangeSelectedBlockHandler}
          />
        </div>
        <div className="col-lg-6 col-12">
          <Accounts accounts={accounts} />
        </div>
        <div className="col-lg-6 col-12">
          <Transactions
            title="Latest Success Transactions"
            transactions={successTransactions}
            selectedBlock={selectedBlock}
          />
        </div>
        <div className="col-lg-6 col-12">
          <Transactions
            title="Latest Failed Transactions"
            transactions={failTransactions}
            selectedBlock={selectedBlock}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
