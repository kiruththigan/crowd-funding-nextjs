import React from "react";

function Donators({ donations }) {
  return (
    <div>
      <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
        Donators
      </h4>

      <div className="mt-[20px] flex flex-col gap-4">
        {donations?.length > 0 ? (
          donations.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-4"
            >
              <div className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                {index + 1}. {item.donator}
              </div>

              <div className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px]">
                {item.donation}
              </div>
            </div>
          ))
        ) : (
          <div className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
            No donators yet. Be the first one!
          </div>
        )}
      </div>
    </div>
  );
}

export default Donators;
