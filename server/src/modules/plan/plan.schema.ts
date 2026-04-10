import { z } from "zod";

export const RitualPreferenceSchema = z.object({
  ritualType: z
    .enum(["hindu", "muslim", "christian", "sikh", "non_religious", "other"])
    .optional(),
  clergyPreference: z.string().optional(),
  instructions: z.string().optional(),
  musicPreference: z.string().optional(),
});

export const CreatePlanSchema = z.object({
  location: z.string().min(1, "Location is required"),
  budgetEstimate: z
    .number("Budget must be a number")
    .nonnegative("Budget must be >= 0"),
  ritualPreference: RitualPreferenceSchema,
});

export const UpdatePlanSchema = z.object({
  status: z.enum(["draft", "finalized"]).optional(),
  location: z.string().min(1, "Location is required").optional(),
  budgetEstimate: z
    .number("Budget must be a number")
    .nonnegative("Budget must be >= 0")
    .optional(),
  ritualPreference: RitualPreferenceSchema.optional(),
});

export const NomineeSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(5, "Phone number is too short")
    .max(20, "Phone number is too long")
    .trim(),
  relation: z.string().min(1, "Relation is required").trim(),
});

export type CreatePlanDto = z.infer<typeof CreatePlanSchema>;
export type UpdatePlanDto = z.infer<typeof UpdatePlanSchema>;
export type NomineeDto = z.infer<typeof NomineeSchema>;
