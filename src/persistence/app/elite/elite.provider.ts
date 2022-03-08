import { EliteRepository } from './elite.repository';
import { Provider } from '@nestjs/common';
import { ELITE_REPO } from '@config/constants';

export const EliteRepoProvider: Provider = {
  provide: ELITE_REPO,
  useClass: EliteRepository,
};
