import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Topic } from '@persistence/app/topic/topic.entity';
import { ITopicRepository } from './interface/topic-repo.interface';
import { ITopicService } from './interface/topic-service.interface';
import { Topic as TopicType } from './topic.type';
import { TOPICS_NOT_FOUND, TOPIC_REPO } from '@config/constants';

const TopicRepo = () => Inject(TOPIC_REPO);

@Injectable()
export class TopicServiceImpl implements ITopicService {
  constructor(@TopicRepo() private topicRepository: ITopicRepository) {}

  async create(data: Partial<TopicType>): Promise<Topic> {
    return this.topicRepository.newTopic(data);
  }

  async find(relations?: string[]): Promise<Topic[]> {
    const topics = await this.topicRepository.receiveAll(relations);
    if (topics.length === 0) throw new NotFoundException(TOPICS_NOT_FOUND);

    return topics;
  }

  async findById(id: number, relations?: string[]): Promise<Topic> {
    return this.topicRepository.findById(id, relations);
  }

  async findByUserId(userId: number, relations?: string[]): Promise<Topic> {
    return this.topicRepository.getByUserId(userId, relations);
  }

  async deleteOne(field: keyof Topic, value: any): Promise<Topic> {
    return this.topicRepository.deleteOne(field, value);
  }

  async deleteByUser(userId: number): Promise<Topic> {
    return this.topicRepository.deleteUsersTopic(userId);
  }

  async deleteById(id: number): Promise<Topic> {
    return this.topicRepository.deleteById(id);
  }

  async clear(): Promise<Topic[]> {
    return this.topicRepository.clearAll();
  }
}
