// src/application/DTOs/user/user.schema.ts
import { z } from "zod";

/** Reusable field-level schemas */
const nameSchema = z.string().min(2, "Name must be at least 2 characters").max(15, "Name must be at most 15 characters");
const emailSchema = z.string().email("Invalid email format");

/** INPUT DTOs */

export const CreateUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
});

export const UpdateUserSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
});

export type CreateUserInputDTO = z.infer<typeof CreateUserSchema>;
export type UpdateUserInputDTO = z.infer<typeof UpdateUserSchema>;

/** OUTPUT DTO */

export const UserOutputSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: nameSchema,
  email: emailSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UserOutputDTO = z.infer<typeof UserOutputSchema>;
