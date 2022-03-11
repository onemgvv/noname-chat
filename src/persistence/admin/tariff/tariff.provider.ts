import { ADMIN_CONNECTION, TARIFF_REPO } from '@config/constants';
import { Provider } from '@nestjs/common';
import { Connection, getConnectionManager } from 'typeorm';
import { TariffRepository } from './tariff.repository';

export const TariffRepoProvider: Provider = {
  provide: TARIFF_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(ADMIN_CONNECTION);
    if (hasCon) manager = connectionManager.get(ADMIN_CONNECTION);

    return manager.getCustomRepository(TariffRepository);
  },
  inject: [Connection],
};
