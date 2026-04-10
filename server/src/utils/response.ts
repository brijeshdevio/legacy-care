import { Response } from "express";
import { ApiError, ApiSuccess } from "../types/api";

export const sendSuccess = <T>(
  res: Response,
  { status, message, data }: ApiSuccess<T>,
) => {
  status = status ?? 200;
  return res.status(status).json({ success: true, status, message, data });
};

export const sendError = <T>(
  res: Response,
  { status = 400, message, errors, code }: Partial<ApiError<T>>,
) => {
  return res.status(status).json({
    success: false,
    status,
    message,
    errors,
    code,
  });
};
