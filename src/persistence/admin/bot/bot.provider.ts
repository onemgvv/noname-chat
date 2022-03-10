import { ADMIN_CONNECTION, BOT_REPO } from '@config/constants';
import { Provider } from '@nestjs/common';
import { Connection, getConnectionManager } from 'typeorm';
import { BotRepository } from './bot.repository';

export const BotRepoProvider: Provider = {
  provide: BOT_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(ADMIN_CONNECTION);
    if (hasCon) manager = connectionManager.get(ADMIN_CONNECTION);

    return manager.getCustomRepository(BotRepository);
  },
  inject: [Connection],
};
