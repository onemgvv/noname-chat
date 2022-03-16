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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

const StoryService = () => Inject(STORY_SERVICE);

@ApiTags('Admin stories')
@Controller('admin/stories')
export class StoryController {
  constructor(@StoryService() private storiesService: IStoryService) {}

  @ApiOperation({ summary: 'Create new Story' })
  @ApiResponse({ status: 201, description: 'Story created successfully' })
  @ApiBody({ type: CreateStoriesDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async createStories(dto: CreateStoriesDto) {
    const storie: Story = await this.storiesService.create(dto);
    return { status: true, storie };
  }

  @ApiOperation({ summary: 'Add content to story' })
  @ApiResponse({ status: 201, description: 'Content created' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  @ApiParam({ name: 'id', description: 'Story id', type: Number })
  @ApiBody({ type: CreateContentDto })
  @Post(':id/content')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async addContent(@Param('id') id: number, @Body() dto: CreateContentDto) {
    await this.storiesService.addContent(id, dto);
    const storie: Story = await this.storiesService.getById(id);
    return { status: true, storie };
  }

  @ApiOperation({ summary: 'Publicate story' })
  @ApiResponse({ status: 201, description: 'Story published' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  @ApiParam({ name: 'id', description: 'Story id', type: Number })
  @Patch(':id/publish')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async publicshStorie(@Param('id') id: number) {
    const result: boolean = await this.storiesService.publishStorie(id);
    return { status: result };
  }

  @ApiOperation({ summary: 'Get story by id' })
  @ApiResponse({ status: 201, description: 'Story founded' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  @ApiParam({ name: 'id', description: 'Story id', type: Number })
  @Get(':id/pages')
  async getStoriePages(@Param('id') id: number) {
    const result: number = await this.storiesService.getStoriePages(id);
    return { status: true, pages: result };
  }

  @ApiOperation({ summary: 'Get active stories' })
  @ApiResponse({ status: 201, description: 'Stories founded' })
  @ApiResponse({ status: 404, description: 'Stories not found' })
  @Get('active')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getActive() {
    const stories: Story[] = await this.storiesService.getActive();
    return { status: true, stories };
  }

  @ApiOperation({ summary: 'Get closed stories' })
  @ApiResponse({ status: 201, description: 'Stories founded' })
  @ApiResponse({ status: 404, description: 'Stories not found' })
  @Get('closed')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getClosed() {
    const stories: Story[] = await this.storiesService.getClosed();
    return { status: true, stories };
  }

  @ApiOperation({ summary: 'Get all stories' })
  @ApiResponse({ status: 201, description: 'Stories founded' })
  @ApiResponse({ status: 404, description: 'Stories not found' })
  @Get()
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getAll() {
    const stories: Story[] = await this.storiesService.getAll();
    return { status: true, stories };
  }

  @ApiOperation({ summary: 'Remove story content' })
  @ApiResponse({ status: 201, description: 'Story contend removed' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  @ApiParam({ name: 'id', description: 'content id', type: Number })
  @Delete('content/:id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async removeContent(@Param('id') id: number) {
    const result = await this.storiesService.removeContent(id);

    return { status: result };
  }

  @ApiOperation({ summary: 'Remove all stories' })
  @ApiResponse({ status: 201, description: 'Stories removed' })
  @ApiResponse({ status: 404, description: 'Stories not found' })
  @Delete()
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async delete() {
    await this.storiesService.delete();
    return { status: true };
  }

  @ApiOperation({ summary: 'Remove story by id' })
  @ApiResponse({ status: 201, description: 'Story removed' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  @Delete(':id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteById(@Param('id') id: number) {
    const result = await this.storiesService.deleteById(id);
    return { status: result };
  }
}
