import { Bot } from '@persistence/admin/bot/bot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BotRepoProvider } from './bot.provider';
import { ADMIN_CONNECTION } from '@config/constants';
import { BotRepository } from './bot.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Bot, BotRepository], ADMIN_CONNECTION)],
  providers: [BotRepoProvider],
  exports: [BotRepoProvider],
})
export class BotRepositoryModule {}
