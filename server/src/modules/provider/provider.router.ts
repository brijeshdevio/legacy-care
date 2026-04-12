import { Router } from "express";
import { validate } from "../../middleware/validate";
import { ProviderController } from "./provider.controller";
import { ProviderService } from "./provider.service";
import {
  CreateBusinessSchema,
  GetProvidersQuerySchema,
} from "./provider.schema";
import { authenticate } from "../../middleware/authenticate";
import { roleGuard } from "../../middleware/roleGuard";

export const providerRouter = Router();

const controller = new ProviderController(new ProviderService());
providerRouter.post(
  "/profile",
  authenticate,
  roleGuard(["provider"]),
  validate(CreateBusinessSchema),
  controller.createBusiness,
);
providerRouter.get(
  "/profile",
  authenticate,
  roleGuard(["provider"]),
  controller.getProfile,
);
providerRouter.get(
  "/",
  validate(GetProvidersQuerySchema, "query"),
  controller.getProviders,
);
