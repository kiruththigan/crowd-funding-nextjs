import withLayout from "@/HOC/withLayout";
import { getAllCampaigns, getNoOfCampaigns } from "@/web3/web3.service";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import CampaignCards from "@/components/CampaignsCards";

function Index() {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllCampaigns = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCampaigns();
      setCampaigns(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCampaigns();
  }, []);

  return (
    <div className="py-6 text-white ">
      <Loader isLoading={isLoading} />
      <CampaignCards adjective="All" campaigns={campaigns} />
    </div>
  );
}

export default withLayout(Index);
