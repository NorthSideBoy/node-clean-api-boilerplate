import { NextFunction, Request, Response } from "express";
import AppError from "../../../shared/errors/base/app.error";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      error: err.name,
    });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
    return;
  }

  res.status(500).json({
    message: "Internal Server Error",
    error: "Unknown error",
  });
};
