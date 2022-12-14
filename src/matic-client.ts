import { POSClient, use } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-ethers";

import { BigNumber, providers, utils, Wallet } from "ethers";

import config from "../config";
import provider from "./provider";
const { user1, chainId } = config;

use(Web3ClientPlugin);

const matic = new POSClient();
const getMaticClient = async () => {
  await matic.init({
    // log: true,
    network: chainId.root === "1" ? "mainnet" : "testnet",
    version: chainId.root === "1" ? "v1" : "mumbai",
    parent: {
      provider: new Wallet(user1.privateKey, provider.parent.jsonRpcProvider),
      defaultConfig: {
        from: user1.address,
      },
    },
    child: {
      provider: new Wallet(user1.privateKey, provider.child.jsonRpcProvider),
      defaultConfig: {
        from: user1.address,
      },
    },
  });
};
getMaticClient()
  .then(() => {
    console.log("Matic Client Initialized Successfully");
  })
  .catch((err) => {
    console.error("Something went wrong while Initializing Matic client", err);
  });
export default matic;

export async function getGasPrice(
  provider: providers.BaseProvider,
  chain: String
): Promise<BigNumber> {
  const gasPrice = await provider.getGasPrice();
  console.log(
    `${chain} chain gas price: ${utils.formatUnits(gasPrice, "gwei")} gwei`
  );
  return gasPrice;
}
