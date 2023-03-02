import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ethers } from "ethers";
import { config } from "./web3.config";

export const Injected = new InjectedConnector({
  supportedChainIds: [56, 97],
});

export const WalletConnector = new WalletConnectConnector({
  rpc: {
    56: "https://bsc-dataseed2.binance.org",
  },
  chainId: 56,
  network: "binance",
  qrcode: true,
  qrcodeModalOptions: {
    mobileLinks: ["metamask", "trust"],
  },
  pollingInterval: 3000,
});

WalletConnector.networkId = 56;

const getWeb3Provider = () => {
  const providerRPC = {
    bsc: {
      name: "bsc",
      rpc: "https://data-seed-prebsc-1-s2.binance.org:8545",
      chainId: 97,
    },
  };

  const provider = new ethers.providers.StaticJsonRpcProvider(
    providerRPC.bsc.rpc,
    {
      chainId: providerRPC.bsc.chainId,
      name: providerRPC.bsc.name,
    }
  );

  return provider;
};

const getContractInstance = () => {
  const { contractAddress, contractAbi } = config;
  try {
    const provider = getWeb3Provider();
    const contractInstance = new ethers.Contract(
      contractAddress,
      JSON.parse(contractAbi),
      provider
    );
    return contractInstance;
  } catch (error) {
    console.log(error);
  }
};

export const getNoOfCampaigns = async () => {
  try {
    const contractInstance = getContractInstance();
    const response = await contractInstance.numberOfCampaigns();
    return parseInt(response);
  } catch (error) {
    console.log(error);
  }
};

export const getAllCampaigns = async () => {
  try {
    const contractInstance = getContractInstance();
    const campaigns = await contractInstance.getCampaigns();

    const parsedCompaigns = campaigns.map((campaign, i) => ({
      id: i,
      owner: campaign.owner,
      name: campaign.ownerName,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
    }));

    return parsedCompaigns;
  } catch (error) {
    console.log(error);
  }
};

export const getCampaign = async (_id) => {
  try {
    const contractInstance = getContractInstance();
    const campaign = await contractInstance.campaigns(_id);

    if (campaign.owner == 0) {
      return;
    }

    const parsedCompaigns = {
      name: campaign.ownerName,
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      id: _id,
    };

    return parsedCompaigns;
  } catch (error) {
    console.log(error);
  }
};

export const getUserCampaigns = async (_account) => {
  try {
    const allCampaigns = await getAllCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === _account
    );

    return filteredCampaigns;
  } catch (error) {
    console.log(error);
  }
};

export const getDonators = async (_id) => {
  try {
    const contractInstance = getContractInstance();
    const donations = await contractInstance.getDonators(parseInt(_id));
    const parsedDonations = [];
    for (let i = 0; i < donations[0].length; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  } catch (error) {
    console.log(error);
  }
};

export const createCampaign = async (address, signer, form) => {
  try {
    const contractInstance = getContractInstance();
    const contractInstanceWithSigner = contractInstance.connect(signer);
    const txReceipt = await contractInstanceWithSigner.createCampaign(
      address,
      form.name,
      form.title,
      form.description,
      ethers.utils.parseUnits(form.target, 18),
      new Date(form.deadline).getTime(),
      form.image
    );
    const result = await txReceipt.wait();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const donateToCampaign = async (id, amount, signer) => {
  try {
    const contractInstance = getContractInstance();
    const contractInstanceWithSigner = contractInstance.connect(signer);
    const txReceipt = await contractInstanceWithSigner.donateToCampaign(id, {
      value: ethers.utils.parseEther(amount),
    });
    const result = await txReceipt.wait();
    return result;
  } catch (error) {
    console.log(error);
  }
};
