import Navbar from "@/components/Navbar";
import React from "react";

const withLayout = (PageComponent) => {
  return function withPage({ ...props }) {
    return (
      <>
        <div className="bg-[#13131a]">
          <div className="flex flex-col gap-[30px] container p-5 min-h-screen mx-auto">
            <Navbar />
            <PageComponent />
          </div>
        </div>
      </>
    );
  };
};

export default withLayout;
