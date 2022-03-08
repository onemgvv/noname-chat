import { BlacklistRepository } from './blacklist.repository';
import { Provider } from '@nestjs/common';
import { BLACKLIST_REPO } from '@config/constants';

export const BlacklistRepoProvider: Provider = {
  provide: BLACKLIST_REPO,
  useClass: BlacklistRepository,
};
