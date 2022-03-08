import { Topic } from '@persistence/app/topic/topic.entity';
import { Topic as TopicType } from '@domain/app/topic/topic.type';

export interface ITopicService {
  create(data: Partial<TopicType>): Promise<Topic>;
  find(relations?: string[]): Promise<Topic[]>;
  findById(id: number, relations?: string[]): Promise<Topic>;
  findByUserId(userId: number, relations?: string[]): Promise<Topic>;
  deleteOne(field: keyof Topic, value: any): Promise<Topic>;
  deleteByUser(userId: number): Promise<Topic>;
  deleteById(id: number): Promise<Topic>;
  clear(): Promise<Topic[]>;
}
