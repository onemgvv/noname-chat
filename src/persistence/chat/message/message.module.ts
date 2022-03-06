import { MessageRepoProvider } from './message.provider';
import { Message } from '@persistence/chat/message/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Message], 'chat')],
  providers: [MessageRepoProvider],
  exports: [MessageRepoProvider],
})
export class MessageRepositoryModule {}
