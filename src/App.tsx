import React from "react";
import { useData, useMaker } from "./hooks";

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const {
    accounts,
    transactions,
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
    <div>
      {accounts.map((el) => (
        <p key={el.address}>{el.address} {el.balance}</p>
      ))}
    </div>
  );
};

export default App;
