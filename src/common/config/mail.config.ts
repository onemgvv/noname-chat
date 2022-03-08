import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const MailTransportConfig = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  ignoreTLS: false,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  defaults: {
    from: 'noname.fun <noreply@magomedgasanov.ru>',
  },
  template: {
    dir: __dirname.replace('/common/config', '/utils/mails/templates'),
    adapted: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
