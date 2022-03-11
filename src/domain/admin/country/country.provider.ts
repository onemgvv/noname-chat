import { Provider } from '@nestjs/common';
import { COUNTRY_SERVICE } from '@config/constants';
import { CountryServiceImpl } from './country.service';

export const CountryServiceProvider: Provider = {
  provide: COUNTRY_SERVICE,
  useClass: CountryServiceImpl,
};
