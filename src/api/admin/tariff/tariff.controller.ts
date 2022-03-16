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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

const TariffService = () => Inject(TARIFF_SERVICE);

@ApiTags('Admin tariffs')
@Controller('admin/tariffs')
export class TariffsController {
  constructor(
    @TariffService() private readonly tariffService: ITariffService,
  ) {}

  @ApiOperation({ summary: 'Create new tariff' })
  @ApiResponse({
    status: 201,
    description: 'The new tariff created successfully',
  })
  @ApiBody({
    type: CreateTariffDto,
  })
  @Post()
  @HttpCode(201)
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async create(@Body() dto: CreateTariffDto): Promise<IFindTariff> {
    return this.tariffService.create(dto);
  }

  @ApiOperation({ summary: 'Receive all tariffs' })
  @ApiResponse({ status: 200, description: 'Tariffs found successfully' })
  @ApiResponse({ status: 404, description: 'Tariffs not found in system' })
  @Get()
  async getAllTariffs(): Promise<IFindTariff[]> {
    return this.tariffService.findAll();
  }

  @ApiOperation({ summary: 'get tariffs by id' })
  @ApiResponse({ status: 200, description: 'Tariff found successfully' })
  @ApiResponse({ status: 404, description: 'Tariff not found in system' })
  @ApiParam({ name: 'id', description: 'tariff id', type: Number })
  @Get('byId/:id')
  async getById(@Param('id') id: number): Promise<IFindTariff> {
    return this.tariffService.findById(id);
  }

  @ApiOperation({ summary: 'Receive active tariffs' })
  @ApiResponse({
    status: 200,
    description: 'Active tariffs found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Active tariffs not found in system',
  })
  @Get('active')
  @HttpCode(200)
  async getActiveTariffs(): Promise<IFindTariff[]> {
    return this.tariffService.findActive();
  }

  @ApiOperation({ summary: 'update tariff' })
  @ApiResponse({ status: 200, description: 'Tariff update successfully' })
  @ApiResponse({ status: 404, description: 'Tariff not found in system' })
  @ApiParam({ name: 'id', description: 'tariff id', type: Number })
  @ApiBody({ type: UpdateTariffDto })
  @Patch(':id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async editTariff(
    @Param('id') id: number,
    @Body() updateDto: UpdateTariffDto,
  ): Promise<IFindTariff> {
    return this.tariffService.editById(id, updateDto);
  }

  @ApiOperation({ summary: 'delete tariffs' })
  @ApiResponse({ status: 200, description: 'Tariffs deleted successfully' })
  @ApiResponse({ status: 404, description: 'Tariffs not found in system' })
  @Delete()
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteTariffs(): Promise<void> {
    return this.tariffService.deleteAll();
  }

  @ApiOperation({ summary: 'delete tariff' })
  @ApiResponse({ status: 200, description: 'Tariff deleted successfully' })
  @ApiResponse({ status: 404, description: 'Tariff not found in system' })
  @ApiParam({ name: 'id', description: 'tariff id', type: Number })
  @Delete(':id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteTariff(@Param('id') id: number): Promise<Tariff> {
    return this.tariffService.deleteById(id);
  }
}
