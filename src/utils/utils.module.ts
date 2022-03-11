import { FilestoreModule } from './filestore/filestore.module';
import { MailServiceModule } from './mails/mail.module';
import { Module } from '@nestjs/common';
import { Helper } from './app.helper';
import { CloudpaymentsModule } from './cloudpayments/cloudpayments.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    MailServiceModule,
    CloudpaymentsModule,
    FilestoreModule,
    NotificationsModule,
  ],
  providers: [Helper],
  exports: [
    Helper,
    MailServiceModule,
    CloudpaymentsModule,
    FilestoreModule,
    NotificationsModule,
  ],
})
export class UtilsModule {}
