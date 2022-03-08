import { TopicServiceImpl } from './topic.service';
import { Provider } from '@nestjs/common';
import { TOPIC_SERVICE } from '@config/constants';

export const TopicServiceProvider: Provider = {
  provide: TOPIC_SERVICE,
  useClass: TopicServiceImpl,
};
