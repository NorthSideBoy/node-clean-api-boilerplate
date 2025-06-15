import { z } from "zod";
import {
  nameSchema,
  emailSchema,
  roleSchema,
  statusSchema,
} from "./fields.codec";

export const UpdateUserProfileCodec = z
  .object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
    status: statusSchema.optional(),
    role: roleSchema.optional(),
  })
  .refine(
    (data) =>
      Object.keys(data).some(
        (key) => data[key as keyof typeof data] !== undefined
      ),
    {
      message: "At least one field must be provided",
    }
  );
