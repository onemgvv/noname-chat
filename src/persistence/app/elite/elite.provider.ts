import { EliteRepository } from './elite.repository';
import { Provider } from '@nestjs/common';
import { DEFAULT_CONNECTION, ELITE_REPO } from '@config/constants';
import { Connection, getConnectionManager } from 'typeorm';

export const EliteRepoProvider: Provider = {
  provide: ELITE_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(DEFAULT_CONNECTION);
    if (hasCon) manager = connectionManager.get(DEFAULT_CONNECTION);

    return manager.getCustomRepository(EliteRepository);
  },
  inject: [Connection],
};
