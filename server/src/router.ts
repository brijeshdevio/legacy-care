import { Router } from "express";
import { authenticate } from "./middleware/authenticate";
import { roleGuard } from "./middleware/roleGuard";
import { authRouter } from "./modules/auth/auth.router";
import { planRouter } from "./modules/plan/plan.router";
import { nomineeRouter } from "./modules/nominee/nominee.router";
import { providerRouter } from "./modules/provider/provider.router";

export const router = Router();
router.use("/auth", authRouter);
router.use("/plans", authenticate, roleGuard(["planner"]), planRouter);
router.use("/providers", providerRouter);
router.use("/nominee", nomineeRouter);
