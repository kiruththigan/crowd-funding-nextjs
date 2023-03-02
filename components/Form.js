import { createCampaign } from "@/web3/web3.service";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import FormField from "./FormField";
import Info from "./Info";
import Loader from "./Loader";

function Form() {
  const { account, library } = useWeb3React();
  const router = useRouter();
  const [date, setDate] = useState();
  const currentDateTime = new Date();
  const [isLodingTransaction, setIsLodingTransaction] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const createNewCampaign = async () => {
    try {
      setIsLodingTransaction(true);
      const response = await createCampaign(account, library.getSigner(), form);
      setIsLodingTransaction(false);
      if (response?.status) {
        setForm({
          name: "",
          title: "",
          description: "",
          target: "",
          deadline: "",
          image: "",
        });
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
      setIsLodingTransaction(false);
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    createNewCampaign();
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  useEffect(() => {
    var today =
      currentDateTime.getFullYear() +
      "-0" +
      (currentDateTime.getMonth() + 1) +
      "-" +
      currentDateTime.getDate();
    setDate(today);
  });

  return (
    <>
      <Loader isLoading={isLodingTransaction} />
      <form
        method="POST"
        onSubmit={handlerSubmit}
        className="w-full flex flex-col gap-[30px]"
      >
        <div className="flex flex-col md:flex-row gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <Info />

        <div className="flex flex-col md:flex-row gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target}
            min={0.1}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />

          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            min={date}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder="Place image url of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <div className="px-4 py-3 sm:px-6">
          <button
            disabled={!account}
            type="submit"
            className="disabled:opacity-50 flex justify-center mx-auto rounded-md border border-transparent bg-indigo-600 p-[15px] text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit new campaign
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
