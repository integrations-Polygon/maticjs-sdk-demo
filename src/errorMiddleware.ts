import { Response } from "express";

export const errorHandler = (err, _req, res: Response, _next) => {
  console.error(err.stack);
  return res.status(500).json({ message: "Something Broke!", error: err });
};
