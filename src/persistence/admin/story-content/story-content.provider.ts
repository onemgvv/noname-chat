import { ADMIN_CONNECTION, STORY_CONTENT_REPO } from '@config/constants';
import { Provider } from '@nestjs/common';
import { Connection, getConnectionManager } from 'typeorm';
import { StoryContentRepository } from './story-content.repository';

export const StoryContentRepoProvider: Provider = {
  provide: STORY_CONTENT_REPO,
  useFactory: () => {
    let manager: Connection;
    const connectionManager = getConnectionManager();
    const hasCon = connectionManager.has(ADMIN_CONNECTION);
    if (hasCon) manager = connectionManager.get(ADMIN_CONNECTION);

    return manager.getCustomRepository(StoryContentRepository);
  },
  inject: [Connection],
};
