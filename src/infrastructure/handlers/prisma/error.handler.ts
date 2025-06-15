import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import ConflictError from "../../../shared/errors/application/conflict.error";
import InvalidInputError from "../../../shared/errors/application/invalid-input.error";

export default function handlePrismaError(error: unknown): never {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const rawTarget = error.meta?.target;
        const target = Array.isArray(rawTarget)
          ? rawTarget.join(", ")
          : String(rawTarget);
        const message = `Duplicate entry detected for field(s): ${target}`;
        throw new ConflictError(message);
      }

      case "P2023": {
        const message =
          typeof error.meta?.message === "string"
            ? error.meta.message
            : "Invalid input format";
        throw new InvalidInputError(message);
      }

      default:
        throw error;
    }
  }

  throw error;
}