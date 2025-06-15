export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: unknown };

export default interface IValidator {
  decode<T>(
    schema: unknown,
    input: unknown,
    strict?: boolean
  ): ValidationResult<T>;
}
