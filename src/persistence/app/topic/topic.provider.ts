import { TopicRepository } from './topic.repository';
import { Provider } from '@nestjs/common';
import { TOPIC_REPO } from '@config/constants';

export const TopicRepoProvider: Provider = {
  provide: TOPIC_REPO,
  useClass: TopicRepository,
};
