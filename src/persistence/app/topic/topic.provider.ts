import { TopicRepository } from './topic.repository';
import { Provider } from '@nestjs/common';

export const TopicRepoProvider: Provider = {
  provide: 'TopicRepo',
  useClass: TopicRepository,
};
