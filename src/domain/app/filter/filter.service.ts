import { FILTER_REPO } from '@config/constants';
import { Inject, Injectable } from '@nestjs/common';
import { Filter as FilterType } from '@domain/app/filter/filter.type';
import { IFilterRepository } from './interface/filter-repo.interface';
import { Filter } from '@persistence/app/filter/filter.entity';
import { IFilterService } from './interface/filter-service.interface';

const FilterRepo = () => Inject(FILTER_REPO);

@Injectable()
export class FilterServiceImpl implements IFilterService {
  constructor(@FilterRepo() private filterRepository: IFilterRepository) {}

  async create(data: Partial<FilterType>): Promise<Filter> {
    return this.filterRepository.newFilter(data);
  }

  async findByUserId(userId: number, relations?: string[]): Promise<Filter> {
    return this.filterRepository.getByUserId(userId, relations);
  }

  async update(id: number, data: Partial<FilterType>): Promise<Filter> {
    return this.filterRepository.edit(id, data);
  }

  async deleteOne(id: number): Promise<Filter> {
    return this.filterRepository.deleteOne(id);
  }

  async deleteByUser(userId: number): Promise<Filter> {
    return this.filterRepository.deleteByUserId(userId);
  }
}
