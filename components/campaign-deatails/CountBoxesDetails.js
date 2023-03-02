import { daysLeft } from "@/utils";
import React, { useEffect, useState } from "react";
import CountBox from "./CountBox";

function CountBoxesDetails({ campaign, donatorsCount }) {
  const [remainingDays, setRemainingDays] = useState(0);

  useEffect(() => {
    setRemainingDays(daysLeft(campaign.deadline));
  }, [campaign]);

  return (
    <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
      <CountBox
        title={"Days Left"}
        value={remainingDays == "NaN" ? 0 : remainingDays}
      />
      <CountBox
        title={`Raised of ${campaign?.target}`}
        value={campaign?.amountCollected}
      />
      <CountBox title={"Total Backers"} value={donatorsCount} />
    </div>
  );
}

export default CountBoxesDetails;
