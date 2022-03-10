import { DEFAULT_CONNECTION } from '@common/config/constants';
import { TopicRepository } from '@persistence/app/topic/topic.repository';
import { Provider } from '@nestjs/common';
import { TOPIC_REPO } from '@config/constants';
import { Connection, getConnectionManager } from 'typeorm';

export const TopicRepoProvider: Provider = {
  provide: TOPIC_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(DEFAULT_CONNECTION);
    if (hasCon) manager = connectionManager.get(DEFAULT_CONNECTION);

    return manager.getCustomRepository(TopicRepository);
  },
  inject: [Connection],
};
