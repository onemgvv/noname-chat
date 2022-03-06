import { BlacklistRepository } from './blacklist.repository';
import { Provider } from '@nestjs/common';

export const BlacklistRepoProvider: Provider = {
  provide: 'BlacklistRepo',
  useClass: BlacklistRepository,
};
