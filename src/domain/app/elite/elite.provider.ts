import { Provider } from '@nestjs/common';
import { ELITE_SERVICE } from '@config/constants';
import { EliteServiceImpl } from './elite.service';

export const EliteServiceProvider: Provider = {
  provide: ELITE_SERVICE,
  useClass: EliteServiceImpl,
};
