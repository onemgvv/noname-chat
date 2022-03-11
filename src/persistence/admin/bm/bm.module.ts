import { BotMessage } from './bm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ADMIN_CONNECTION } from '@config/constants';
import { BotMessageRepoProvider } from './bm.provider';
import { BotMessageRepository } from './bm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [BotMessage, BotMessageRepository],
      ADMIN_CONNECTION,
    ),
  ],
  providers: [BotMessageRepoProvider],
  exports: [BotMessageRepoProvider],
})
export class BotMessagesRepositoryModule {}
