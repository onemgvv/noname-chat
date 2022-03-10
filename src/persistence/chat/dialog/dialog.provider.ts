import { DialogRepository } from './dialog.repository';
import { Provider } from '@nestjs/common';
import { CHAT_CONNECTION, DIALOG_REPO } from '@config/constants';
import { Connection, getConnectionManager } from 'typeorm';

export const DialogRepoProvider: Provider = {
  provide: DIALOG_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(CHAT_CONNECTION);
    if (hasCon) manager = connectionManager.get(CHAT_CONNECTION);

    return manager.getCustomRepository(DialogRepository);
  },
  inject: [Connection],
};
