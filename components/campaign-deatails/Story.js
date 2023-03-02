import { classNames } from "@/utils";
import React from "react";

function Story({ description, title, small }) {
  return (
    <div>
      {!small && (
        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
          Story
        </h4>
      )}

      <div
        className={classNames(
          !small && "font-epilogue flex flex-col justify-start gap-2 mt-[20px]"
        )}
      >
        <span
          className={classNames(
            !small
              ? "text-[#8a8b94] font-extrabold text-[20px]"
              : "font-semibold text-[16px] text-white leading-[26px] w-full overflow-hidden ",
            "font-epilogue text-left"
          )}
        >
          {title}
        </span>
        <div
          className={
            (!small
              ? "font-epilogue font-normal text-[16px]  text-justify "
              : "mt-[5px] font-epilogue font-normal",
            "font-epilogue text-left text-[#808191]")
          }
        >
          {description}
        </div>
      </div>
    </div>
  );
}

export default Story;
