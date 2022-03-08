import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CHAT_CONNECTION } from '@config/constants';
import { MessageRepoProvider } from './message.provider';
import { Message } from '@persistence/chat/message/message.entity';
import { MessageRepository } from './message.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, MessageRepository], CHAT_CONNECTION),
  ],
  providers: [MessageRepoProvider],
  exports: [MessageRepoProvider, TypeOrmModule],
})
export class MessageRepositoryModule {}
