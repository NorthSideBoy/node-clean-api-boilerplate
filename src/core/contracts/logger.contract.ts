interface Logger {
  error(message: any): void;
  warning(message: string): void;
  info(message: string): void;
  debug(message: string): void;
}

export default Logger;