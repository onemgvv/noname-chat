import { CreateStoriesDto } from '@api/admin/story/dto/create-story.dto';
import { IStoryRepository } from '@domain/admin/story/interface/story-repo.interface';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Story } from './story.entity';

@Injectable()
@EntityRepository(Story)
export class StoryRepository
  extends Repository<Story>
  implements IStoryRepository
{
  async newStory(data: CreateStoriesDto): Promise<Story> {
    const story = await this.create(data);
    return this.save(story);
  }

  async changeStatus(id: number, status: boolean): Promise<Story> {
    const story = await this.findOne(id);
    story.active = status;
    return this.save(story);
  }

  getActive(): Promise<Story[]> {
    return this.find({ where: { active: true }, relations: ['content'] });
  }

  getById(id: number): Promise<Story> {
    return this.findOne(id, { relations: ['content'] });
  }

  getClosed(): Promise<Story[]> {
    return this.find({ where: { active: false }, relations: ['content'] });
  }

  getAll(): Promise<Story[]> {
    return this.find({ relations: ['content'] });
  }

  async deleteById(id: number): Promise<Story> {
    const story = await this.findOne(id);
    return this.remove(story);
  }
}
