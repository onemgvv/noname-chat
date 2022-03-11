import { CreateTariffDto } from '@api/admin/tariff/dto/create.dto';
import { UpdateTariffDto } from '@api/admin/tariff/dto/update.dto';
import { ITariffRepository } from '@domain/admin/tariff/interface/tariff-repo.interface';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { IFindTariff } from './interface/find.interface';
import { Tariff } from './tariff.entity';

@Injectable()
@EntityRepository(Tariff)
export class TariffRepository
  extends Repository<Tariff>
  implements ITariffRepository
{
  async newTariff(data: CreateTariffDto): Promise<IFindTariff> {
    const tariff = await this.create(data);
    return this.save(tariff);
  }

  findActive(): Promise<IFindTariff[]> {
    return this.find({ where: { active: true }, relations: ['payments'] });
  }

  findById(id: number): Promise<Tariff> {
    return this.findOne(id, { relations: ['payments'] });
  }

  findAll(): Promise<IFindTariff[]> {
    return this.find({ relations: ['payments'] });
  }

  async edit(id: number, data: UpdateTariffDto): Promise<IFindTariff> {
    const tariff = await this.findOne(id);

    Object.keys(data).forEach((key) => {
      if (data[key]) tariff[key] = data[key];
    });

    return this.save(tariff);
  }

  async deleteById(id: number): Promise<IFindTariff> {
    const tariff = await this.findOne(id);
    return this.remove(tariff);
  }
}
