import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../../lib/prisma";
import { CreateBusinessDto } from "./provider.schema";
import { PRISMA_CODES } from "../../constants/error";
import {
  ConflictException,
  InternalServerErrorException,
} from "../../utils/exceptions";

export class ProviderService {
  prisma = prisma;

  constructor() {
    this.prisma = prisma;
  }

  async createBusiness(userId: string, data: CreateBusinessDto) {
    try {
      return await this.prisma.serviceProvider.create({
        data: {
          userId,
          businessName: data.businessName,
          city: data.city,
          phone: data.city,
          type: data.type,
          description: data.description,
        },
        omit: {
          description: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.CONFLICT
      ) {
        throw new ConflictException("Profile already exists");
      }
      throw new InternalServerErrorException();
    }
  }
}
