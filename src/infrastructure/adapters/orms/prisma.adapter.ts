import { PrismaClient } from "@prisma/client";
import IOrm from "../../../core/contracts/services/orm.service";
import { injectable } from "tsyringe";

@injectable()
export default class Prisma implements IOrm {
  private readonly prisma = new PrismaClient();

  async connect(): Promise<boolean> {
    try {
      await this.prisma.$connect();
      await this.prisma.$runCommandRaw({ ping: 1 });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }

  public get client(): PrismaClient {
    return this.prisma;
  }
}
