import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

type ValidateType = "body" | "query" | "params";

export function validate<T extends z.ZodTypeAny>(
  schema: T,
  type: ValidateType = "body",
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync(req[type]);

      if (type === "body") {
        req.body = parsed;
      } else {
        if (!req.validated) req.validated = {};
        req.validated[type] = parsed;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
