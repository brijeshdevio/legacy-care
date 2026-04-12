import { Request, Response } from "express";
import { ProviderService } from "./provider.service";
import { UnauthorizedException } from "../../utils/exceptions";
import { sendSuccess } from "../../utils/response";
import { GetProvidersQueryDto } from "./provider.schema";

export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  createBusiness = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();

    const provider = await this.providerService.createBusiness(
      req.user.id,
      req.body,
    );
    return sendSuccess(res, {
      status: 201,
      message: "Provider profile created. Pending admin verification.",
      data: { provider },
    });
  };

  getProfile = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();

    const profile = await this.providerService.getProfile(req.user.id);
    return sendSuccess(res, { data: { profile } });
  };

  getProviders = async (req: Request, res: Response) => {
    const query = req.query as unknown as GetProvidersQueryDto;
    const providers = await this.providerService.getProviders(query);
    return sendSuccess(res, { data: { providers } });
  };
}
