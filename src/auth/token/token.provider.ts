import { TokenService } from './token.service';
import { Provider } from '@nestjs/common';

export const TokenServiceProvider: Provider = {
  provide: 'TokenService',
  useClass: TokenService,
};
