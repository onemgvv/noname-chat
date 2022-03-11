import { CreateContentDto } from '@api/admin/story/dto/create-content.dto';
import { CreateStoriesDto } from '@api/admin/story/dto/create-story.dto';
import { StoryContent } from '@persistence/admin/story-content/story-content.entity';
import { Story } from '@persistence/admin/story/story.entity';

export interface IStoryService {
  create(storiesDto: CreateStoriesDto): Promise<Story>;
  addContent(id: number, dto: CreateContentDto): Promise<StoryContent>;
  publishStorie(id: number): Promise<boolean>;
  getStoriePages(storiesId: number): Promise<number>;
  getActive(): Promise<Story[]>;
  getById(id: number);
  getClosed(): Promise<Story[]>;
  getAll(): Promise<Story[]>;
  removeContent(id: number): Promise<StoryContent>;
  delete(): Promise<void>;
  deleteById(id: number): Promise<Story>;
}
