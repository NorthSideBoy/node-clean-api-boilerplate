import { z } from "zod";
import { passwordSchema } from "./fields.codec";

export const UpdateUserPasswordCodec = z.object({ password: passwordSchema });
