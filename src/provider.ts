import { getDefaultProvider, providers } from "ethers";
import config from "../config";

const { chainId, rpc } = config;

const childProviderList = [
  // public providers
  new providers.AlchemyProvider("maticmum"),
  new providers.InfuraProvider("maticmum"),
  new providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com"),
  // new providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai"),
];

const parentProviderList = [
  new providers.AlchemyProvider("goerli"),
  new providers.InfuraProvider("goerli"),
  // new providers.JsonRpcProvider("https://rpc.goerli.mudit.blog"),

  new providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  ),
];

const parentProvider =
  chainId.root === "1"
    ? getDefaultProvider(parseInt(chainId.root))
    : new providers.FallbackProvider(parentProviderList);
const childProvider =
  chainId.child === "137"
    ? getDefaultProvider(parseInt(chainId.child))
    : new providers.FallbackProvider(childProviderList);

export default {
  parent: { jsonRpcProvider: new providers.JsonRpcProvider(rpc.root), fallbackProvider: parentProvider },
  child: { jsonRpcProvider: new providers.JsonRpcProvider(rpc.child), fallbackProvider: childProvider },
};