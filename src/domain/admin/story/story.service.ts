import { StoryContent } from '@persistence/admin/story-content/story-content.entity';
import { CreateContentDto } from '@api/admin/story/dto/create-content.dto';
import { CreateStoriesDto } from '@api/admin/story/dto/create-story.dto';
import { STORY_SERVICE, STORY_CONTENT_REPO } from '@config/constants';
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

const StoryService = () => Inject(STORY_SERVICE);
const ContentService = () => Inject(STORY_CONTENT_REPO);

@Injectable()
export class StoryServiceImpl implements IStoryService {
  constructor(
    @StoryService() private storyRepository: IStoryRepository,
    @ContentService() private contentRepository: IStoryContentRepository,
  ) {}

  async create(storiesDto: CreateStoriesDto): Promise<Story> {
    return this.storyRepository.newStory(storiesDto);
  }

  async addContent(id: number, dto: CreateContentDto): Promise<StoryContent> {
    return this.contentRepository.newContent(id, dto);
  }

  async publishStorie(id: number): Promise<boolean> {
    const storie = await this.storyRepository.findOne(id);
    if (!storie) throw new NotFoundException('Stories с данным id не найдена');
    if (storie.active === true)
      throw new BadRequestException('Stories уже опубликована');

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
    if (!active) throw new NotFoundException('Активных stories пока нет');

    return active;
  }

  async getById(id: number) {
    const storie = await this.storyRepository.findOne(id, {
      relations: ['content'],
    });
    if (!storie) throw new NotFoundException('Stories с данным id нет');

    return storie;
  }

  async getClosed(): Promise<Story[]> {
    const closed = await this.storyRepository.find({
      where: { active: false },
      relations: ['content'],
    });
    if (!closed) throw new NotFoundException('Архивных stories пока нет');

    return closed;
  }

  async getAll(): Promise<Story[]> {
    const stories = await this.storyRepository.find({
      relations: ['content'],
    });
    if (!stories) throw new NotFoundException('Stories пока нет');

    return stories;
  }

  async removeContent(id: number): Promise<StoryContent> {
    const content = await this.contentRepository.findOne(id);
    if (!content)
      throw new BadRequestException(
        'Stories Content с данным id не существует',
      );

    return content.remove();
  }

  async delete(): Promise<void> {
    return this.storyRepository.clear();
  }

  async deleteById(id: number): Promise<Story> {
    const story = await this.storyRepository.findOne(id);
    if (!story)
      throw new BadRequestException('Stories с данным id не существует');

    return story.remove();
  }
}
