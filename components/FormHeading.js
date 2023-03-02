import React from "react";

function FormHeading({title}) {
  return (
    <div className="text-center mx-auto p-[16px] min-w-full sm:min-w-[400px] bg-[#3a3a43] rounded-[10px] ">
      <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white ">
        {title}
      </h1>
    </div>
  );
}

export default FormHeading;
