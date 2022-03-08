import { Filter as FilterType } from '@domain/app/filter/filter.type';
import { EntityRepository, Repository } from 'typeorm';
import { Filter } from '@persistence/app/filter/filter.entity';
import { IFilterRepository } from '@domain/app/filter/interface/filter-repo.interface';

@EntityRepository(Filter)
export class FilterRepository
  extends Repository<Filter>
  implements IFilterRepository
{
  private allRelations = ['users'];

  async newFilter(data: Partial<FilterType>): Promise<Filter> {
    const filter = await this.create(data);
    return this.save(filter);
  }

  async getByUserId(userId: number, relations?: string[]): Promise<Filter> {
    return this.findOneOrFail({
      where: { userId },
      relations: relations ?? this.allRelations,
    });
  }

  async edit(id: number, data: Partial<FilterType>): Promise<Filter> {
    const filter = await this.findOneOrFail(id);

    await Object.keys(data).forEach((key) => {
      filter[key] = data[key];
    });

    return this.save(filter);
  }

  async deleteOne(id: number): Promise<Filter> {
    const filter = await this.findOneOrFail(id);

    return this.remove(filter);
  }

  async deleteByUserId(userId: number): Promise<Filter> {
    const filter = await this.findOne({ where: { userId } });

    return this.remove(filter);
  }
}
