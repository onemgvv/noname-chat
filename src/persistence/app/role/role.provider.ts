import { RoleRepository } from './role.repository';
import { Provider } from '@nestjs/common';
import { DEFAULT_CONNECTION, ROLE_REPO } from '@config/constants';
import { Connection, getConnectionManager } from 'typeorm';

export const RoleRepoProvider: Provider = {
  provide: ROLE_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(DEFAULT_CONNECTION);
    if (hasCon) manager = connectionManager.get(DEFAULT_CONNECTION);

    return manager.getCustomRepository(RoleRepository);
  },
  inject: [Connection],
};
