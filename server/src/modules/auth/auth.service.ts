import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { hashPassword, verifyPassword } from "../../lib/hash";
import { prisma } from "../../lib/prisma";
import { LoginDto, RegisterDto } from "./auth.schema";
import { PRISMA_CODES } from "../../constants/error";
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from "../../utils/exceptions";

export const DUMMY_HASH =
  "$argon2id$v=19$m=65536,t=3,p=4$/y1jJS2H1+mZ1Sg77uvgAg$AYsdfipeVFRQxT2zXSCaw6581/ZdUV1I1MOjlng0fCM";

export class AuthService {
  prisma = prisma;

  constructor() {
    this.prisma = prisma;
  }

  async register(data: RegisterDto) {
    try {
      const isActive = data.role === "planner" ? true : false;
      const hashedPassword = await hashPassword(data.password);

      return await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          role: data.role,
          isActive: isActive,
          passwordHash: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.CONFLICT
      ) {
        throw new ConflictException(
          `${data.email} already exists. Use another email.`,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    const passwordHash = user?.passwordHash ?? DUMMY_HASH;
    const isPasswordValid = await verifyPassword(passwordHash, data.password);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return {
      id: user.id,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
