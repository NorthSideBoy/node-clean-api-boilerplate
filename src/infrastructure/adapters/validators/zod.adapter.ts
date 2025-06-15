import { ZodObject, ZodType } from "zod";
import Validator, {
  ValidationResult,
} from "../../../core/contracts/services/validator.service";

export default class ZodValidator implements Validator {
  decode<T>(
    schema: ZodType<unknown>,
    input: unknown,
    strict = true
  ): ValidationResult<T> {
    const parsedSchema =
      strict && schema instanceof ZodObject ? schema.strict() : schema;

    const result = parsedSchema.safeParse(input);

    if (result.success) return { success: true, data: result.data as T };

    return { success: false, error: result.error };
  }
}
