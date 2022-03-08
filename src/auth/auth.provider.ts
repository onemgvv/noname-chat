import { AuthService } from './services/auth.service';
import { SocialAuthService } from './services/social-auth.service';
import { Provider } from '@nestjs/common';
import { AUTH_SERVICE, SOC_AUTH_SERVICE } from '@config/constants';

export const AuthServiceProvider: Provider = {
  provide: AUTH_SERVICE,
  useClass: AuthService,
};

export const SocialAuthServiceProvider: Provider = {
  provide: SOC_AUTH_SERVICE,
  useClass: SocialAuthService,
};
