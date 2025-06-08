import ConfigError from "../base/config.error";

export class ParseEnvError extends ConfigError {
  constructor(errors: string[]) {
    const message = `Failed to parse environment variables: \n${errors.join(
      "\n"
    )}`;
    super(message, errors);
    this.name = "ParseEnvError";
  }
}
