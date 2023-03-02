import { classNames } from "@/utils";
import React from "react";

function CountBox({ handlerClick, value, title, small }) {
  return (
    <div
      className={classNames(
        !small ? "w-[150px]" : "items-center",
        "flex flex-col font-epilogue"
      )}
      onClick={handlerClick}
    >
      <div
        className={classNames(
          !small
            ? "w-full font-bold text-[30px] text-white bg-[#1c1c24] p-3 rounded-t-[10px]"
            : "font-semibold text-[14px] text-[#b2b3bd] leading-[22px]",
          "overflow-hidden text-center truncate"
        )}
      >
        {value}
      </div>

      <div
        className={classNames(
          !small
            ? "w-full text-[16px] bg-[#28282e] px-3 py-2 text-center "
            : "mt-[3px] text-[12px] leading-[18px] sm:max-w-[120px] truncate",
          "font-normal text-[#808191] break-all"
        )}
      >
        {title}
      </div>
    </div>
  );
}

export default CountBox;
