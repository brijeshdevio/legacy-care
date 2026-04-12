import { Router } from "express";
import { validate } from "../../middleware/validate";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";
import {
  AddServiceSchema,
  CreatePlanSchema,
  NomineeSchema,
  UpdatePlanSchema,
} from "./plan.schema";

export const planRouter = Router();

const planController = new PlanController(new PlanService());

planRouter.post("/", validate(CreatePlanSchema), planController.createPlan);
planRouter.get("/me", planController.getPlan);
planRouter.patch("/:id", validate(UpdatePlanSchema), planController.updatePlan);
planRouter.post(
  "/:id/nominees",
  validate(NomineeSchema),
  planController.addNominee,
);
planRouter.delete("/:id/nominees/:nomineeId", planController.deleteNominee);
planRouter.post(
  "/:planId/services",
  validate(AddServiceSchema),
  planController.addService,
);
planRouter.delete("/:planId/services/:listingId", planController.deleteService);
