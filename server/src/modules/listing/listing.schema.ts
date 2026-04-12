import { z } from "zod";

export const CreateListingSchema = z.object({
  serviceName: z
    .string()
    .min(3, "Service name must be at least 3 characters long")
    .max(30, "Service name must not exceed 30 characters"),
  category: z.enum([
    "funeral",
    "transport",
    "flowers",
    "clergy",
    "venue",
    "other",
  ]),
  price: z.number().nonnegative(),
  description: z.string().optional(),
  available: z.boolean().default(true),
});

export const UpdateListingSchema = z.object({
  serviceName: z
    .string()
    .min(3, "Service name must be at least 3 characters long")
    .max(30, "Service name must not exceed 30 characters")
    .optional(),
  category: z
    .enum(["funeral", "transport", "flowers", "clergy", "venue", "other"])
    .optional(),
  price: z.number().nonnegative().optional(),
  description: z.string().optional(),
  available: z.boolean().optional(),
});

export type CreateListingDto = z.infer<typeof CreateListingSchema>;
export type UpdateListingDto = z.infer<typeof UpdateListingSchema>;
