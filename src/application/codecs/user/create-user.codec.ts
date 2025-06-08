import { z } from "zod";
import {
  nameSchema,
  emailSchema,
  roleSchema,
  passwordSchema,
} from "./fields.codec";

export const CreateUserCodec = z.object({
  name: nameSchema,
  email: emailSchema,
  role: roleSchema,
  password: passwordSchema,
});

export type CreateUserDTO = z.infer<typeof CreateUserCodec>;
