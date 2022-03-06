import { IUpdateFilter } from './interface/update.interface';
import { ICreateFilter } from './interface/create.interface';
import { Repository } from 'typeorm';
import { Filter } from '@persistence/app/filter/filter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterRepository {
  private allRelations = ['users'];

  constructor(
    @InjectRepository(Filter) private filterModel: Repository<Filter>,
  ) {}

  async create(data: ICreateFilter): Promise<Filter> {
    const filter = await this.filterModel.create(data);
    return this.filterModel.save(filter);
  }

  async getByUserId(userId: number, relations?: string[]): Promise<Filter> {
    return this.filterModel.findOneOrFail({
      where: { userId },
      relations: relations ?? this.allRelations,
    });
  }

  async update(id: number, data: IUpdateFilter): Promise<Filter> {
    const filter = await this.filterModel.findOneOrFail(id);

    await Object.keys(data).forEach((key) => {
      filter[key] = data[key];
    });

    return this.filterModel.save(filter);
  }

  async delete(id: number): Promise<Filter> {
    const filter = await this.filterModel.findOneOrFail(id);

    return this.filterModel.remove(filter);
  }

  async deleteByUserId(userId: number) {
    const filter = await this.filterModel.findOne({ where: { userId } });

    return this.filterModel.remove(filter);
  }
}
