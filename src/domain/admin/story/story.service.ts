import { StoryContent } from '@persistence/admin/story-content/story-content.entity';
import { CreateContentDto } from '@api/admin/story/dto/create-content.dto';
import { CreateStoriesDto } from '@api/admin/story/dto/create-story.dto';
import {
  ACTIVE_STORY_HAVENT,
  STORY_ALREADY_PUBLISH,
  STORY_NOT_FOUND,
  STORY_CONTENT_REPO,
  STORY_REPO,
  CONTENT_NOT_FOUND,
  ARCHIVE_STORY_HAVENT,
  STORIES_NOT_FOUND,
} from '@config/constants';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Story } from '@persistence/admin/story/story.entity';
import { IStoryContentRepository } from './interface/sc-repositpry.interface';
import { IStoryRepository } from './interface/story-repo.interface';
import { IStoryService } from './interface/story-service.interface';

const StoryRepo = () => Inject(STORY_REPO);
const ContentRepo = () => Inject(STORY_CONTENT_REPO);

@Injectable()
export class StoryServiceImpl implements IStoryService {
  constructor(
    @StoryRepo() private storyRepository: IStoryRepository,
    @ContentRepo() private contentRepository: IStoryContentRepository,
  ) {}

  async create(storiesDto: CreateStoriesDto): Promise<Story> {
    return this.storyRepository.newStory(storiesDto);
  }

  async addContent(id: number, dto: CreateContentDto): Promise<StoryContent> {
    return this.contentRepository.newContent(id, dto);
  }

  async publishStorie(id: number): Promise<boolean> {
    const storie = await this.storyRepository.findOne(id);
    if (!storie) throw new NotFoundException(STORY_NOT_FOUND);
    if (storie.active === true)
      throw new BadRequestException(STORY_ALREADY_PUBLISH);

    storie.active = true;
    await storie.save();
    return true;
  }

  async getStoriePages(storiesId: number): Promise<number> {
    return this.contentRepository.count({ where: { storiesId } });
  }

  async getActive(): Promise<Story[]> {
    const active = await this.storyRepository.find({
      where: { active: true },
      relations: ['content'],
    });
    if (!active) throw new NotFoundException(ACTIVE_STORY_HAVENT);

    return active;
  }

  async getById(id: number) {
    const storie = await this.storyRepository.findOne(id, {
      relations: ['content'],
    });
    if (!storie) throw new NotFoundException(STORY_NOT_FOUND);

    return storie;
  }

  async getClosed(): Promise<Story[]> {
    const closed = await this.storyRepository.find({
      where: { active: false },
      relations: ['content'],
    });
    if (!closed) throw new NotFoundException(ARCHIVE_STORY_HAVENT);

    return closed;
  }

  async getAll(): Promise<Story[]> {
    const stories = await this.storyRepository.find({
      relations: ['content'],
    });
    if (!stories) throw new NotFoundException(STORIES_NOT_FOUND);

    return stories;
  }

  async removeContent(id: number): Promise<StoryContent> {
    const content = await this.contentRepository.findOne(id);
    if (!content) throw new BadRequestException(CONTENT_NOT_FOUND);

    return content.remove();
  }

  async delete(): Promise<void> {
    return this.storyRepository.clear();
  }

  async deleteById(id: number): Promise<Story> {
    const story = await this.storyRepository.findOne(id);
    if (!story) throw new BadRequestException(STORY_NOT_FOUND);

    return story.remove();
  }
}
