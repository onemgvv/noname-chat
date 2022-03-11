import { StoryContent } from './story-content.entity';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { IStoryContentRepository } from '@domain/admin/story/interface/sc-repositpry.interface';
import { CreateContentDto } from '@api/admin/story/dto/create-content.dto';

@Injectable()
@EntityRepository(StoryContent)
export class StoryContentRepository
  extends Repository<StoryContent>
  implements IStoryContentRepository
{
  async newContent(id: number, dto: CreateContentDto): Promise<StoryContent> {
    const content = this.create({ storyId: id, ...dto });
    return this.save(content);
  }

  async getPagesCount(storiesId: number): Promise<number> {
    return this.count({ where: { storiesId } });
  }

  async removeContent(id: number): Promise<StoryContent> {
    const content = await this.findOne(id);
    return this.remove(content);
  }
}
