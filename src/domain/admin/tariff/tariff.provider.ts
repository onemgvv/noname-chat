import { TARIFF_SERVICE } from '@config/constants';
import { Provider } from '@nestjs/common';
import { TariffServiceImpl } from './tariff.service';

export const TariffServiceProvider: Provider = {
  provide: TARIFF_SERVICE,
  useClass: TariffServiceImpl,
};
