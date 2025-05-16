import { AppError } from "../base/app.error";

export class InvalidInputError extends AppError {
  constructor(message: string = "Invalid Input") {
    super(message, 400);
  }
}