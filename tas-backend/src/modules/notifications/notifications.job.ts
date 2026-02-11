import cron from "node-cron";
import { logger } from "../../lib/logger";
import { generateScheduledNotifications } from "./notifications.service";

export function startNotificationCron() {
  cron.schedule("0 * * * *", async () => {
    try {
      await generateScheduledNotifications();
      logger.info("Notification cron completed");
    } catch (error) {
      logger.error({ err: error }, "Notification cron failed");
    }
  });
}
