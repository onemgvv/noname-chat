import { Topic as TopicType } from '@domain/app/topic/topic.type';
import { Topic } from '@persistence/app/topic/topic.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ITopicRepository } from '@domain/app/topic/interface/topic-repo.interface';

@EntityRepository(Topic)
export class TopicRepository
  extends Repository<Topic>
  implements ITopicRepository
{
  private allRelations = ['users'];

  async newTopic(data: Partial<TopicType>): Promise<Topic> {
    const topic = await this.create(data);

    return this.save(topic);
  }

  async receiveAll(relations?: string[]): Promise<Topic[]> {
    return this.find({
      relations: relations ?? this.allRelations,
    });
  }

  async findById(id: number, relations?: string[]): Promise<Topic> {
    return this.findOneOrFail(id, {
      relations: relations ?? this.allRelations,
    });
  }

  async getByUserId(userId: number, relations?: string[]): Promise<Topic> {
    return this.findOneOrFail({
      where: { userId },
      relations: relations ?? this.allRelations,
    });
  }

  async clearAll(): Promise<Topic[]> {
    const topics = await this.find();
    return this.remove(topics);
  }

  async deleteOne(field: keyof Topic, value: any): Promise<Topic> {
    const topic = await this.findOneOrFail({
      where: { [field]: value },
    });

    return this.remove(topic);
  }

  async deleteUsersTopic(userId: number): Promise<Topic> {
    const topic = await this.findOneOrFail({ where: { userId } });

    return this.remove(topic);
  }

  async deleteById(id: number): Promise<Topic> {
    const topic = await this.findOneOrFail(id);

    return this.remove(topic);
  }
}
