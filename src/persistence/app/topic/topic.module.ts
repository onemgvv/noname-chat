import { TopicRepository } from './topic.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from '@persistence/app/topic/topic.entity';
import { TopicRepoProvider } from './topic.provider';
import { Module } from '@nestjs/common';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic, User, TopicRepository], 'default'),
  ],
  providers: [TopicRepoProvider],
  exports: [TopicRepoProvider, TypeOrmModule],
})
export class TopicRepositoryModule {}
