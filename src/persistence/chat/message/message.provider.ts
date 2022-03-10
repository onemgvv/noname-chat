import { CHAT_CONNECTION, MESSAGE_REPO } from '@config/constants';
import { MessageRepository } from './message.repository';
import { Provider } from '@nestjs/common';
import { Connection, getConnectionManager } from 'typeorm';

export const MessageRepoProvider: Provider = {
  provide: MESSAGE_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(CHAT_CONNECTION);
    if (hasCon) manager = connectionManager.get(CHAT_CONNECTION);

    return manager.getCustomRepository(MessageRepository);
  },
  inject: [Connection],
};
