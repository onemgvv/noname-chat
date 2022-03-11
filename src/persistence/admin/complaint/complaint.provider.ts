import { ADMIN_CONNECTION, COMPLAINT_REPO } from '@config/constants';
import { Provider } from '@nestjs/common';
import { Connection, getConnectionManager } from 'typeorm';
import { ComplaintRepository } from './complaint.repository';

export const ComplaintRepoProvider: Provider = {
  provide: COMPLAINT_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(ADMIN_CONNECTION);
    if (hasCon) manager = connectionManager.get(ADMIN_CONNECTION);

    return manager.getCustomRepository(ComplaintRepository);
  },
  inject: [Connection],
};
