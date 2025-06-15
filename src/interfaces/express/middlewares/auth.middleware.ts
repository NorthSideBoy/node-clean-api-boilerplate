import { Request } from "express";
import { container } from "tsyringe";
import TokenPayload from "../../../core/domain/value-objects/token-payload.vo";
import ITokenizer from "../../../core/contracts/services/tokenizer.service";
import UnauthorizedError from "../../../shared/errors/application/unauthorized.error";
import ForbiddenError from "../../../shared/errors/application/forbidden.error";

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<TokenPayload> {
  switch (securityName) {
    case "BearerAuth": {
      const authHeader = request.headers["authorization"];

      if (!authHeader || !authHeader.startsWith("Bearer "))
        throw new UnauthorizedError("Missing or invalid Authorization header");

      const token = authHeader.split(" ")[1];
      const tokenizer = container.resolve<ITokenizer>("Tokenizer");

      let payload: TokenPayload;
      try {
        payload = tokenizer.verify(token);
      } catch {
        throw new UnauthorizedError("Invalid or expired token");
      }

      if (scopes?.length && !scopes.includes(payload.role))
        throw new ForbiddenError("Insufficient role permissions");

      return payload;
    }

    default:
      throw new UnauthorizedError(
        `Unsupported security scheme: ${securityName}`
      );
  }
}
