import { SendMail } from '@utils/mails/interface/send-mail.interface';

export interface IMailService {
  sendWelcomeMail(data: SendMail);
  sendRefreshMail(data: SendMail);
}
