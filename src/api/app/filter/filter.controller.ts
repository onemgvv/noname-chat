import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { CustomAuthGuard } from '@common/guards/custom-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { FILTER_SERVICE, USER_SERVICE } from '@config/constants';
import { Roles } from '@decorators/roles.decorator';
import { IFilterService } from '@domain/app/filter/interface/filter-service.interface';
import { IUserService } from '@domain/app/user/interface/user-service.inerface';
import { RolesList } from '@enums/roles.enum';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import CreateFilterDto from './dto/create.dto';
import UpdateFilterDto from './dto/update.dto';
import { CheckPremiumInterceptor } from '@interceptors/premium.interceptor';

const FilterService = () => Inject(FILTER_SERVICE);
const UserService = () => Inject(USER_SERVICE);

@ApiTags('Filter')
@Controller('filter')
export class FilterController {
  constructor(
    @FilterService() private filterService: IFilterService,
    @UserService() private userService: IUserService,
  ) {}

  @ApiResponse({ status: 201, description: 'Filter successfully created' })
  @ApiBody({ type: CreateFilterDto })
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(RolesList.PREMIUM)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @UseInterceptors(
    new TransformInterceptor(CreateFilterDto),
    CheckPremiumInterceptor,
  )
  async create(@Body() searchDto: CreateFilterDto) {
    const filter = await this.filterService.create(searchDto);
    if (!filter) throw new BadRequestException('Проверьте входные данные');

    return {
      status: HttpStatus.CREATED,
      message: 'Фильтр успешно создан!',
      filter,
    };
  }

  @ApiResponse({ status: 200, description: 'Filter successfully found' })
  @ApiParam({
    name: 'id',
    description: 'users id',
    required: true,
    type: Number,
  })
  @Get(':id')
  @UseGuards(CustomAuthGuard, RolesGuard)
  @Roles(RolesList.PREMIUM)
  @UseInterceptors(CheckPremiumInterceptor)
  async getById(@Param('id') id: number) {
    const filter = await this.filterService.findByUserId(id);
    if (!filter) throw new NotFoundException('Фильтры не найдены');

    return {
      status: HttpStatus.OK,
      message: 'Фильтр найден',
      filter,
    };
  }

  @ApiResponse({ status: 200, description: 'Filter successfully updated' })
  @ApiParam({
    name: 'id',
    description: 'filter id',
    required: true,
    type: Number,
  })
  @ApiBody({ type: UpdateFilterDto })
  @Put(':id')
  @Roles(RolesList.PREMIUM)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @UseInterceptors(
    new TransformInterceptor(UpdateFilterDto),
    CheckPremiumInterceptor,
  )
  async update(@Param('id') id: number, @Body() updateDto: UpdateFilterDto) {
    const newSearch = await this.filterService.update(id, updateDto);

    return {
      status: HttpStatus.OK,
      message: 'Фильтр успешно обновлен!',
      search: newSearch,
    };
  }

  @ApiResponse({ status: 200, description: 'Filter successfully deleted' })
  @ApiParam({
    name: 'userId',
    description: 'users id',
    required: true,
    type: Number,
  })
  @Delete()
  @Roles(RolesList.PREMIUM)
  @UseGuards(CustomAuthGuard, RolesGuard)
  @UseInterceptors(CheckPremiumInterceptor)
  async delete(@Body('userId') userId: number) {
    const user = await this.userService.findUser('id', userId);
    await this.filterService.deleteByUser(user.id);

    return { status: HttpStatus.OK, message: 'Фильтр очищен!' };
  }
}
