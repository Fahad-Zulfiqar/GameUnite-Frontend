import React, { useEffect } from "react";
import EthName from "../EthName";
import "./account.css";

const Account = ({ accounts, connect }) => {
  const isLoggedIn = accounts.length > 0;

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <EthName address={accounts[0]} />
        </div>
      ) : (
        <button onClick={connect}>Connect</button>
      )}
    </div>
  );
};

export default Account;
