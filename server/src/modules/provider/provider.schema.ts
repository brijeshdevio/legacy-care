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

export const GetProvidersQuerySchema = z.object({
  type: z
    .enum([
      "funeral_agency",
      "transport",
      "flowers",
      "clergy",
      "catering",
      "other",
    ])
    .optional(),
  city: z.string().optional(),
  minPrice: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
  maxPrice: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1)), // default page 1
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10)), // default limit 10
});

export type CreateBusinessDto = z.infer<typeof CreateBusinessSchema>;
export type GetProvidersQueryDto = z.infer<typeof GetProvidersQuerySchema>;
