import { ADMIN_CONNECTION, CITY_REPO } from '@config/constants';
import { Provider } from '@nestjs/common';
import { Connection, getConnectionManager } from 'typeorm';
import { CityRepository } from './city.repository';

export const CityRepoProvider: Provider = {
  provide: CITY_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(ADMIN_CONNECTION);
    if (hasCon) manager = connectionManager.get(ADMIN_CONNECTION);

    return manager.getCustomRepository(CityRepository);
  },
  inject: [Connection],
};
