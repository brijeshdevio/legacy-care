import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response";
import { PlanService } from "./plan.service";
import { UnauthorizedException } from "../../utils/exceptions";

export class PlanController {
  constructor(private readonly planService: PlanService) {}

  createPlan = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();

    const plan = await this.planService.createPlan(req?.user?.id, req.body);
    console.log(plan);
    return sendSuccess(res, {
      message: "Funeral plan created",
      data: { plan },
    });
  };

  getPlan = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();

    const plan = await this.planService.getPlan(req?.user?.id);
    return sendSuccess(res, {
      data: { plan },
    });
  };

  updatePlan = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();
    const planId = req.params?.id as string;

    const plan = await this.planService.updatePlan(
      req?.user?.id,
      planId,
      req.body,
    );
    return sendSuccess(res, {
      message: "Funeral plan updated",
      data: { plan },
    });
  };
}
