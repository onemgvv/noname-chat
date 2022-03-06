import { FilterRepository } from './filter.repository';
import { Provider } from '@nestjs/common';

export const FilterRepoProvider: Provider = {
  provide: 'FilterRepo',
  useClass: FilterRepository,
};
