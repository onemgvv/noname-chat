import { CreatePaymentDto } from '@api/admin/payments/dto/create.dto';
import { Payment } from '@persistence/admin/payment/payment.entity';
import { Repository } from 'typeorm';

export interface IPaymentRepository extends Repository<Payment> {
  newPayment(data: CreatePaymentDto): Promise<Payment>;
  getByAccountId(accountId: string): Promise<Payment>;
  getById(paymentId: number): Promise<Payment>;
  listPayments(): Promise<Payment[]>;
}
