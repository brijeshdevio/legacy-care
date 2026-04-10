import express, { Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { router } from "./router";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "./config/env";

export const app = express();

app.use(
  cors({
    origin: env.FRONTEND,
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.set("trust proxy", 1);

app.get("/", (_, res) => {
  res.send(`Welcome to the LegacyCare API!`);
});

app.use("/api", router);

app.use(errorHandler);
