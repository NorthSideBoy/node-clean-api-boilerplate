import { z } from "zod";
import {
  nameSchema,
  emailSchema,
  roleSchema,
  passwordSchema,
} from "./fields.codec";

export const UpdateUserCodec = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  role: roleSchema.optional(),
  password: passwordSchema.optional(),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserCodec>;
