import { MailServiceProvider } from './mail.provider';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailTransportConfig } from '@config/mail.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: MailTransportConfig,
      }),
    }),
  ],
  providers: [MailServiceProvider],
  exports: [MailServiceProvider],
})
export class MailServiceModule {}
