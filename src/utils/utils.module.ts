import { MailServiceModule } from './mails/mail.module';
import { MailService } from './mails/mails.service';
import { Module } from '@nestjs/common';
import { Helper } from './app.helper';

@Module({
  imports: [MailServiceModule],
  providers: [MailService, Helper],
  exports: [MailService, Helper, MailServiceModule],
})
export class UtilsModule {}
