import express from "express";
import { utils } from "ethers";

import config from "../config";
import matic, { getGasPrice } from "./matic-client";
import provider from "./provider";
import { errorHandler } from "./errorMiddleware";
const { pos, user1 } = config;

const app = express();

app.use(express.json());

app.use(errorHandler);

app.get("/erc20-balance", async (req, res, next) => {
  try {
    let { isParent }: { isParent: boolean } = req.query as any;
    const erc20 = matic.erc20(
      isParent ? pos.parent.erc20 : pos.child.erc20,
      isParent
    );
    const balance = await erc20.getBalance(config.user1.address);
    return res.json({ balance: utils.formatUnits(balance, 18) });
  } catch (error) {
    next(error);
  }
});

app.post("/parent-approve-erc20", async (req, res, next) => {
  try {
    const { amount } = req.body;

    const parsedAmount = utils.parseUnits(amount, 18);

    const rootTokenErc20 = matic.erc20(pos.parent.erc20, true);

    const gasPrice = await getGasPrice(provider.parent, "root");

    const result = await rootTokenErc20.approve(parsedAmount.toHexString(), {
      maxPriorityFeePerGas: gasPrice.toHexString(),
      maxFeePerGas: gasPrice.toHexString(),
    });

    const txnHash = await result.getTransactionHash();
    console.log(`txnResultLink: https://goerli.etherscan.io/tx/${txnHash}`);

    return res.json({
      hash: txnHash,
      link: `https://goerli.etherscan.io/tx/${txnHash}`,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/parent-deposit-erc20", async (req, res, next) => {
  try {
    const { amount } = req.body;

    const parsedAmount = utils.parseUnits(amount, 18);

    const rootTokenErc20 = matic.erc20(pos.parent.erc20, true);

    const gasPrice = await getGasPrice(provider.parent, "root");

    const result = await rootTokenErc20.deposit(
      parsedAmount.toHexString(),
      user1.address,
      {
        maxPriorityFeePerGas: gasPrice.toHexString(),
        maxFeePerGas: gasPrice.toHexString(),
      }
    );

    const txnHash = await result.getTransactionHash();
    console.log(`txnResultLink: https://goerli.etherscan.io/tx/${txnHash}`);

    return res.json({
      hash: txnHash,
      link: `https://goerli.etherscan.io/tx/${txnHash}`,
    });
  } catch (error) {
    next(error);
  }
});
app.listen(parseInt(config.server.port), () => {
  console.log(`Listening for Requests at port: ${config.server.port}`);
});
