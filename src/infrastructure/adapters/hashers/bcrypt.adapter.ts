import IHasher from "../../../core/contracts/services/hasher.service";
import bcrypt from "bcrypt";

export default class BcryptHasher implements IHasher {
  private hasher: typeof bcrypt;

  constructor() {
    this.hasher = bcrypt;
  }

  hash(password: string, salt: number = 10): Promise<string> {
    return this.hasher.hash(password, salt);
  }

  compare(password: string, hash: string): Promise<boolean> {
    return this.hasher.compare(password, hash);
  }
}
