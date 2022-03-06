import { MailServiceProvider } from './mail.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [MailServiceProvider],
  exports: [MailServiceProvider],
})
export class MailServiceModule {}
