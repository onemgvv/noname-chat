import { CreateBotMessageDto } from '@api/admin/bot/dto/create-bm.dto';
import { UpdateBotMessageDto } from '@api/admin/bot/dto/update-bm.dto';
import { BotMessage } from '@persistence/admin/bm/bm.entity';
import { Repository } from 'typeorm';

export interface IBotMessageRepository extends Repository<BotMessage> {
  newBM(dto: CreateBotMessageDto): Promise<BotMessage>;
  findByBot(botId: number): Promise<BotMessage[]>;
  edit(id: number, data: UpdateBotMessageDto): Promise<BotMessage>;
  deleteBotMessages(botId: number): Promise<BotMessage[]>;
  deleteOne(id: number): Promise<BotMessage>;
}
