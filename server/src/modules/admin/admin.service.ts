import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../../lib/prisma";
import { PRISMA_CODES } from "../../constants/error";
import {
  InternalServerErrorException,
  NotFoundException,
} from "../../utils/exceptions";

export class AdminService {
  prisma = prisma;

  constructor() {
    this.prisma = prisma;
  }

  async getUsers(adminId: string) {
    return await this.prisma.user.findMany({
      where: {
        id: {
          not: adminId,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async verifyProvider(providerId: string, verified: boolean = true) {
    try {
      return await this.prisma.serviceProvider.update({
        where: { id: providerId },
        data: { verified },
        select: {
          id: true,
          businessName: true,
          verified: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.NOT_FOUND
      ) {
        throw new NotFoundException(`Not provider found`);
      }
      throw new InternalServerErrorException();
    }
  }

  async toggleUserActive(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });

    if (!user) throw new NotFoundException("Not user found");

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        isActive: !user?.isActive,
      },
      select: {
        id: true,
        isActive: true,
      },
    });
  }
}
