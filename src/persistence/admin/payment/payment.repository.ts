import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from '@api/admin/payments/dto/create.dto';
import { IPaymentRepository } from '@domain/admin/payment/interface/payment-repo.interface';

@Injectable()
@EntityRepository(Payment)
export class PaymentRepository
  extends Repository<Payment>
  implements IPaymentRepository
{
  async newPayment(data: CreatePaymentDto): Promise<Payment> {
    const payment = await this.create(data);
    return this.save(payment);
  }

  getByAccountId(accountId: string): Promise<Payment> {
    return this.findOne({
      where: { accountId },
      relations: ['tariff'],
    });
  }

  async getById(paymentId: number): Promise<Payment> {
    return this.findOne(paymentId, {
      relations: ['tariff'],
    });
  }

  async listPayments(): Promise<Payment[]> {
    return this.find({ relations: ['tariff'] });
  }
}
