export default interface ILogger {
  error(message: unknown): void;
  warning(message: any): void;
  info(message: any): void;
  debug(message: any): void;
}
