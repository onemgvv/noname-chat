import { CreateStoriesDto } from '@api/admin/story/dto/create-story.dto';
import { Story } from '@persistence/admin/story/story.entity';
import { Repository } from 'typeorm';

export interface IStoryRepository extends Repository<Story> {
  newStory(data: CreateStoriesDto): Promise<Story>;
  changeStatus(id: number, status: boolean): Promise<Story>;
  getActive(): Promise<Story[]>;
  getById(id: number): Promise<Story>;
  getClosed(): Promise<Story[]>;
  getAll(): Promise<Story[]>;
  deleteById(id: number): Promise<Story>;
}
