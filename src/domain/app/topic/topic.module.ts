import { Module } from '@nestjs/common';
import { TopicRepositoryModule } from '@persistence/app/topic/topic.module';
import { TopicServiceProvider } from './topic.provider';

@Module({
  imports: [TopicRepositoryModule],
  providers: [TopicServiceProvider],
  exports: [TopicServiceProvider],
})
export class TopicModule {}
