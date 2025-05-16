export class ConfigError extends Error {
  public readonly details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.name = new.target.name;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}