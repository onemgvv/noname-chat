import { Module } from '@nestjs/common';
import { PaymentRepositoryModule } from '@persistence/admin/payment/payment.module';
import { PaymentServiceProvider } from './payment.provider';

@Module({
  imports: [PaymentRepositoryModule],
  providers: [PaymentServiceProvider],
  exports: [PaymentServiceProvider],
})
export class PaymentModule {}
