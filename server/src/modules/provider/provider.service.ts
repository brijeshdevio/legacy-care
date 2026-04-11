import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../../lib/prisma";
import { CreateBusinessDto } from "./provider.schema";
import { PRISMA_CODES } from "../../constants/error";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
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

  async getProfile(userId: string) {
    const profile = await this.prisma.serviceProvider.findUnique({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!profile) throw new NotFoundException("Profile not found");
    return profile;
  }
}
