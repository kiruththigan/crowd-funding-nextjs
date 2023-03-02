import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Injected, WalletConnector } from "@/web3/web3.service";

function ChainProvider({ children }) {
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const userData = window.localStorage.getItem("userData");

    if (userData) {
      const userDataObj = JSON.parse(userData);
      if (userDataObj.provider === "injected" && userDataObj.isLoggedIn) {
        Injected.isAuthorized()
          .then((isAuthorized) => {
            setLoaded(true);
            if (isAuthorized && !networkActive && !networkError) {
              activateNetwork(Injected);
            }
          })
          .catch(() => {
            setLoaded(true);
          });
      }

      if (userDataObj.provider === "walletconnect" && userDataObj.isLoggedIn) {
        if (!networkActive && !networkError) {
          activateNetwork(WalletConnector);
        }
      }
    }
  }, [activateNetwork, networkActive, networkError]);

  if (loaded) {
    return children;
  }

  return children;
}

export default ChainProvider;
