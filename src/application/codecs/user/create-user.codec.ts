import { z } from "zod";
import {
  nameSchema,
  emailSchema,
  roleSchema,
  passwordSchema,
  statusSchema,
} from "./fields.codec";

export const CreateUserCodec = z.object({
  name: nameSchema,
  email: emailSchema,
  role: roleSchema,
  status: statusSchema,
  password: passwordSchema,
});
