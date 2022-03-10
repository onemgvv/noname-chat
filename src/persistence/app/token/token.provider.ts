import { Provider } from '@nestjs/common';
import { Connection, getConnectionManager } from 'typeorm';
import { DEFAULT_CONNECTION, TOKEN_REPO } from '@config/constants';
import { TokenRepository } from '@persistence/app/token/token.repository';

export const TokenRepoProvider: Provider = {
  provide: TOKEN_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(DEFAULT_CONNECTION);
    if (hasCon) manager = connectionManager.get(DEFAULT_CONNECTION);

    return manager.getCustomRepository(TokenRepository);
  },
  inject: [Connection],
};
