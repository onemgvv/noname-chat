import { STORY_SERVICE } from '@common/config/constants';
import { Provider } from '@nestjs/common';
import { StoryServiceImpl } from './story.service';

export const StoryServiceProvider: Provider = {
  provide: STORY_SERVICE,
  useClass: StoryServiceImpl,
};
