import {
  BOT_NOT_FOUND,
  ACTIVE_BOTS_NOT_FOUND,
  BM_NOT_FOUND,
  BOTS_NOT_FOUND,
} from '@common/config/constants';
import { IBotMessageRepository } from './interface/bm-repo.interface';
import { Bot } from '@persistence/admin/bot/bot.entity';
import { Helper } from '@utils/app.helper';
import { CreateBotDto } from '@api/admin/bot/dto/create-bot.dto';
import { BM_REPO, BOT_REPO, BOT_HAVENT_MESSAGES } from '@config/constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IBotRepository } from './interface/bot-repo.interface';
import { IBotService } from './interface/bot-service.interface';
import { CreateBotMessageDto } from '@api/admin/bot/dto/create-bm.dto';
import { BotMessage } from '@persistence/admin/bm/bm.entity';
import { UpdateBotDto } from '@api/admin/bot/dto/update-bot.dto';
import { UpdateBotMessageDto } from '@api/admin/bot/dto/update-bm.dto';

const BotRepo = () => Inject(BOT_REPO);
const BmRepo = () => Inject(BM_REPO);

@Injectable()
export class BotServiceImpl implements IBotService {
  constructor(
    @BotRepo() private botRepositiry: IBotRepository,
    @BmRepo() private bmRepository: IBotMessageRepository,
  ) {}

  async create(data: CreateBotDto): Promise<Bot> {
    const photo = Helper.getRandomBotAvatar();
    return this.botRepositiry.newBot({ ...data, photo });
  }

  async createBotMessages(dto: CreateBotMessageDto): Promise<BotMessage> {
    return this.bmRepository.newBM(dto);
  }

  async receiveBots(): Promise<Bot[]> {
    const bots = await this.botRepositiry.find({ relations: ['messages'] });
    if (bots.length === 0) throw new NotFoundException(BOT_NOT_FOUND);

    return bots;
  }

  async getActive(): Promise<Bot[]> {
    const bots = await this.botRepositiry.findActive();
    if (bots.length === 0) throw new NotFoundException(ACTIVE_BOTS_NOT_FOUND);

    return bots;
  }

  async getbyId(id: number): Promise<Bot> {
    const bot = await this.botRepositiry.findOne(id);
    if (!bot) throw new NotFoundException(BOT_NOT_FOUND);

    return bot;
  }

  async receiveMessages(botId: number): Promise<BotMessage[]> {
    const messages = await this.bmRepository.find({ where: { botId } });
    if (messages.length === 0) throw new NotFoundException(BOT_HAVENT_MESSAGES);

    return messages;
  }

  async updateBot(id: number, data: UpdateBotDto): Promise<Bot> {
    const bot = await this.botRepositiry.findOne(id);
    if (!bot) throw new NotFoundException(BOT_NOT_FOUND);

    return this.botRepositiry.editBot(id, data);
  }

  async updateBotMessage(
    id: number,
    data: UpdateBotMessageDto,
  ): Promise<BotMessage> {
    const bm = await this.bmRepository.findOne(id);
    if (!bm) throw new NotFoundException(BM_NOT_FOUND);

    return this.bmRepository.edit(id, data);
  }

  async deleteBot(id: number): Promise<Bot> {
    const bot = await this.botRepositiry.findOne(id);
    if (!bot) throw new NotFoundException(BOT_NOT_FOUND);

    return this.botRepositiry.remove(bot);
  }

  async deleteBotMessages(id: number): Promise<BotMessage[]> {
    const bm = await this.bmRepository.findByBot(id);
    if (bm.length === 0) throw new NotFoundException(BOTS_NOT_FOUND);

    return this.bmRepository.remove(bm);
  }

  async deleteMessages(id: number): Promise<BotMessage> {
    const bm = await this.bmRepository.findOne(id);
    if (!bm) throw new NotFoundException(BM_NOT_FOUND);

    return this.bmRepository.remove(bm);
  }

  async clearBots(): Promise<void> {
    return this.botRepositiry.clear();
  }
}
