import {
  AuthServiceProvider,
  SocialAuthServiceProvider,
} from './auth.provider';
import { MailServiceModule } from './../utils/mails/mail.module';
import { SocialAuthService } from './services/social-auth.service';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TokenModule } from './token/token.module';

@Module({
  imports: [TokenModule, MailServiceModule],
  providers: [
    AuthService,
    SocialAuthService,
    SocialAuthServiceProvider,
    AuthServiceProvider,
  ],
  exports: [SocialAuthServiceProvider, AuthServiceProvider],
})
export class AuthModule {}
