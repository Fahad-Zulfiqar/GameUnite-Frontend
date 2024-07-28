import { useState, useEffect } from "react";
// import { web3 } from "../../lib/web3";

import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const EthName = function ({ address }) {
  let formattedAddress = address.substr(0, 4) + "...." + address.substr(-4);

  let icon = <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />;

  return (
    <div className="eth-name">
      <div className="icon">{icon}</div>

      <div className="name">
        <span className="primary">{formattedAddress}</span>
        <span className="secondary">{/* formatted address here */}</span>
      </div>
    </div>
  );
};

export default EthName;
