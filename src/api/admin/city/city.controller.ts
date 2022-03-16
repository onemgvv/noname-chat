import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import { CITY_SERVICE, COUNTRY_SERVICE } from '@config/constants';
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

const CityService = () => Inject(CITY_SERVICE);
const CountryService = () => Inject(COUNTRY_SERVICE);

@ApiTags('Admin cities')
@Controller('cities')
export class CityController {
  constructor(
    @CityService() private readonly citiesService: ICityService,
    @CountryService() private readonly countryService: ICoutnryService,
  ) {}

  @ApiOperation({ summary: 'Create new city' })
  @ApiResponse({ status: 201, description: 'City succesfully created' })
  @ApiBody({ type: CreateCityDto })
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

  @ApiOperation({ summary: 'Create new country' })
  @ApiResponse({ status: 201, description: 'Country succesfully created' })
  @ApiBody({ type: CreateCountryDto })
  @Post('country')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @HttpCode(201)
  async createCountry(@Body() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }

  @ApiOperation({ summary: 'Edit country' })
  @ApiResponse({ status: 201, description: 'Country succesfully updated' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  @ApiProperty({ name: 'id', type: Number, description: 'country id' })
  @ApiBody({ type: UpdateCountryDto })
  @Patch('country/:id')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @HttpCode(200)
  async editCountry(@Param('id') id: number, @Body() dto: UpdateCountryDto) {
    return this.countryService.update(id, dto);
  }

  @ApiOperation({ summary: 'Edit city' })
  @ApiResponse({ status: 201, description: 'City succesfully updated' })
  @ApiResponse({ status: 404, description: 'City not found' })
  @ApiProperty({ name: 'id', type: Number, description: 'city id' })
  @ApiBody({ type: UpdateCountryDto })
  @Patch('/update/:id')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @HttpCode(200)
  async editCity(@Param('id') id: number, @Body() dto: UpdateCityDto) {
    return this.citiesService.update(id, dto);
  }

  @ApiOperation({ summary: 'Remove country' })
  @ApiResponse({ status: 201, description: 'Country succesfully deleted' })
  @ApiProperty({ name: 'id', type: Number, description: 'country id' })
  @Delete('country/:id')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @HttpCode(200)
  async removeCountry(@Param('id') id: number, @Res() response: Response) {
    await this.countryService.remove(id);
    return response.status(200).json({ statusCode: 200, success: true });
  }

  @ApiOperation({ summary: 'Remove city' })
  @ApiResponse({ status: 201, description: 'City succesfully deleted' })
  @ApiProperty({ name: 'id', type: Number, description: 'city id' })
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

  @ApiOperation({ summary: 'Find city by id' })
  @ApiResponse({ status: 201, description: 'City succesfully found' })
  @ApiResponse({ status: 404, description: 'City not found' })
  @ApiProperty({ name: 'id', type: Number, description: 'country id' })
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

  @ApiOperation({ summary: 'Find city by name' })
  @ApiResponse({ status: 201, description: 'City successfully found' })
  @ApiResponse({ status: 404, description: 'City not found' })
  @ApiProperty({ name: 'name', type: Number, description: 'name of the city' })
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

  @ApiOperation({ summary: 'Find cities by country name' })
  @ApiResponse({ status: 201, description: 'Cities successfully found' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  @ApiResponse({ status: 404, description: 'Country havent cities' })
  @ApiProperty({
    name: 'name',
    type: Number,
    description: 'name of the country',
  })
  @Get('country/:name/cities')
  async findAllCoutryCities(
    @Param('name') name: string,
    @Res() response: Response,
  ) {
    const country = await this.countryService.findByName(name);
    const countryCities = await this.citiesService.findByCountry(country.id);

    return response.json({ statusCode: HttpStatus.OK, cities: countryCities });
  }

  @ApiOperation({ summary: 'Find all countries' })
  @ApiResponse({ status: 201, description: 'Countries successfully found' })
  @ApiResponse({ status: 404, description: 'Countries not found' })
  @Get('country')
  async findAll(@Res() response: Response) {
    const countries = await this.countryService.receiveAll();

    return response.json({ statusCode: HttpStatus.OK, countries });
  }

  @ApiOperation({ summary: 'Find all cities' })
  @ApiResponse({ status: 201, description: 'Cities successfully found' })
  @ApiResponse({ status: 404, description: 'Cities not found' })
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
