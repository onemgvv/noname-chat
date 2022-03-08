import { FilterRepository } from './filter.repository';
import { Provider } from '@nestjs/common';
import { FILTER_REPO } from '@config/constants';

export const FilterRepoProvider: Provider = {
  provide: FILTER_REPO,
  useClass: FilterRepository,
};
