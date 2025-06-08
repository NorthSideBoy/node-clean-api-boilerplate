import { z } from "zod";

import { nameSchema, emailSchema, roleSchema } from "./fields.codec";

export const UserCodec = z.object({
  id: z.string().min(1, "ID is required"),
  name: nameSchema,
  email: emailSchema,
  role: roleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UserDTO = z.infer<typeof UserCodec>;
