import { z } from "zod";

export const CreateBusinessSchema = z.object({
  businessName: z.string().min(3).max(30),
  type: z.enum([
    "funeral_agency",
    "transport",
    "flowers",
    "clergy",
    "catering",
    "other",
  ]),
  city: z.string().min(3).max(40),
  phone: z.string().min(10).max(20),
  description: z.string().optional(),
});

export type CreateBusinessDto = z.infer<typeof CreateBusinessSchema>;
