import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Create new topic' })
  @ApiResponse({ status: 201, description: 'Topic created successfully' })
  @ApiBody({ type: CreateTopicDto })
  @Post('create')
  @HttpCode(201)
  @UseGuards(CustomAuthGuard)
  @UseInterceptors(new TransformInterceptor(CreateTopicDto))
  async create(@Body() topicDto: CreateTopicDto) {
    let topic: Topic = await this.topicService.findByUserId(topicDto.userId);
    topic = await this.topicService.create(topicDto);
    return { message: 'Тема успешно создана!', topic };
  }

  @ApiOperation({ summary: 'Receive all topics' })
  @ApiResponse({ status: 200, description: 'Topics received' })
  @Get()
  async getAll() {
    const topic: Topic[] = await this.topicService.find();
    return { statusCode: HttpStatus.OK, topic };
  }

  @ApiOperation({ summary: 'Delete topic by id' })
  @ApiResponse({ status: 200, description: 'Topic deleted successfully' })
  @ApiResponse({ status: 404, description: 'Topic not found' })
  @ApiParam({ name: 'topicId', description: 'topics id', type: Number })
  @Delete('accept/:topicId')
  @UseGuards(CustomAuthGuard)
  async deleteById(@Param('topicId') topicId: number) {
    await this.topicService.deleteById(topicId);
    return { statusCode: HttpStatus.OK };
  }

  @ApiOperation({ summary: 'Delete users topic' })
  @ApiResponse({ status: 200, description: 'Topic deleted successfully' })
  @ApiResponse({ status: 404, description: 'Topic not found' })
  @Delete()
  @UseGuards(CustomAuthGuard)
  async deleteTopic(@CurrentUser() user: User) {
    await this.topicService.deleteByUser(user.id);
    return { statusCode: HttpStatus.OK, message: 'Ваша тема успешно удалена' };
  }

  @ApiOperation({ summary: 'Remove all topics' })
  @ApiResponse({ status: 200, description: 'Topics deleted successfully' })
  @ApiResponse({ status: 404, description: 'Topics not found' })
  @Delete()
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async clearAll() {
    await this.topicService.clear();
    return { statusCode: HttpStatus.OK, message: 'Темы успешно очищены!' };
  }
}
