import { UserRepository } from '@persistence/app/user/user.repository';
import { Provider } from '@nestjs/common';
import { DEFAULT_CONNECTION, USER_REPO } from '@config/constants';
import { Connection, getConnectionManager } from 'typeorm';

export const UserRepoProvider: Provider = {
  provide: USER_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(DEFAULT_CONNECTION);
    if (hasCon) manager = connectionManager.get(DEFAULT_CONNECTION);

    return manager.getCustomRepository(UserRepository);
  },
  inject: [Connection],
};
