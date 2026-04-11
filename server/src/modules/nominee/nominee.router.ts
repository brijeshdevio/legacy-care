import { Router } from "express";
import { NomineeController } from "./nominee.controller";
import { NomineeService } from "./nominee.service";

export const nomineeRouter = Router();

const controller = new NomineeController(new NomineeService());
nomineeRouter.get("/plan/:nomineeToken", controller.getPlanByNomineeToken);
