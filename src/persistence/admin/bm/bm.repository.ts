import { BotMessage } from '@persistence/admin/bm/bm.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { IBotMessageRepository } from '@domain/admin/bot/interface/bm-repo.interface';
import { CreateBotMessageDto } from '@api/admin/bot/dto/create-bm.dto';
import { BM_NOT_FOUND, BOT_HAVENT_MESSAGES } from '@config/constants';
import { UpdateBotMessageDto } from '@api/admin/bot/dto/update-bm.dto';

@Injectable()
@EntityRepository(BotMessage)
export class BotMessageRepository
  extends Repository<BotMessage>
  implements IBotMessageRepository
{
  async newBM(dto: CreateBotMessageDto): Promise<BotMessage> {
    const bm = await this.create(dto);
    return this.save(bm);
  }

  async findByBot(botId: number): Promise<BotMessage[]> {
    const bms = await this.find({ where: { botId } });
    if (bms.length === 0) throw new NotFoundException(BOT_HAVENT_MESSAGES);

    return bms;
  }

  async edit(id: number, data: UpdateBotMessageDto): Promise<BotMessage> {
    const bm = await this.findOne(id);

    Object.keys(data).forEach((key) => {
      if (data[key]) bm[key] = data[key];
    });

    return this.save(bm);
  }

  async deleteBotMessages(botId: number): Promise<BotMessage[]> {
    const bms = await this.find({ where: { botId } });
    if (bms.length === 0) throw new NotFoundException(BOT_HAVENT_MESSAGES);

    return this.remove(bms);
  }

  async deleteOne(id: number): Promise<BotMessage> {
    let bm: BotMessage;
    try {
      bm = await this.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(BM_NOT_FOUND);
    }

    return this.remove(bm);
  }
}
