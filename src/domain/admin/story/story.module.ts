import { Module } from '@nestjs/common';
import { StoryContentRepositoryModule } from '@persistence/admin/story-content/story-content.module';
import { StoryRepositoryModule } from '@persistence/admin/story/story.module';
import { StoryServiceProvider } from './story.provider';

@Module({
  imports: [StoryRepositoryModule, StoryContentRepositoryModule],
  providers: [StoryServiceProvider],
  exports: [StoryServiceProvider],
})
export class StoryModule {}
