export default interface ITokenizer {
  generate(payload: Record<string, any>): string;
  verify(token: string): Record<string, any>;
}
