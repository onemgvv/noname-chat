import { Filter as FilterType } from '@domain/app/filter/filter.type';
import { Filter } from '@persistence/app/filter/filter.entity';

export interface IFilterService {
  create(data: Partial<FilterType>): Promise<Filter>;
  findByUserId(userId: number, relations?: string[]): Promise<Filter>;
  update(id: number, data: Partial<FilterType>): Promise<Filter>;
  deleteOne(id: number): Promise<Filter>;
  deleteByUser(userId: number): Promise<Filter>;
}
