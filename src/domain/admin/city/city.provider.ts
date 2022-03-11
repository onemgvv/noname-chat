import { Provider } from '@nestjs/common';
import { CITY_SERVICE } from '@config/constants';
import { CityServiceImpl } from './city.service';

export const CityServiceProvider: Provider = {
  provide: CITY_SERVICE,
  useClass: CityServiceImpl,
};
