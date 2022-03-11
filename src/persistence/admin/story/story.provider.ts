import { ADMIN_CONNECTION, STORY_REPO } from '@config/constants';
import { Provider } from '@nestjs/common';
import { Connection, getConnectionManager } from 'typeorm';
import { StoryRepository } from './story.repository';

export const StoryRepoProvider: Provider = {
  provide: STORY_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(ADMIN_CONNECTION);
    if (hasCon) manager = connectionManager.get(ADMIN_CONNECTION);

    return manager.getCustomRepository(StoryRepository);
  },
  inject: [Connection],
};
