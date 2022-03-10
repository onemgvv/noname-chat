import { BlacklistRepository } from './blacklist.repository';
import { Provider } from '@nestjs/common';
import { BLACKLIST_REPO, DEFAULT_CONNECTION } from '@config/constants';
import { Connection, getConnectionManager } from 'typeorm';

export const BlacklistRepoProvider: Provider = {
  provide: BLACKLIST_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(DEFAULT_CONNECTION);
    if (hasCon) manager = connectionManager.get(DEFAULT_CONNECTION);

    return manager.getCustomRepository(BlacklistRepository);
  },
  inject: [Connection],
};
