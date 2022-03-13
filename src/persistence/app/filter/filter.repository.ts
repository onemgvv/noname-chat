import { Injectable } from '@nestjs/common';
import { Filter as FilterType } from '@domain/app/filter/filter.type';
import { EntityRepository, Repository } from 'typeorm';
import { Filter } from '@persistence/app/filter/filter.entity';
import { IFilterRepository } from '@domain/app/filter/interface/filter-repo.interface';

@Injectable()
@EntityRepository(Filter)
export class FilterRepository
  extends Repository<Filter>
  implements IFilterRepository
{
  private allRelations = ['user'];

  async newFilter(data: Partial<FilterType>): Promise<Filter> {
    const filter = await this.create(data);
    return this.save(filter);
  }

  async getByUserId(userId: number, relations?: string[]): Promise<Filter> {
    return this.findOne({
      where: { userId },
      relations: relations ?? this.allRelations,
    });
  }

  async edit(filter: Filter, data: Partial<FilterType>): Promise<Filter> {
    await Object.keys(data).forEach((key) => {
      filter[key] = data[key];
    });

    return this.save(filter);
  }
}
