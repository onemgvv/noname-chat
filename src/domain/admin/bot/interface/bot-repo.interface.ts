import { CreateBotDto } from '@api/admin/bot/dto/create.dto';
import { UpdateBotDto } from '@api/admin/bot/dto/update.dto';
import { Bot } from '@persistence/admin/bot/bot.entity';

export interface IBotRepository {
  newBot(data: CreateBotDto): Promise<Bot>;
  receive(): Promise<Bot[]>;
  findActive(): Promise<Bot[]>;
  getById(id: number): Promise<Bot>;
  editBot(id: number, data: UpdateBotDto): Promise<Bot>;
  deleteOne(id: number): Promise<Bot>;
  clearAll(): Promise<Bot[]>;
}
