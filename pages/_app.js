import ChainProvider from "@/providers/ChainProvider";
import Store from "@/store/Store";
import "@/styles/globals.css";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";

const getLibrary = (provider) => {
  return new Web3Provider(provider);
};

export default function App({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={Store}>
        <ChainProvider>
          <Component {...pageProps} />
        </ChainProvider>
      </Provider>
    </Web3ReactProvider>
  );
}
