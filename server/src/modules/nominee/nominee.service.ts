import { prisma } from "../../lib/prisma";
import { NotFoundException } from "../../utils/exceptions";

export class NomineeService {
  prisma = prisma;

  constructor() {
    this.prisma = prisma;
  }

  async getPlanByNomineeToken(nomineeToken: string) {
    const plan = await this.prisma.funeralPlan.findFirst({
      where: {
        nominees: {
          some: {
            nomineeToken,
          },
        },
      },
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
}
