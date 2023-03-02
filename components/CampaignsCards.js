import { useRouter } from "next/router";
import React from "react";
import FundCard from "./SingleCampaignCard";

function CampaignsCards({ campaigns, adjective }) {
  const route = useRouter();
  return (
    <>
      <div>
        {adjective && adjective + " "} Campaigns ({campaigns?campaigns.length:0})
      </div>

      <div className="flex flex-wrap justify-around my-9 gap-6">
        {campaigns?.map((campaign, i) => (
          <FundCard
            key={i}
            campaign={campaign}
            handleClick={() => {
              route.push("/campaign-details/" + campaign.id);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default CampaignsCards;
