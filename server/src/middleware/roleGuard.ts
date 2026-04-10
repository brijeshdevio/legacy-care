import type { Request, Response, NextFunction } from "express";
import { ForbiddenException } from "../utils/exceptions";
import type { Role } from "../types/role";

export function roleGuard(roles: Role[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req?.user && roles?.includes(req?.user?.role)) {
        next();
      } else {
        next(
          new ForbiddenException(
            "You do not have permission to access this resource.",
          ),
        );
      }
    } catch (error) {
      next(
        new ForbiddenException(
          "You do not have permission to access this resource.",
        ),
      );
    }
  };
}
