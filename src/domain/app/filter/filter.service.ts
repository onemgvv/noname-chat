import { FILTER_NOT_FOUND, FILTER_REPO } from '@config/constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    const filter = await this.filterRepository.getByUserId(userId, relations);
    if (!filter) throw new NotFoundException(FILTER_NOT_FOUND);

    return filter;
  }

  async update(id: number, data: Partial<FilterType>): Promise<Filter> {
    const filter = await this.filterRepository.findOne(id);
    if (!filter) throw new NotFoundException(FILTER_NOT_FOUND);

    return this.filterRepository.edit(filter, data);
  }

  async deleteOne(id: number): Promise<Filter> {
    const filter = await this.filterRepository.findOne(id);
    if (!filter) throw new NotFoundException(FILTER_NOT_FOUND);

    return this.filterRepository.remove(filter);
  }

  async deleteByUser(userId: number): Promise<Filter> {
    const filter = await this.filterRepository.findOne({ where: { userId } });
    if (!filter) throw new NotFoundException(FILTER_NOT_FOUND);

    return this.filterRepository.remove(filter);
  }
}
