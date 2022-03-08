import { FilterServiceImpl } from './filter.service';
import { Provider } from '@nestjs/common';
import { FILTER_SERVICE } from '@config/constants';

export const FilterServiceProvider: Provider = {
  provide: FILTER_SERVICE,
  useClass: FilterServiceImpl,
};
