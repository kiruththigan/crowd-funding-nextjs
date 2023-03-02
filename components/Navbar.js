import { navlinks } from "@/constance";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ChainCheck from "./ChainCheck";
import Modal from "./Modal";

function Navbar() {
  const route = useRouter();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { account, deactivate } = useWeb3React();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleConnectButton = () => {
    if (account) {
      try {
        deactivate();
        window.localStorage.removeItem("userData");
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowModal(true);
      setToggleDrawer(false);
    }
  };

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="hidden sm:flex justify-between h-12 py-2 px-4 text-white bg-[#2c2f32] rounded-md">
        {/* left elements */}
        <div className="my-auto gap-6 flex">
          <div>
            <Link href={"/"}>
              <img src="/assets/logo.svg" />
            </Link>
          </div>
          <div>
            {navlinks.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className={classNames(
                  route.pathname == item.link
                    ? "text-[#07a3b2]"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "px-3 py-[9px] rounded-md text-md font-semibold"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* right elements */}
        <div className="my-auto flex gap-6">
          <div>
            <button
              onClick={handleConnectButton}
              className={classNames(
                account
                  ? "text-[#d10b0b] border-[#d10b0b] border-[1px] hover:bg-[#d10b0b]"
                  : "text-[#07a3b2] border-[#07a3b2] border-[1px] hover:bg-[#07A3b2]",
                "font-semibold  hover:text-white py-1 px-2 rounded-md"
              )}
            >
              {account ? "Disconnect" : "Connect"}
            </button>
          </div>
          <div className="h-[35px] w-[35px] rounded-full overflow-hidden">
            <Link href={"/profile"}>
              <img src="/assets/icons8-avatar-67.png" />
            </Link>
          </div>
        </div>
      </div>

      {/* for small scrren */}
      <div className="sm:hidden flex justify-between">
        <div>
          <Link href={"/"}>
            <img src="/assets/logo.svg" />
          </Link>
        </div>
        <div>
          <button onClick={() => setToggleDrawer((prev) => !prev)}>
            <img src="/assets/menu.svg" />
          </button>
        </div>
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((item) => (
              <Link
                href={item.link}
                key={item.name}
                className={`flex p-4 
                ${route.pathname == item.link && "text-[#07a3b2]"}`}
              >
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    route.pathname == item.link ? "grayscale-0" : "grayscale"
                  }`}
                />
                <span
                  className={`ml-[20px] font-epilogue font-semibold ${
                    route.pathname == item.link
                      ? "text-[#07a3b2]"
                      : "text-[#ffffff]"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </ul>

          {/* connection button */}
          <div className="flex mx-4">
            <button
              onClick={handleConnectButton}
              className={classNames(
                account
                  ? "text-[#d10b0b] border-[#d10b0b] border-[1px] hover:bg-[#d10b0b]"
                  : "text-[#07a3b2] border-[#07a3b2] border-[1px]",
                "font-semibold  hover:text-white hover:bg-[#07A3b2] py-1 px-2 rounded-md"
              )}
            >
              {account ? "Disconnect" : "Connect"}
            </button>
          </div>
        </div>
      </div>

      {/* chain alerts */}
      <ChainCheck isConnected={isConnected} setIsConnected={setIsConnected} />

      {/* modal for connection */}
      <Modal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        setIsConnected={setIsConnected}
      />
    </div>
  );
}

export default Navbar;
