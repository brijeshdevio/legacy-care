import { Request, Response, NextFunction } from "express";
import { ZodError, ZodIssue } from "zod";
import { sendError } from "../utils/response";
import { HttpException } from "../utils/exceptions";
import { ERROR_CODES } from "../constants/error";

const formatZodError = (issues: ZodIssue[]) => {
  return issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return sendError(res, {
      status: 400,
      message: "Validation Error",
      errors: {
        details: formatZodError(err.issues),
      },
      code: ERROR_CODES.VALIDATION_ERROR,
    });
  }

  if (err instanceof HttpException) {
    return sendError(res, err.toResponse());
  }

  return sendError(res, {
    status: 500,
    message: "Something went wrong",
    errors: {
      details:
        process.env.NODE_ENV === "development"
          ? err instanceof Error
            ? { message: err.message, stack: err.stack }
            : String(err)
          : undefined,
    },
    code: ERROR_CODES.INTERNAL_SERVER_ERROR,
  });
};
