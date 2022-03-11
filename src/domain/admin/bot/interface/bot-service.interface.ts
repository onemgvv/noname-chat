import { CreateBotMessageDto } from '@api/admin/bot/dto/create-bm.dto';
import { CreateBotDto } from '@api/admin/bot/dto/create-bot.dto';
import { UpdateBotMessageDto } from '@api/admin/bot/dto/update-bm.dto';
import { UpdateBotDto } from '@api/admin/bot/dto/update-bot.dto';
import { BotMessage } from '@persistence/admin/bm/bm.entity';
import { Bot } from '@persistence/admin/bot/bot.entity';

export interface IBotService {
  create(data: CreateBotDto): Promise<Bot>;
  createBotMessages(dto: CreateBotMessageDto): Promise<BotMessage>;
  receiveBots(): Promise<Bot[]>;
  getActive(): Promise<Bot[]>;
  getbyId(id: number): Promise<Bot>;
  receiveMessages(botId: number): Promise<BotMessage[]>;
  updateBot(id: number, data: UpdateBotDto): Promise<Bot>;
  updateBotMessage(id: number, data: UpdateBotMessageDto): Promise<BotMessage>;
  deleteBot(id: number): Promise<Bot>;
  deleteBotMessages(id: number): Promise<BotMessage[]>;
  deleteMessages(id: number): Promise<BotMessage>;
  clearBots(): Promise<void>;
}
