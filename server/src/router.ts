import { Router } from "express";
import { authenticate } from "./middleware/authenticate";
import { authRouter } from "./modules/auth/auth.router";
import { planRouter } from "./modules/plan/plan.router";
import { nomineeRouter } from "./modules/nominee/nominee.router";
import { roleGuard } from "./middleware/roleGuard";

export const router = Router();
router.use("/auth", authRouter);
router.use("/plans", authenticate, roleGuard(["planner"]), planRouter);
router.use("/nominee", nomineeRouter);
