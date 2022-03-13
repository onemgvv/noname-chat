import { FilestoreModule } from './filestore/filestore.module';
import { MailServiceModule } from './mails/mail.module';
import { Module } from '@nestjs/common';
import { Helper } from './app.helper';
import { CloudpaymentsModule } from './cloudpayments/cloudpayments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AppGateway } from './gateways/app.gateway';
import { ChatQueueService } from './chat/chat.queue';
import { AdminService } from './admin.service';
import { UserModule } from '@domain/app/user/user.module';
import { PaymentModule } from '@domain/admin/payment/payment.module';
import { RoleRepositoryModule } from '@persistence/app/role/role.module';

@Module({
  imports: [
    UserModule,
    PaymentModule,
    MailServiceModule,
    CloudpaymentsModule,
    FilestoreModule,
    RoleRepositoryModule,
    NotificationsModule,
  ],
  providers: [AppGateway, Helper, ChatQueueService, AdminService],
  exports: [
    Helper,
    AppGateway,
    AdminService,
    ChatQueueService,
    MailServiceModule,
    CloudpaymentsModule,
    FilestoreModule,
    NotificationsModule,
  ],
})
export class UtilsModule {}
