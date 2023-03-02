import { useWeb3React } from "@web3-react/core";
import React from "react";
import FormField from "../FormField";

function FundingCard({ amount, handleAmountChange, handleDonate }) {
  const { account } = useWeb3React();
  return (
    <div className="flex-1">
      <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
        Fund
      </h4>

      <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
        <div className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
          Fund the campaign
        </div>

        <div className="mt-[30px]">
          <FormField
            min={0.1}
            inputType="number"
            placeholder="ETH 0.1"
            value={amount}
            handleChange={handleAmountChange}
          />

          <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
            <div className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
              Back it because you believe in it.
            </div>
            <div className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
              Support the project for no reward, just because it speaks to you.
            </div>
          </div>

          <button
            disabled={!account}
            type="button"
            className="w-full py-[10px] outline-none text-[#07A3b2] hover:text-white hover:bg-[#07A3b2] border-[1px] border-[#07A3b2] rounded-[10px] disabled:opacity-30"
            onClick={handleDonate}
          >
            Fund Campaign
          </button>
        </div>
      </div>
    </div>
  );
}

export default FundingCard;
