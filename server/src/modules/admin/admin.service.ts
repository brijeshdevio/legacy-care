import { prisma } from "../../lib/prisma";

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
}
