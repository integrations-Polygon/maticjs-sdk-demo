import dotenv from "dotenv";
import path from "path";

// load env file and populate
dotenv.config({
  path: path.join(__dirname, ".env"),
});
export default {
  rpc: {
    root: process.env.ROOT_RPC,
    child: process.env.MATIC_RPC || "https://rpc-mumbai.matic.today",
  },
  chainId: {
    root: process.env.ROOT_CHAIN_ID,
    child: process.env.MATIC_CHAIN_ID,
  },
  pos: {
    parent: {
      // dummy erc20 deployed by Polygon Team on the Goerli Chain
      // If you deploy your ERC20 Update the address below
      erc20: "0x655F2166b0709cd575202630952D71E2bB0d61Af",
    },
    // If you deploy your ERC20 Update the address below
    // dummy erc20 deployed by Polygon Team on the Mumbai Chain
    child: {
      erc20: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
    },
  },
  user1: {
    // '<paste your private key here>' - A sample private key prefix with `0x`
    privateKey: process.env.USER1_PRIVATE_KEY,
    //'<paste address belonging to private key here>', Your address
    address: process.env.USER1_FROM,
  },
  user2: {
    privateKey: process.env.USER2_PRIVATE_KEY,

    address: process.env.USER2_FROM,
  },
  server: {
    port: process.env.PORT || "8080",
  },
};
