import TokenPayload from "../../domain/value-objects/token-payload.vo";
export default interface ITokenizer {
  generate(payload: TokenPayload): string;
  verify(token: string): TokenPayload;
}
