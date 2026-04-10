import { Router } from "express";
import { validate } from "../../middleware/validate";
import { authenticate } from "../../middleware/authenticate";
import { AuthController } from "./auth.controller";
import { LoginSchema, RegisterSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

export const authRouter = Router();

const controller = new AuthController(new AuthService());

authRouter.post("/register", validate(RegisterSchema), controller.register);
authRouter.post("/login", validate(LoginSchema), controller.login);
authRouter.post("/logout", authenticate, controller.logout);
