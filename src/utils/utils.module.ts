import { FilestoreModule } from './filestore/filestore.module';
import { MailServiceModule } from './mails/mail.module';
import { Module } from '@nestjs/common';
import { Helper } from './app.helper';
import { CloudpaymentsModule } from './cloudpayments/cloudpayments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AppGateway } from './gateways/app.gateway';
import { ChatQueueService } from './chat/chat.queue';
import { AdminService } from './admin.service';

@Module({
  imports: [
    MailServiceModule,
    CloudpaymentsModule,
    FilestoreModule,
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
