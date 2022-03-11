import { IPaymentRepository } from './interface/payment-repo.interface';
import { PAYMENT_REPO } from '@config/constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPaymentService } from './interface/payment-service.interface';
import { CreatePaymentDto } from '@api/admin/payments/dto/create.dto';
import { Payment } from '@persistence/admin/payment/payment.entity';

const PaymentRepo = () => Inject(PAYMENT_REPO);

@Injectable()
export class PaymentServiceImpl implements IPaymentService {
  constructor(@PaymentRepo() private paymentRepository: IPaymentRepository) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    return this.paymentRepository.newPayment(dto);
  }

  async getByAccountId(accountId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { accountId },
    });
    if (!payment) throw new NotFoundException('TODO: constants');

    return payment;
  }

  async getById(paymentId: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne(paymentId);
    if (!payment) throw new NotFoundException();

    return payment;
  }

  async listPayments(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }
}
