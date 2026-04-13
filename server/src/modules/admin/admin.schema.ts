import z from "zod";

export const VerifiedSchema = z.object({
  verified: z.boolean().default(true),
});
