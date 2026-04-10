import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env";

const JwtPayloadSchema = z.object({
  sub: z.string(),
  role: z.enum(["planner", "provider", "admin"]),
  isActive: z.boolean(),
  iat: z.number(),
  exp: z.number(),
});

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;

export const signJwt = (payload: Record<string, unknown>): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyJwt = (token: string): JwtPayload => {
  const raw = jwt.verify(token, env.JWT_SECRET);
  return JwtPayloadSchema.parse(raw);
};
