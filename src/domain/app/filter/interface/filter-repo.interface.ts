import { Filter } from '@persistence/app/filter/filter.entity';
import { Filter as FilterType } from '@domain/app/filter/filter.type';
import { Repository } from 'typeorm';

export interface IFilterRepository extends Repository<Filter> {
  newFilter(data: Partial<FilterType>): Promise<Filter>;
  getByUserId(userId: number, relations?: string[]): Promise<Filter>;
  edit(filter: Filter, data: Partial<FilterType>): Promise<Filter>;
}
