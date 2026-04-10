import type { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../utils/exceptions";
import { verifyJwt } from "../lib/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token =
    req.cookies?.["token"] || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new UnauthorizedException("Invalid or expired access token");
  }

  try {
    const payload = verifyJwt(token);
    req.user = {
      id: payload.sub,
      role: payload.role,
      isActive: payload.isActive,
    };
    next();
  } catch {
    throw new UnauthorizedException("Invalid or expired access token");
  }
}
