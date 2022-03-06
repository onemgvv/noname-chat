import { AuthService } from './services/auth.service';
import { SocialAuthService } from './services/social-auth.service';
import { Provider } from '@nestjs/common';

export const AuthServiceProvider: Provider = {
  provide: 'AuthService',
  useClass: AuthService,
};

export const SocialAuthServiceProvider: Provider = {
  provide: 'SocAuthService',
  useClass: SocialAuthService,
};
