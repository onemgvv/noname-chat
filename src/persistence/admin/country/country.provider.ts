import { ADMIN_CONNECTION, COUNTRY_REPO } from '@config/constants';
import { Provider } from '@nestjs/common';
import { Connection, getConnectionManager } from 'typeorm';
import { CountryRepository } from './country.repository';

export const CountryRepoProvider: Provider = {
  provide: COUNTRY_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(ADMIN_CONNECTION);
    if (hasCon) manager = connectionManager.get(ADMIN_CONNECTION);

    return manager.getCustomRepository(CountryRepository);
  },
  inject: [Connection],
};
