import withLayout from "@/HOC/withLayout";
import { getUserCampaigns } from "@/web3/web3.service";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import CampaignCards from "@/components/CampaignsCards";

const Profile = () => {
  const { account } = useWeb3React();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserCampaigns = async () => {
    try {
      setIsLoading(true);
      if (account) {
        const response = await getUserCampaigns(account);
        setCampaigns(response);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCampaigns();
  }, [account]);

  return (
    <div className="py-6 text-white ">
      <Loader isLoading={isLoading} />
      <CampaignCards adjective="Your" campaigns={campaigns} />
    </div>
  );
};

export default withLayout(Profile);
