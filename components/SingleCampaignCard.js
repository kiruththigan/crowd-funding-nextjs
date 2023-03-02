import { daysLeft } from "@/utils";
import React from "react";
import CountBox from "./campaign-deatails/CountBox";
import Creator from "./campaign-deatails/Creator";
import Story from "./campaign-deatails/Story";

const SimpleCampaignCard = ({ campaign, handleClick }) => {
  const remainingDays = daysLeft(campaign.deadline);

  return (
    <div
      className="flex flex-col justify-between w-[270px] h-[470px] rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={campaign.image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col justify-between p-4 h-full">
        <div className="flex flex-row items-center justify-between mb-[18px] ">
          <div className="flex flex-row">
            <img
              src="/assets/type.svg"
              alt="tag"
              className="w-[17px] h-[17px] object-contain"
            />
            <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
              Education
            </p>
          </div>
        </div>

        <div className="w-full h-[125px] overflow-hidden">
          <Story
            title={campaign.title}
            description={campaign.description}
            small={true}
          />
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <CountBox
            title={`Raised of ${campaign.target}`}
            value={campaign.amountCollected}
            small={true}
          />
          <CountBox title={"Days Left"} value={remainingDays} small={true} />
        </div>

        <Creator
          userImage="/assets/user-3.png"
          name={campaign?.name}
          owner={campaign?.owner}
          small={true}
        />
      </div>
    </div>
  );
};

export default SimpleCampaignCard;
