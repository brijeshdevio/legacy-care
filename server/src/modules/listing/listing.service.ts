import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../../lib/prisma";
import {
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from "../../utils/exceptions";
import { CreateListingDto, UpdateListingDto } from "./listing.schema";
import { PRISMA_CODES } from "../../constants/error";

export class ListingService {
  prisma = prisma;

  constructor() {
    this.prisma = prisma;
  }

  async createListing(userId: string, data: CreateListingDto) {
    const provider = await this.prisma.serviceProvider.findUnique({
      where: { userId },
      select: {
        id: true,
        user: {
          select: {
            isActive: true,
          },
        },
      },
    });

    if (!provider) {
      throw new UnauthorizedException();
    }

    if (!provider.user.isActive) {
      throw new ForbiddenException("Account not verified yet");
    }

    const listing = await this.prisma.serviceListing.create({
      data: {
        ...data,
        providerId: provider.id,
      },
      select: {
        id: true,
        providerId: true,
        serviceName: true,
        category: true,
        price: true,
        available: true,
        createdAt: true,
      },
    });

    return listing;
  }

  async updateListing(
    userId: string,
    listingId: string,
    data: UpdateListingDto,
  ) {
    try {
      const { id } = await this.prisma.serviceListing.update({
        where: {
          id: listingId,
          planServices: {
            some: {
              plan: {
                userId,
              },
            },
          },
        },
        data: {
          ...data,
        },
        select: {
          id: true,
        },
      });
      return { id, ...data };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.NOT_FOUND
      ) {
        throw new ForbiddenException(
          `You are not authorized to update this listing`,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteListing(userId: string, listingId: string) {
    try {
      await this.prisma.serviceListing.delete({
        where: {
          id: listingId,
          planServices: {
            some: {
              plan: {
                userId,
              },
            },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.NOT_FOUND
      ) {
        throw new ForbiddenException(
          `You are not authorized to delete this listing`,
        );
      }
      throw new InternalServerErrorException();
    }
  }
}
