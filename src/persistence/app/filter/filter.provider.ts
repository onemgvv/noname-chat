import { FilterRepository } from './filter.repository';
import { Provider } from '@nestjs/common';
import { DEFAULT_CONNECTION, FILTER_REPO } from '@config/constants';
import { Connection, getConnectionManager } from 'typeorm';

export const FilterRepoProvider: Provider = {
  provide: FILTER_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(DEFAULT_CONNECTION);
    if (hasCon) manager = connectionManager.get(DEFAULT_CONNECTION);

    return manager.getCustomRepository(FilterRepository);
  },
  inject: [Connection],
};
