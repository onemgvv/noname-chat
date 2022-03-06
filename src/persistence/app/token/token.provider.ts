import { TokenRepository } from './token.repository';
import { Provider } from '@nestjs/common';

export const TokenRepoProvider: Provider = {
  provide: 'TokenRepo',
  useClass: TokenRepository,
};
