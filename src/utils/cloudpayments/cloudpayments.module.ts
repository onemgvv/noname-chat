import { ADMIN_CONNECTION } from '@common/config/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryModule } from '@persistence/app/user/user.module';
import { Module } from '@nestjs/common';
import { Payment } from '@persistence/admin/payment/payment.entity';
import { CloudpaymentsServiceProvider } from './cloudpayments.provider';

@Module({
  imports: [
    UserRepositoryModule,
    TypeOrmModule.forFeature([Payment], ADMIN_CONNECTION),
  ],
  providers: [CloudpaymentsServiceProvider],
  exports: [CloudpaymentsServiceProvider],
})
export class CloudpaymentsModule {}
