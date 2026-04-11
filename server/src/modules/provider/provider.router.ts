import { Router } from "express";
import { validate } from "../../middleware/validate";
import { ProviderController } from "./provider.controller";
import { ProviderService } from "./provider.service";
import { CreateBusinessSchema } from "./provider.schema";

export const providerRouter = Router();

const controller = new ProviderController(new ProviderService());
providerRouter.post(
  "/profile",
  validate(CreateBusinessSchema),
  controller.createBusiness,
);
providerRouter.get("/profile", controller.getProfile);
