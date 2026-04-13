import { Router } from "express";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { validate } from "../../middleware/validate";
import { VerifiedSchema } from "./admin.schema";

export const adminRouter = Router();

const controller = new AdminController(new AdminService());

adminRouter.get("/users", controller.getUsers);
adminRouter.put(
  "/providers/:providerId/verify",
  validate(VerifiedSchema),
  controller.verifyProvider,
);
adminRouter.put("/users/:userId/toggle", controller.toggleUserActive);
