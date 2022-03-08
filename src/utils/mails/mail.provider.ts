import { MailService } from './mails.service';
import { Provider } from '@nestjs/common';
import { MAIL_SERVICE } from '@config/constants';

export const MailServiceProvider: Provider = {
  provide: MAIL_SERVICE,
  useClass: MailService,
};
