import cron from 'node-cron';
import { cleanupExpiredTokens } from '../models/blacklist-model.js';

export function blacklistCleanupJob() {
  cron.schedule('0 3 * * *', async () => {
    try {
      await cleanupExpiredTokens();
    } catch {
    }
  }, {
    scheduled: true,
    timezone: 'Europe/Istanbul'
  });
}
