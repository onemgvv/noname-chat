import { StoryContent } from '@persistence/admin/story-content/story-content.entity';
import { CreateContentDto } from '@api/admin/story/dto/create-content.dto';
import { Repository } from 'typeorm';

export interface IStoryContentRepository extends Repository<StoryContent> {
  newContent(id: number, dto: CreateContentDto): Promise<StoryContent>;
  getPagesCount(storiesId: number): Promise<number>;
  removeContent(id: number): Promise<StoryContent>;
}
