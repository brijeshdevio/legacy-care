import { env } from "./config/env";
import { logger } from "./lib/logger";
import { app } from "./app";

if (env.NODE_ENV === "development") {
  app.listen(env.PORT, () => {
    logger.info(`🚀 Server ready at http://localhost:${env.PORT}`);
  });
}

export default app;
