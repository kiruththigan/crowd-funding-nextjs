import React from "react";

function Info() {
  return (
    <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px] ">
      <img
        src="/assets/money.svg"
        alt="money"
        className="w-[40px] h-[40px] object-contain "
      />
      <div className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
        You will get 100% of the raised amount
      </div>
    </div>
  );
}

export default Info;
