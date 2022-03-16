import { CustomAuthGuard } from '@common/guards/custom-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { ELITE_SERVICE } from '@config/constants';
import { CurrentUser } from '@decorators/current-user.decorator';
import { Roles } from '@decorators/roles.decorator';
import { IEliteService } from '@domain/app/elite/interface/elite-service.interface';
import { RolesList } from '@enums/roles.enum';
import { CheckPremiumInterceptor } from '@interceptors/premium.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Elite } from '@persistence/app/elite/elite.entity';
import { User } from '@persistence/app/user/user.entity';
import { CreateEliteDto } from './dto/create.dto';

const EliteService = () => Inject(ELITE_SERVICE);

@ApiTags('Elite')
@Controller('elite')
export class EliteController {
  constructor(@EliteService() private eliteService: IEliteService) {}

  @ApiOperation({ summary: 'Create new elite' })
  @ApiResponse({ status: 201, description: 'Elites created successfully' })
  @ApiBody({ type: CreateEliteDto })
  @Post('create')
  @HttpCode(201)
  @Roles(RolesList.USER)
  @UseInterceptors(
    new TransformInterceptor(CreateEliteDto),
    CheckPremiumInterceptor,
  )
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

  @ApiOperation({ summary: 'Receive all elites' })
  @ApiResponse({ status: 200, description: 'Elite received successfully' })
  @Get()
  @HttpCode(200)
  async findAll() {
    return this.eliteService.receive();
  }

  @ApiOperation({ summary: 'Count elites' })
  @ApiResponse({ status: 200, description: 'Elite counted successfully' })
  @Get('count')
  @HttpCode(200)
  async countElites() {
    const elites = await this.eliteService.receive();

    return elites.length;
  }

  @ApiOperation({ summary: 'Clear elite' })
  @ApiResponse({ status: 200, description: 'Elite successfully cleared' })
  @Delete()
  @HttpCode(200)
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async clearAll() {
    return this.eliteService.clear();
  }

  @ApiOperation({ summary: 'Elite delete by user id' })
  @ApiResponse({ status: 200, description: 'Elite deleted successfully' })
  @ApiParam({ name: 'userId', type: Number, required: true })
  @Delete(':userId')
  @HttpCode(200)
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteByUserId(@Param('userId') userId: number) {
    await this.eliteService.getByUser(userId);
    return this.eliteService.deleteByUser(userId);
  }
}
