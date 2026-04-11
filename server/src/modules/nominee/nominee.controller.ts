import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response";
import { NomineeService } from "./nominee.service";

export class NomineeController {
  constructor(private readonly nomineeService: NomineeService) {}

  getPlanByNomineeToken = async (req: Request, res: Response) => {
    const nomineeToken = req.params?.nomineeToken as string;
    const plan = await this.nomineeService.getPlanByNomineeToken(nomineeToken);
    return sendSuccess(res, {
      data: { plan },
    });
  };
}
