import { CustomAuthGuard } from '@common/guards/custom-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { ELITE_SERVICE } from '@config/constants';
import { CurrentUser } from '@decorators/current-user.decorator';
import { Roles } from '@decorators/roles.decorator';
import { IEliteService } from '@domain/app/elite/interface/elite-service.interface';
import { RolesList } from '@enums/roles.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Elite } from '@persistence/app/elite/elite.entity';
import { User } from '@persistence/app/user/user.entity';
import { CreateEliteDto } from './dto/create.dto';

const EliteService = () => Inject(ELITE_SERVICE);

@Controller('elite')
export class EliteController {
  constructor(@EliteService() private eliteService: IEliteService) {}

  @Post('create')
  @HttpCode(201)
  @Roles(RolesList.USER)
  @UseInterceptors(new TransformInterceptor(CreateEliteDto)) // CheckPremiumInterceptor
  @UseGuards(CustomAuthGuard, RolesGuard)
  async create(@CurrentUser() currentUser: User, @Body() dto: CreateEliteDto) {
    const elite: Elite = await this.eliteService.create(dto);
    if (!elite)
      throw new InternalServerErrorException(
        'Серверная ошибка! Повторите позже!',
      );

    return {
      id: elite.id,
      userId: elite.id,
      adult: elite.adult,
      description: elite.description,
      createdAt: elite.created_at,
      updatedAt: elite.updated_at,
      expiresIn: elite.expiresIn,
      user: currentUser,
    };
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    const elites = await this.eliteService.receive();
    if (!elites)
      throw new NotFoundException(
        'В чате пока нет элитных пользователей, станьте первым!',
      );

    return elites;
  }

  @Get('count')
  @HttpCode(200)
  async countElites() {
    const elites = await this.eliteService.receive();
    if (!elites)
      throw new NotFoundException(
        'В чате пока нет элитных пользователей, станьте первым!',
      );

    return elites.length;
  }

  @Delete()
  @HttpCode(200)
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async clearAll() {
    const elites = await this.eliteService.receive();
    if (!elites)
      throw new NotFoundException('В системе нет элитных пользователей!');

    return this.eliteService.clear();
  }

  @Delete(':userId')
  @HttpCode(200)
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteByUserId(@Param('userId') userId: number) {
    const elite = await this.eliteService.getByUser(userId);
    if (!elite) throw new NotFoundException('Пользователь не из элит!');

    return this.eliteService.deleteByUser(userId);
  }
}
