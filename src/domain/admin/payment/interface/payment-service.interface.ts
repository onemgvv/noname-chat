import { CreatePaymentDto } from '@api/admin/payments/dto/create.dto';
import { Payment } from '@persistence/admin/payment/payment.entity';

export interface IPaymentService {
  create(dto: CreatePaymentDto): Promise<Payment>;
  getByAccountId(accountId: string): Promise<Payment>;
  getById(paymentId: number): Promise<Payment>;
  listPayments(): Promise<Payment[]>;
}
