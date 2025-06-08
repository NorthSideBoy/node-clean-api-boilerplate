import AppError from "../base/app.error";

export default class InvalidInputError extends AppError {
  constructor(error: any) {
    const messages = error.errors.map(
      (issue: any) => `${issue.path}: ${issue.message}`
    );
    super(messages.join(", "), 400);
  }
}
