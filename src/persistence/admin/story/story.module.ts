import { StoryRepository } from './story.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Story } from './story.entity';
import { ADMIN_CONNECTION } from '@config/constants';
import { StoryRepoProvider } from './story.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story, StoryRepository], ADMIN_CONNECTION),
  ],
  providers: [StoryRepoProvider],
  exports: [StoryRepoProvider],
})
export class StoryRepositoryModule {}
