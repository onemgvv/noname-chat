import { ADMIN_CONNECTION, BM_REPO } from '@config/constants';
import { Provider } from '@nestjs/common';
import { Connection, getConnectionManager } from 'typeorm';
import { BotMessageRepository } from './bm.repository';

export const BotMessageRepoProvider: Provider = {
  provide: BM_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(ADMIN_CONNECTION);
    if (hasCon) manager = connectionManager.get(ADMIN_CONNECTION);

    return manager.getCustomRepository(BotMessageRepository);
  },
  inject: [Connection],
};
