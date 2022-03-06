import { IMailService } from './../../auth/interface/mail.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMail } from './interface/send-mail.interface';
import welcomeMail from '@utils/mails/templates/welcome.mail';
import refreshMail from '@utils/mails/templates/refresh.mail';

@Injectable()
export class MailService implements IMailService {
  constructor(private mailerService: MailerService) {}

  sendWelcomeMail(data: SendMail) {
    return this.mailerService.sendMail(welcomeMail(data.email, data.password));
  }

  sendRefreshMail(data: SendMail) {
    return this.mailerService.sendMail(
      refreshMail(data.email, data.refreshCode),
    );
  }
}
