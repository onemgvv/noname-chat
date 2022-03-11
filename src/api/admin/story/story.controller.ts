import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@common/decorators/roles.decorator';
import { CustomAuthGuard } from '@common/guards/custom-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { RolesList } from '@enums/roles.enum';
import { CreateContentDto } from './dto/create-content.dto';
import { CreateStoriesDto } from './dto/create-story.dto';
import { STORY_SERVICE } from '@config/constants';
import { IStoryService } from '@domain/admin/story/interface/story-service.interface';
import { Story } from '@persistence/admin/story/story.entity';

const StoryService = () => Inject(STORY_SERVICE);

@Controller('admin/stories')
export class StoryController {
  constructor(@StoryService() private storiesService: IStoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async createStories(dto: CreateStoriesDto) {
    const storie: Story = await this.storiesService.create(dto);
    return { status: true, storie };
  }

  @Post(':id/content')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async addContent(@Param('id') id: number, @Body() dto: CreateContentDto) {
    await this.storiesService.addContent(id, dto);
    const storie: Story = await this.storiesService.getById(id);
    return { status: true, storie };
  }

  @Patch(':id/publish')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async publicshStorie(@Param('id') id: number) {
    const result: boolean = await this.storiesService.publishStorie(id);
    return { status: result };
  }

  @Get(':id/pages')
  async getStoriePages(@Param('id') id: number) {
    const result: number = await this.storiesService.getStoriePages(id);
    return { status: true, pages: result };
  }

  @Get('active')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getActive() {
    const stories: Story[] = await this.storiesService.getActive();
    return { status: true, stories };
  }

  @Get('closed')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getClosed() {
    const stories: Story[] = await this.storiesService.getClosed();
    return { status: true, stories };
  }

  @Get()
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getAll() {
    const stories: Story[] = await this.storiesService.getAll();
    return { status: true, stories };
  }

  @Delete('content/:id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async removeContent(@Param('id') id: number) {
    const result = await this.storiesService.removeContent(id);

    return { status: result };
  }

  @Delete()
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async delete() {
    await this.storiesService.delete();
    return { status: true };
  }

  @Delete(':id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteById(@Param('id') id: number) {
    const result = await this.storiesService.deleteById(id);
    return { status: result };
  }
}
