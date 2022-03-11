import { StoryContentRepository } from './story-content.repository';
import { StoryContent } from './story-content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ADMIN_CONNECTION } from '@config/constants';
import { StoryContentRepoProvider } from './story-content.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [StoryContent, StoryContentRepository],
      ADMIN_CONNECTION,
    ),
  ],
  providers: [StoryContentRepoProvider],
  exports: [StoryContentRepoProvider],
})
export class StoryContentRepositoryModule {}
