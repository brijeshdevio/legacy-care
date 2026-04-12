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

  addNominee = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();
    const planId = req.params?.id as string;

    const nominee = await this.planService.addNominee(planId, req.body);
    return sendSuccess(res, {
      status: 201,
      message: "Nominee added and notified via email",
      data: { nominee },
    });
  };

  deleteNominee = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();
    const planId = req.params?.id as string;
    const nomineeId = req.params?.nomineeId as string;

    await this.planService.deleteNominee(req?.user?.id, planId, nomineeId);
    return sendSuccess(res, {
      message: "Nominee deleted successfully",
    });
  };

  addService = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();
    const planId = req.params?.planId as string;
    const listingId = req.body?.listingId as string;

    const service = await this.planService.addService(planId, listingId);
    return sendSuccess(res, {
      message: "Service added successfully",
      data: { service },
    });
  };

  deleteService = async (req: Request, res: Response) => {
    if (!req.user?.id) throw new UnauthorizedException();
    const planId = req.params?.planId as string;
    const listingId = req.params?.listingId as string;

    await this.planService.deleteService(req?.user?.id, planId, listingId);
    return sendSuccess(res, {
      message: "Service removed successfully",
    });
  };
}
