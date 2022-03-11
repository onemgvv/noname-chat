import { Payment } from '@persistence/admin/payment/payment.entity';
import { Request } from 'express';

export interface ICloudPaymentsService {
  find(subscribtion: Payment): Promise<string>;
  findByAccountId(accountId: string): Promise<string>;
  unsubscribe(id: string): Promise<{ success: boolean }>;
  renewSubscription(
    accountId: string,
  ): Promise<{ status: boolean; premium?: Date }>;
  handlePayNotification(req: Request);
}
