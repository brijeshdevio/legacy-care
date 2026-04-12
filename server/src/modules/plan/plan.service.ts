import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { prisma } from "../../lib/prisma";
import { CreatePlanDto, NomineeDto, UpdatePlanDto } from "./plan.schema";
import { PRISMA_CODES } from "../../constants/error";
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from "../../utils/exceptions";

export class PlanService {
  prisma = prisma;

  constructor() {
    this.prisma = prisma;
  }

  async createPlan(userId: string, data: CreatePlanDto) {
    try {
      return await this.prisma.funeralPlan.create({
        data: {
          userId,
          location: data.location,
          budgetEstimate: data.budgetEstimate,
          ritualPreference: {
            create: {
              clergyPreference: data.ritualPreference.clergyPreference,
              instructions: data.ritualPreference.instructions,
              musicPreference: data.ritualPreference.musicPreference,
              ritualType: data.ritualPreference.ritualType,
            },
          },
        },
        select: {
          id: true,
          status: true,
          ritualPreference: {
            select: {
              ritualType: true,
              clergyPreference: true,
              instructions: true,
              musicPreference: true,
            },
          },
          createdAt: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.CONFLICT
      ) {
        throw new ConflictException("Active plan already exists");
      }
      throw new InternalServerErrorException();
    }
  }

  async getPlan(userId: string) {
    const plan = await this.prisma.funeralPlan.findUnique({
      where: { userId },
      select: {
        id: true,
        status: true,
        location: true,
        budgetEstimate: true,
        ritualPreference: {
          select: {
            ritualType: true,
            clergyPreference: true,
            instructions: true,
            musicPreference: true,
          },
        },
        planServices: {
          select: {
            id: true,
            listing: true,
            addedAt: true,
          },
        },
        nominees: {
          select: {
            nomineeToken: true,
            id: true,
            name: true,
            email: true,
            phone: true,
            relation: true,
          },
        },
        documents: {
          select: {
            id: true,
            fileName: true,
            fileType: true,
            mimeType: true,
            sizeBytes: true,
            uploadedAt: true,
          },
        },
        updatedAt: true,
      },
    });

    if (!plan) throw new NotFoundException("No plan found");
    return plan;
  }

  async updatePlan(userId: string, planId: string, data: UpdatePlanDto) {
    try {
      const { updatedAt } = await this.prisma.funeralPlan.update({
        where: {
          userId,
          id: planId,
        },
        data: {
          location: data.location,
          budgetEstimate: data.budgetEstimate,
          status: data.status,
          ritualPreference: {
            update: {
              clergyPreference: data.ritualPreference?.clergyPreference,
              instructions: data.ritualPreference?.instructions,
              musicPreference: data.ritualPreference?.musicPreference,
              ritualType: data.ritualPreference?.ritualType,
            },
          },
        },
        select: {
          updatedAt: true,
        },
      });
      return { updatedAt, ...data };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.NOT_FOUND
      ) {
        throw new ForbiddenException("Not your plan");
      }
      throw new InternalServerErrorException();
    }
  }

  async addNominee(planId: string, data: NomineeDto) {
    try {
      return await this.prisma.nominee.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          relation: data.relation,
          planId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          relation: true,
          planId: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.FOREIGN_KEY_CONSTRAINT) {
          throw new ForbiddenException("Plan not found");
        }
        if (error.code === PRISMA_CODES.CONFLICT) {
          throw new ConflictException("Nominee with this email already added");
        }
      }
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async deleteNominee(userId: string, planId: string, nomineeId: string) {
    try {
      await this.prisma.nominee.delete({
        where: {
          id: nomineeId,
          planId,
          plan: {
            userId,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.NOT_FOUND
      ) {
        throw new ForbiddenException("Not your plan");
      }
      throw new InternalServerErrorException();
    }
  }

  async addService(planId: string, listingId: string) {
    try {
      return await this.prisma.planService.create({
        data: {
          planId,
          listingId,
        },
        select: {
          id: true,
          listing: true,
          addedAt: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.FOREIGN_KEY_CONSTRAINT) {
          throw new ForbiddenException("Plan not found");
        }
        if (error.code === PRISMA_CODES.CONFLICT) {
          throw new ConflictException("Service already in plan");
        }
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteService(userId: string, planId: string, listingId: string) {
    try {
      await this.prisma.planService.delete({
        where: {
          planId,
          id: listingId,
          plan: {
            userId,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.NOT_FOUND
      ) {
        throw new ForbiddenException("Not your plan");
      }
      throw new InternalServerErrorException();
    }
  }
}
