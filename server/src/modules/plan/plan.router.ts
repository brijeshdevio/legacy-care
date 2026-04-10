import { Router } from "express";
import { validate } from "../../middleware/validate";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";
import { CreatePlanSchema, UpdatePlanSchema } from "./plan.schema";

export const planRouter = Router();

const planController = new PlanController(new PlanService());

planRouter.post("/", validate(CreatePlanSchema), planController.createPlan);
planRouter.get("/me", planController.getPlan);
planRouter.patch("/:id", validate(UpdatePlanSchema), planController.updatePlan);
