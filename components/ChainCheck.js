import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

function ChainCheck({ isConnected, setIsConnected }) {
  const { account } = useWeb3React();

  useEffect(() => {
    if (isConnected) {
      setTimeout(() => {
        setIsConnected(false);
      }, 2000);
    }
  }, [isConnected]);
  return (
    <>
      <div className="w-full text-center">
        {isConnected ? (
          <div
            className="border-[#07a3b2] text-[#07a3b2] w-full px-4 py-1 items-cente leading-none border-[1px] rounded-[5px] flex lg:inline-flex"
            role="alert"
          >
            <span className="mr-2 text-left text-xs flex-auto">
              Wallet Connected .
            </span>
          </div>
        ) : (
          !account && (
            <div className="border-[#fb923c] text-[#fb923c] w-full px-4 py-1 items-cente leading-none border-[1px] rounded-[5px] flex lg:inline-flex">
              <span className="mr-2 text-left text-xs flex-auto">
                Please Connect the Binance Smart Chain Testnet .
              </span>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default ChainCheck;
