import { Response } from "express";

export const errorHandler = (err, _req, res: Response, _next) => {
  console.error(err.stack);
  return res.json({ message: "Something Broke!", error: err });
};
