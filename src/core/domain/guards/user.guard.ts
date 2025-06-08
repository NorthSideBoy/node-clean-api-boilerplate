import { User } from "../entities/user.entity";

export function hasId(user: User): user is User & { id: string } {
  return typeof user.id === "string";
}
