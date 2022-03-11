import { PaymentRepository } from './payment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PaymentRepoProvider } from './payment.provider';
import { ADMIN_CONNECTION } from '@config/constants';
import { Payment } from './payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, PaymentRepository], ADMIN_CONNECTION),
  ],
  providers: [PaymentRepoProvider],
  exports: [PaymentRepoProvider],
})
export class PaymentRepositoryModule {}
