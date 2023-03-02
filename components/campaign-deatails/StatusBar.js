import { calculateBarPercentage } from "@/utils";
import React from "react";

function StatusBar({ target, amount }) {
  return (
    <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
      <div
        className="absolute h-full bg-[#4acd8d]"
        style={{
          width: `${calculateBarPercentage(target, amount)}%`,
          maxWidth: "100%",
        }}
      ></div>
    </div>
  );
}

export default StatusBar;
