import { CreateBotDto } from '@api/admin/bot/dto/create-bot.dto';
import { UpdateBotDto } from '@api/admin/bot/dto/update-bot.dto';
import { Bot } from '@persistence/admin/bot/bot.entity';
import { Repository } from 'typeorm';

export interface IBotRepository extends Repository<Bot> {
  newBot(data: CreateBotDto): Promise<Bot>;
  receive(): Promise<Bot[]>;
  findActive(): Promise<Bot[]>;
  getById(id: number): Promise<Bot>;
  editBot(id: number, data: UpdateBotDto): Promise<Bot>;
  deleteOne(id: number): Promise<Bot>;
  clearAll(): Promise<Bot[]>;
}
