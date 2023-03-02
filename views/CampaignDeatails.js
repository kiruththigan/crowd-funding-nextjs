import withLayout from "@/HOC/withLayout";
import {
  donateToCampaign,
  getCampaign,
  getDonators,
} from "@/web3/web3.service";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import StatusBar from "@/components/campaign-deatails/StatusBar";
import CountBoxesDetails from "@/components/campaign-deatails/CountBoxesDetails";
import FundingCard from "@/components/campaign-deatails/FundingCard";
import Donators from "@/components/campaign-deatails/Donators";
import Story from "@/components/campaign-deatails/Story";
import Creator from "@/components/campaign-deatails/Creator";

const CampaignDetails = () => {
  const router = useRouter();
  const { library } = useWeb3React();
  const [campaign, setCampaign] = useState({});
  const [donations, setDonations] = useState([]);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCampaignLoading, setIsCampaignLoading] = useState(false);
  const [display, setDisplay] = useState(false);

  const fetchCampaign = async (id) => {
    try {
      setIsCampaignLoading(true);
      const response = await getCampaign(id);
      setCampaign(response);
      setIsCampaignLoading(false);
      setDisplay(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchDonations = async (id) => {
    try {
      setIsLoading(true);
      const response = await getDonators(id);
      setDonations(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDonate = async () => {
    try {
      setIsLoading(true);
      const response = await donateToCampaign(
        campaign.id,
        amount,
        library.getSigner()
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchCampaign(router.query.id);
      fetchDonations(router.query.id);
    }
  }, [router]);

  if (!router.isReady) {
    return <Loader isLoading={true} />;
  }

  if (!campaign) {
    return (
      <div className="flex min-h-screen text-white items-center justify-center">
        404 Server Error
      </div>
    );
  }

  return (
    <div className="p-5 my-10 rounded-md">
      <Loader isLoading={isLoading} />
      <Loader isLoading={isCampaignLoading} />
      {display && (
        <div>
          <div className="w-full flex md:flex-row flex-col gap-[30px]">
            <div className="flex-1 flex-col">
              <img
                src={campaign.image}
                alt="campaign"
                className="w-full rounded-xl"
              />
              <StatusBar
                target={campaign?.target}
                amount={campaign?.amountCollected}
              />
            </div>

            <CountBoxesDetails
              campaign={campaign}
              donatorsCount={donations?.length}
            />
          </div>

          <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
              <Creator
                userImage="/assets/user-3.png"
                name={campaign?.name}
                owner={campaign?.owner}
              />

              <Story
                title={campaign?.title}
                description={campaign?.description}
              />

              <Donators donations={donations} />
            </div>

            <FundingCard
              amount={amount}
              handleAmountChange={(e) => setAmount(e.target.value)}
              handleDonate={handleDonate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default withLayout(CampaignDetails);
