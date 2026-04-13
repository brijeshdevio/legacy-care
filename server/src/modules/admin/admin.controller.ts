import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { UnauthorizedException } from "../../utils/exceptions";
import { sendSuccess } from "../../utils/response";

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  getUsers = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();

    const users = await this.adminService.getUsers(req.user?.id);
    return sendSuccess(res, {
      data: { users },
    });
  };

  verifyProvider = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();

    const providerId = req.params?.providerId as string;
    const verified = req.body?.verified;
    const provider = await this.adminService.verifyProvider(
      providerId,
      verified,
    );
    return sendSuccess(res, {
      message: "Provider verification updated",
      data: { provider },
    });
  };

  toggleUserActive = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();

    const userId = req.params?.userId as string;
    const user = await this.adminService.toggleUserActive(userId);
    return sendSuccess(res, {
      message: "User status updated",
      data: { user },
    });
  };
}
