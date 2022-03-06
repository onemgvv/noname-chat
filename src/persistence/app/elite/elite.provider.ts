import { EliteRepository } from './elite.repository';
import { Provider } from '@nestjs/common';

export const EliteRepoProvider: Provider = {
  provide: 'EliteRepo',
  useClass: EliteRepository,
};
