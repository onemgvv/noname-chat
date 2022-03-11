import { TARIFF_SERVICE } from '@config/constants';
import { Tariff } from '@persistence/admin/tariff/tariff.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CustomAuthGuard } from '@common/guards/custom-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { Roles } from '@common/decorators/roles.decorator';
import { RolesList } from '@enums/roles.enum';
import { CreateTariffDto } from './dto/create.dto';
import { UpdateTariffDto } from './dto/update.dto';
import { ITariffService } from '@domain/admin/tariff/interface/tariff-service.interface';
import { IFindTariff } from '@domain/admin/tariff/interface/find.interface';

const TariffService = () => Inject(TARIFF_SERVICE);

@Controller('admin/tariffs')
export class TariffsController {
  constructor(
    @TariffService() private readonly tariffService: ITariffService,
  ) {}

  @Post()
  @HttpCode(201)
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async create(@Body() dto: CreateTariffDto): Promise<IFindTariff> {
    return this.tariffService.create(dto);
  }

  @Get()
  async getAllTariffs(): Promise<IFindTariff[]> {
    return this.tariffService.findAll();
  }

  @Get('byId/:id')
  async getById(@Param('id') id: number): Promise<IFindTariff> {
    return this.tariffService.findById(id);
  }

  @Get('active')
  @HttpCode(200)
  async getActiveTariffs(): Promise<IFindTariff[]> {
    return this.tariffService.findActive();
  }

  @Patch(':id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async editTariff(
    @Param('id') id: number,
    @Body() updateDto: UpdateTariffDto,
  ): Promise<IFindTariff> {
    return this.tariffService.editById(id, updateDto);
  }

  @Delete()
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteTariffs(): Promise<void> {
    return this.tariffService.deleteAll();
  }

  @Delete(':id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteTariff(@Param('id') id: number): Promise<Tariff> {
    return this.tariffService.deleteById(id);
  }
}
