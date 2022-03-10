import { CHECK_PREMIUM } from '@config/constants';
import { CheckPremiumInterceptor } from '@interceptors/premium.interceptor';
import { Provider } from '@nestjs/common';

export const CheckPremiumProvider: Provider = {
  provide: CHECK_PREMIUM,
  useFactory: () => new CheckPremiumInterceptor(),
  inject: [],
};
