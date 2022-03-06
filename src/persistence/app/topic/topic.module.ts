import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from '@persistence/app/topic/topic.entity';
import { TopicRepoProvider } from './topic.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Topic], 'default')],
  providers: [TopicRepoProvider],
  exports: [TopicRepoProvider],
})
export class TopicRepositoryModule {}
