import AppError from "../base/app.error";

export default class ConflictError extends AppError {
  constructor(message: string = "Conflict") {
    super(message, 409);
  }
}
