import { Router } from "express";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

export const adminRouter = Router();

const controller = new AdminController(new AdminService());

adminRouter.get("/users", controller.getUsers);
