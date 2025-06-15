import { z } from "zod";

import { emailSchema, passwordSchema } from "./fields.codec";

export const LoginUserCodec = z.object({
  email: emailSchema,
  password: passwordSchema,
});
