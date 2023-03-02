import withLayout from "@/HOC/withLayout";
import React from "react";
import Form from "@/components/Form";
import FormHeading from "@/components/FormHeading";

const CreateCampaign = () => {
  return (
    <div className="flex flex-col rounded-[10px] w-full bg-[#1c1c24] p-4 my-[52px] gap-[30px] text-white">
      <FormHeading title="Start a Campaign" />
      <Form />
    </div>
  );
};

export default withLayout(CreateCampaign);
