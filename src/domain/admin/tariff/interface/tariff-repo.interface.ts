import { CreateTariffDto } from '@api/admin/tariff/dto/create.dto';
import { UpdateTariffDto } from '@api/admin/tariff/dto/update.dto';
import { IFindTariff } from '@persistence/admin/tariff/interface/find.interface';
import { Tariff } from '@persistence/admin/tariff/tariff.entity';
import { Repository } from 'typeorm';

export interface ITariffRepository extends Repository<Tariff> {
  newTariff(data: CreateTariffDto): Promise<IFindTariff>;
  findActive(): Promise<IFindTariff[]>;
  findById(id: number): Promise<Tariff>;
  findAll(): Promise<IFindTariff[]>;
  edit(id: number, data: UpdateTariffDto): Promise<IFindTariff>;
  deleteById(id: number): Promise<IFindTariff>;
}
