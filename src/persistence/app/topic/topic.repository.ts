import { TOPIC_NOT_FOUND, TOPICS_NOT_FOUND } from '@common/config/constants';
import { Topic as TopicType } from '@domain/app/topic/topic.type';
import { Topic } from '@persistence/app/topic/topic.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ITopicRepository } from '@domain/app/topic/interface/topic-repo.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
@EntityRepository(Topic)
export class TopicRepository
  extends Repository<Topic>
  implements ITopicRepository
{
  private allRelations = ['user'];

  newTopic = async (data: Partial<TopicType>): Promise<Topic> => {
    const topic = await this.create(data);

    return this.save(topic);
  };

  receiveAll = (relations?: string[]): Promise<Topic[]> => {
    return this.find({
      relations: relations ?? this.allRelations,
    });
  };

  findById = async (id: number, relations?: string[]): Promise<Topic> => {
    let topic: Topic;
    try {
      topic = await this.findOneOrFail(id, {
        relations: relations ?? this.allRelations,
      });
    } catch (error) {
      throw new NotFoundException(TOPIC_NOT_FOUND);
    }

    return topic;
  };

  getByUserId = async (
    userId: number,
    relations?: string[],
  ): Promise<Topic> => {
    let topic: Topic;
    try {
      topic = await this.findOneOrFail({
        where: { userId },
        relations: relations ?? this.allRelations,
      });
    } catch (error) {
      throw new NotFoundException(TOPIC_NOT_FOUND);
    }

    return topic;
  };

  clearAll = async (): Promise<Topic[]> => {
    const topics = await this.find();
    if (topics.length === 0) throw new NotFoundException(TOPICS_NOT_FOUND);
    return this.remove(topics);
  };

  deleteOne = async (field: keyof Topic, value: any): Promise<Topic> => {
    let topic: Topic;
    try {
      topic = await this.findOneOrFail({
        where: { [field]: value },
      });
    } catch (error) {
      throw new NotFoundException(TOPIC_NOT_FOUND);
    }

    return this.remove(topic);
  };

  deleteUsersTopic = async (userId: number): Promise<Topic> => {
    let topic: Topic;
    try {
      topic = await this.findOneOrFail({ where: { userId } });
    } catch (error) {
      throw new NotFoundException(TOPIC_NOT_FOUND);
    }
    return this.remove(topic);
  };

  deleteById = async (id: number): Promise<Topic> => {
    let topic: Topic;
    try {
      topic = await this.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(TOPIC_NOT_FOUND);
    }
    return this.remove(topic);
  };
}
