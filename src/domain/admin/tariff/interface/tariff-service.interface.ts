import { CreateTariffDto } from '@api/admin/tariff/dto/create.dto';
import { UpdateTariffDto } from '@api/admin/tariff/dto/update.dto';
import { Tariff } from '@persistence/admin/tariff/tariff.entity';
import { IFindTariff } from './find.interface';

export interface ITariffService {
  create(dto: CreateTariffDto): Promise<IFindTariff>;
  findActive(): Promise<IFindTariff[]>;
  findById(id: number): Promise<IFindTariff>;
  findAll(): Promise<IFindTariff[]>;
  editById(id: number, updateDto: UpdateTariffDto): Promise<IFindTariff>;
  deleteAll(): Promise<void>;
  deleteById(id: number): Promise<Tariff>;
}
