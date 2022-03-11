import { Module } from '@nestjs/common';
import { BotMessagesRepositoryModule } from '@persistence/admin/bm/bm.module';
import { BotRepositoryModule } from '@persistence/admin/bot/bot.module';
import { BotServiceProvider } from './bot.provider';

@Module({
  imports: [BotRepositoryModule, BotMessagesRepositoryModule],
  providers: [BotServiceProvider],
  exports: [BotServiceProvider],
})
export class BotModule {}
