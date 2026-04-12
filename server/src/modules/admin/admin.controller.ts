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
}
