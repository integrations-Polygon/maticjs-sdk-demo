import express from "express";
import { utils } from "ethers";

import config from "../config";
import matic, { getGasPrice } from "./matic-client";
import provider from "./provider";
import { errorHandler } from "./errorMiddleware";
const { pos, user1 } = config;

const app = express();

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

