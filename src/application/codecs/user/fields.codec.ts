import { nativeEnum, z } from "zod";
import { UserRole } from "../../../core/domain/enums/user.enum";

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(15, "Name must be at most 15 characters");

export const emailSchema = z.string().email("Invalid email format");

export const roleSchema = nativeEnum(UserRole);

export const statusSchema = z.boolean().default(true);

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be at most 32 characters");
