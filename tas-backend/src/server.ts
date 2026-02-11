import { createServer } from "http";
import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";
import { prisma } from "./lib/prisma";
import { startNotificationCron } from "./modules/notifications/notifications.job";

async function bootstrap() {
  const app = createApp();
  const server = createServer(app);

  server.listen(env.PORT, () => {
    logger.info(`API running on port ${env.PORT}`);
  });

  startNotificationCron();

  const shutdown = async () => {
    logger.info("Shutting down server...");
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

bootstrap().catch(async (error) => {
  logger.error({ err: error }, "Failed to bootstrap application");
  await prisma.$disconnect();
  process.exit(1);
});
