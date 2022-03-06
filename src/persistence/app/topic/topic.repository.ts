import { ICreateTopic } from './interface/create.interface';
import { Topic } from '@persistence/app/topic/topic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TopicRepository {
  private allRelations = ['users'];

  constructor(@InjectRepository(Topic) private topicModel: Repository<Topic>) {}

  async create(data: ICreateTopic): Promise<Topic> {
    const topic = await this.topicModel.create(data);

    return this.topicModel.save(topic);
  }

  async receiveAll(relations?: string[]): Promise<Topic[]> {
    return this.topicModel.find({
      relations: relations ?? this.allRelations,
    });
  }

  async findById(id: number, relations?: string[]): Promise<Topic> {
    return this.topicModel.findOneOrFail(id, {
      relations: relations ?? this.allRelations,
    });
  }

  async getByUserId(userId: number, relations?: string[]): Promise<Topic> {
    return this.topicModel.findOneOrFail({
      where: { userId },
      relations: relations ?? this.allRelations,
    });
  }

  async clear(): Promise<Topic[]> {
    const topics = await this.topicModel.find();
    return this.topicModel.remove(topics);
  }

  async delete(field: keyof Topic, value: any): Promise<Topic> {
    const topic = await this.topicModel.findOneOrFail({
      where: { [field]: value },
    });

    return this.topicModel.remove(topic);
  }

  async deleteUsersTopic(userId: number): Promise<Topic> {
    const topic = await this.topicModel.findOneOrFail({ where: { userId } });

    return this.topicModel.remove(topic);
  }

  async deleteById(id: number) {
    const topic = await this.topicModel.findOneOrFail(id);

    return this.topicModel.remove(topic);
  }
}
