import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../../lib/prisma";
import { CreateBusinessDto, GetProvidersQueryDto } from "./provider.schema";
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

  async getProviders(query: GetProvidersQueryDto) {
    const where: any = {};
    if (query.type) where.type = query.type;
    if (query.city) where.city = { contains: query.city, mode: "insensitive" };
    if (query.minPrice || query.maxPrice) {
      where.price = {};
      if (query.minPrice !== undefined) where.price.gte = query.minPrice;
      if (query.maxPrice !== undefined) where.price.lte = query.maxPrice;
    }

    const total = await prisma.serviceProvider.count({ where });
    const take = query.limit ?? 10;
    const skip = ((query.page ?? 1) - 1) * take;

    const providers = await prisma.serviceProvider.findMany({
      where,
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      omit: {
        userId: true,
      },
      skip,
      take,
    });

    const pagination = {
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    };

    return { providers, pagination };
  }
}
