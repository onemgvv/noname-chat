import { Topic as TopicType } from '@domain/app/topic/topic.type';
import { Topic } from '@persistence/app/topic/topic.entity';

export interface ITopicRepository {
  newTopic(data: Partial<TopicType>): Promise<Topic>;
  receiveAll(relations?: string[]): Promise<Topic[]>;
  findById(id: number, relations?: string[]): Promise<Topic>;
  getByUserId(userId: number, relations?: string[]): Promise<Topic>;
  clearAll(): Promise<Topic[]>;
  deleteOne(field: keyof Topic, value: any): Promise<Topic>;
  deleteUsersTopic(userId: number): Promise<Topic>;
  deleteById(id: number): Promise<Topic>;
}
