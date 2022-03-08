import { TokenService } from './token.service';
import { Provider } from '@nestjs/common';
import { TOKEN_SERVICE } from '@config/constants';

export const TokenServiceProvider: Provider = {
  provide: TOKEN_SERVICE,
  useClass: TokenService,
};
