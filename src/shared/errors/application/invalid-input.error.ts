// src/shared/errors/application/invalid-input.error.ts
import AppError from "../base/app.error";

export default class InvalidInputError extends AppError {
  constructor(message: string);
  constructor(error: any);
  constructor(input: any) {
    let finalMessage: string;

    if (typeof input === "string") {
      finalMessage = input;
    } else if (Array.isArray(input?.errors)) {
      finalMessage = input.errors
        .map((issue: any) => `${issue.path}: ${issue.message}`)
        .join(", ");
    } else {
      finalMessage = "Invalid input";
    }

    super(finalMessage, 400);
  }
}
