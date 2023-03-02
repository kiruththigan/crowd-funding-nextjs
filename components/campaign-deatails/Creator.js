import { classNames } from "@/utils";
import React from "react";

function Creator({ userImage, name, owner, small }) {
  return (
    <div>
      {!small && (
        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
          Creator
        </h4>
      )}

      <div
        className={classNames(
          small ? "gap-[12px]" : "flex-wrap gap-[14px]",
          "flex flex-row items-center mt-[20px]"
        )}
      >
        <div
          className={classNames(
            small ? "w-[30%] h-[30%]" : "w-[52px] h-[52px]",
            "items-center justify-center rounded-full overflow-hidden"
          )}
        >
          <img
            src={userImage}
            alt="user"
            className="w-[100%] h-[100%] object-contain"
          />
        </div>

        <div
          className={classNames(
            small
              ? "font-normal text-[12px] text-[#808191]"
              : "font-semibold text-[14px] text-white",
            "flex flex-col font-epilogue  truncate"
          )}
        >
          <span>{name}</span>
          <span>{owner}</span>
        </div>
      </div>
    </div>
  );
}

export default Creator;
