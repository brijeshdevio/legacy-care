import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendSuccess } from "../../utils/response";
import { clearCookie, setCookie } from "../../utils/cookie";
import { signJwt } from "../../lib/jwt";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const data = await this.authService.register(req.body);
    return sendSuccess(res, {
      status: 201,
      message: "Account created successfully",
      data,
    });
  };

  login = async (req: Request, res: Response) => {
    const data = await this.authService.login(req.body);

    const token = signJwt({
      sub: data.id,
      role: data.role,
      isActive: data.isActive,
    });
    setCookie(res, "token", token);

    return sendSuccess(res, {
      message: "User logged in successfully",
      data: { token },
    });
  };

  logout = (req: Request, res: Response) => {
    clearCookie(res, "token");
    return sendSuccess(res, {
      message: "User logged out successfully",
    });
  };
}
