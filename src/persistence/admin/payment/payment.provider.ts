import { ADMIN_CONNECTION, PAYMENT_REPO } from '@config/constants';
import { Provider } from '@nestjs/common';
import { Connection, getConnectionManager } from 'typeorm';
import { PaymentRepository } from './payment.repository';

export const PaymentRepoProvider: Provider = {
  provide: PAYMENT_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(ADMIN_CONNECTION);
    if (hasCon) manager = connectionManager.get(ADMIN_CONNECTION);

    return manager.getCustomRepository(PaymentRepository);
  },
  inject: [Connection],
};
