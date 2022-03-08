import { Filter } from '@persistence/app/filter/filter.entity';
import { Filter as FilterType } from '@domain/app/filter/filter.type';

export interface IFilterRepository {
  newFilter(data: Partial<FilterType>): Promise<Filter>;
  getByUserId(userId: number, relations?: string[]): Promise<Filter>;
  edit(id: number, data: Partial<FilterType>): Promise<Filter>;
  deleteOne(id: number): Promise<Filter>;
  deleteByUserId(userId: number): Promise<Filter>;
}
