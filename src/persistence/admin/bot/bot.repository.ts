import { UpdateBotDto } from '@api/admin/bot/dto/update-bot.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Bot } from './bot.entity';
import { CreateBotDto } from '@api/admin/bot/dto/create-bot.dto';
import { IBotRepository } from '@domain/admin/bot/interface/bot-repo.interface';
import {
  BOTS_NOT_FOUND,
  ACTIVE_BOTS_NOT_FOUND,
  BOT_NOT_FOUND,
} from '@config/constants';

@Injectable()
@EntityRepository(Bot)
export class BotRepository extends Repository<Bot> implements IBotRepository {
  private relations: string[] = ['messages'];

  newBot = async (data: CreateBotDto): Promise<Bot> => {
    const bot = await this.create({
      ...data,
      active: data.active ?? false,
    });
    return this.save(bot);
  };

  receive = async (): Promise<Bot[]> => {
    const bots = await this.find({ relations: this.relations });
    if (bots.length === 0) throw new NotFoundException(BOTS_NOT_FOUND);

    return bots;
  };

  findActive = async (): Promise<Bot[]> => {
    const bots = await this.find({
      where: { active: true },
      relations: this.relations,
    });
    if (bots.length === 0) throw new NotFoundException(ACTIVE_BOTS_NOT_FOUND);

    return bots;
  };

  getById = async (id: number): Promise<Bot> => {
    let bot: Bot;
    try {
      bot = await this.findOneOrFail(id, { relations: this.relations });
    } catch (error) {
      throw new NotFoundException(BOT_NOT_FOUND);
    }

    return bot;
  };

  editBot = async (id: number, data: UpdateBotDto): Promise<Bot> => {
    let bot: Bot;
    try {
      bot = await this.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(BOT_NOT_FOUND);
    }

    Object.keys(data).forEach((key) => {
      if (data[key]) bot[key] = data[key];
    });

    return bot.save();
  };

  deleteOne = async (id: number): Promise<Bot> => {
    let bot: Bot;
    try {
      bot = await this.findOneOrFail(id, { relations: this.relations });
    } catch (error) {
      throw new NotFoundException(BOT_NOT_FOUND);
    }
    return this.remove(bot);
  };

  clearAll = async (): Promise<Bot[]> => {
    const bots = await this.find();
    if (bots.length === 0) throw new NotFoundException(BOTS_NOT_FOUND);
    return this.remove(bots);
  };
}
