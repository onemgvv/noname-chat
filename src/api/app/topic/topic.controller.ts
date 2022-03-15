import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { CustomAuthGuard } from '@common/guards/custom-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { TOPIC_SERVICE } from '@config/constants';
import { CurrentUser } from '@decorators/current-user.decorator';
import { Roles } from '@decorators/roles.decorator';
import { ITopicService } from '@domain/app/topic/interface/topic-service.interface';
import { RolesList } from '@enums/roles.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Topic } from '@persistence/app/topic/topic.entity';
import { User } from '@persistence/app/user/user.entity';
import { CreateTopicDto } from './dto/create.dto';

const TopicService = () => Inject(TOPIC_SERVICE);

@ApiTags('Topics')
@Controller('themes')
export class TopicController {
  constructor(@TopicService() private topicService: ITopicService) {}

  @Post('create')
  @HttpCode(201)
  @UseGuards(CustomAuthGuard)
  @UseInterceptors(new TransformInterceptor(CreateTopicDto))
  async create(@Body() topicDto: CreateTopicDto) {
    let topic: Topic = await this.topicService.findByUserId(topicDto.userId);
    topic = await this.topicService.create(topicDto);
    return { message: 'Тема успешно создана!', topic };
  }

  @Get()
  async getAll() {
    const topic: Topic[] = await this.topicService.find();
    return { statusCode: HttpStatus.OK, topic };
  }

  @Delete('accept/:topicId')
  @UseGuards(CustomAuthGuard)
  async deleteById(@Param('topicId') topicId: number) {
    await this.topicService.deleteById(topicId);
    return { statusCode: HttpStatus.OK };
  }

  @Delete(':topicId')
  @UseGuards(CustomAuthGuard)
  async deleteTopic(@CurrentUser() user: User) {
    await this.topicService.deleteByUser(user.id);
    return { statusCode: HttpStatus.OK, message: 'Ваша тема успешно удалена' };
  }

  @Delete()
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async clearAll() {
    await this.topicService.clear();
    return { statusCode: HttpStatus.OK, message: 'Темы успешно очищены!' };
  }
}
