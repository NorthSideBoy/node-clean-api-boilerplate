import jwt, { Secret, SignOptions } from "jsonwebtoken";
import ITokenizer from "../../../core/contracts/services/tokenizer.service";
import TokenPayload from "../../../core/domain/value-objects/token-payload.vo";

export default class JwtToken implements ITokenizer {
  constructor(
    private readonly secret: Secret,
    private readonly expiresIn: string = "1h"
  ) {}

  generate(payload: TokenPayload): string {
    const options: SignOptions = {
      expiresIn: this.expiresIn as SignOptions["expiresIn"],
    };

    return jwt.sign(payload, this.secret, options);
  }

  verify(token: string): TokenPayload {
    return jwt.verify(token, this.secret) as TokenPayload;
  }
}
