import { CreateTariffDto } from '@api/admin/tariff/dto/create.dto';
import { UpdateTariffDto } from '@api/admin/tariff/dto/update.dto';
import {
  ACTIVE_TARIFFS_NOT_EXIST,
  TARIFFS_NOT_FOUND,
  TARIFF_NOT_FOUND,
  TARIFF_REPO,
} from '@config/constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IFindTariff } from '@persistence/admin/tariff/interface/find.interface';
import { Tariff } from '@persistence/admin/tariff/tariff.entity';
import { ITariffRepository } from './interface/tariff-repo.interface';
import { ITariffService } from './interface/tariff-service.interface';

const TariffRepo = () => Inject(TARIFF_REPO);

@Injectable()
export class TariffServiceImpl implements ITariffService {
  constructor(@TariffRepo() private tariffRepository: ITariffRepository) {}

  async create(dto: CreateTariffDto): Promise<IFindTariff> {
    return this.tariffRepository.newTariff({
      ...dto,
      active: dto.active ?? false,
    });
  }

  async findActive(): Promise<IFindTariff[]> {
    const tariffs: Tariff[] = await this.tariffRepository.find({
      where: { active: true },
    });
    if (tariffs.length === 0)
      throw new NotFoundException(ACTIVE_TARIFFS_NOT_EXIST);

    return tariffs;
  }

  async findById(id: number): Promise<IFindTariff> {
    const tariff = await this.tariffRepository.findById(id);
    if (!tariff) throw new NotFoundException(TARIFF_NOT_FOUND);

    return tariff;
  }

  async findAll(): Promise<IFindTariff[]> {
    const tariffs = await this.tariffRepository.findAll();
    if (!tariffs || tariffs.length === 0)
      throw new NotFoundException(TARIFFS_NOT_FOUND);

    return tariffs;
  }

  async editById(id: number, updateDto: UpdateTariffDto): Promise<IFindTariff> {
    const tariff = await this.tariffRepository.findById(id);
    if (!tariff) throw new NotFoundException(TARIFF_NOT_FOUND);

    return this.tariffRepository.edit(id, {
      ...updateDto,
      active: updateDto.active ?? false,
    });
  }

  async deleteAll(): Promise<void> {
    return this.tariffRepository.clear();
  }

  async deleteById(id: number): Promise<Tariff> {
    const tariff = await this.tariffRepository.findById(id);
    if (!tariff) throw new NotFoundException(TARIFF_NOT_FOUND);

    return this.tariffRepository.remove(tariff);
  }
}
