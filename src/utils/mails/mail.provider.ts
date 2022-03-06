import { MailService } from './mails.service';
import { Provider } from '@nestjs/common';

export const MailServiceProvider: Provider = {
  provide: 'MailService',
  useClass: MailService,
};
