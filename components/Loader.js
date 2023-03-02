import React from "react";

export default function Loader({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-[2px] flex justify-center items-center">
          <img src="/assets/loader.svg" className="mx-auto" />
        </div>
      )}
    </>
  );
}
