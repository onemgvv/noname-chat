import { TokenRepository } from './token.repository';
import { Provider } from '@nestjs/common';
import { TOKEN_REPO } from '@config/constants';

export const TokenRepoProvider: Provider = {
  provide: TOKEN_REPO,
  useClass: TokenRepository,
};
