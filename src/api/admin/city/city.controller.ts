import { CITY_REPO, COUNTRY_SERVICE } from '@config/constants';
import {
  Controller,
  Get,
  Post,
  HttpStatus,
  NotFoundException,
  Param,
  Res,
  HttpCode,
  Body,
  UseGuards,
  Delete,
  Patch,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { Roles } from '@common/decorators/roles.decorator';
import { CustomAuthGuard } from '@common/guards/custom-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { CreateCityDto } from './dto/create-city.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { RolesList } from '@enums/roles.enum';
import { ICityService } from '@domain/admin/city/interface/city-service.interface';
import { ICoutnryService } from '@domain/admin/country/interface/country-service.interface';

const CityService = () => Inject(CITY_REPO);
const CountryService = () => Inject(COUNTRY_SERVICE);

@Controller('cities')
export class CityController {
  constructor(
    @CityService() private readonly citiesService: ICityService,
    @CountryService() private readonly countryService: ICoutnryService,
  ) {}

  @Post()
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateCityDto, @Res() response: Response) {
    const city = await this.citiesService.create(dto);
    if (!city)
      return response
        .status(400)
        .json({ message: 'Проверьте введенные данные' });

    return response.json({
      statusCode: HttpStatus.CREATED,
      message: 'Город добавлен',
      city,
    });
  }

  @Post('country')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @HttpCode(201)
  async createCountry(@Body() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }

  @Patch('country/:id')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @HttpCode(200)
  async editCountry(@Param('id') id: number, @Body() dto: UpdateCountryDto) {
    return this.countryService.update(id, dto);
  }

  @Patch('/update/:id')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @HttpCode(200)
  async editCity(@Param('id') id: number, @Body() dto: UpdateCityDto) {
    return this.citiesService.update(id, dto);
  }

  @Delete('country/:id')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @HttpCode(200)
  async removeCountry(@Param('id') id: number, @Res() response: Response) {
    await this.countryService.remove(id);
    return response.status(200).json({ statusCode: 200, success: true });
  }

  @Delete(':id')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @HttpCode(200)
  async deleteOne(@Param('id') id: number, @Res() response: Response) {
    const city = await this.citiesService.deleteOne(id);
    if (!city)
      return response.status(400).json({ message: 'Проверьте входные данные' });

    return response.json({
      statusCode: HttpStatus.CREATED,
      message: 'Город добавлен',
      city,
    });
  }

  @Get('id/:id')
  async findOne(@Param('id') id: number, @Res() response: Response) {
    const city = await this.citiesService.findOne(id);
    if (!city) throw new NotFoundException('Город не найден');

    return response.json({
      statusCode: HttpStatus.OK,
      message: 'Город найден',
      city,
    });
  }

  @Get('/name/:name')
  async findByName(@Param('name') name: string, @Res() response: Response) {
    const city = await this.citiesService.findByName(name);
    if (!city) throw new NotFoundException('Город не найден');

    return response.json({
      statusCode: HttpStatus.OK,
      message: 'Город найден',
      city,
    });
  }

  @Get('country/:name/cities')
  async findAllCoutryCities(
    @Param('name') name: string,
    @Res() response: Response,
  ) {
    const country = await this.countryService.findByName(name);
    const countryCities = await this.citiesService.findByCountry(country.id);

    return response.json({ statusCode: HttpStatus.OK, cities: countryCities });
  }

  @Get('country')
  async findAll(@Res() response: Response) {
    const countries = await this.countryService.receiveAll();

    return response.json({ statusCode: HttpStatus.OK, countries });
  }

  @Get()
  async findAllCities(@Res() response: Response) {
    const cities = await this.citiesService.findAll();
    if (cities.length === 0)
      throw new NotFoundException('В системе нет городов!');

    return response.json({
      statusCode: HttpStatus.OK,
      message: 'Города найдены',
      cities,
    });
  }
}
