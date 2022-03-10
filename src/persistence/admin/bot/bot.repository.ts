import { UpdateBotDto } from '@api/admin/bot/dto/update.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Bot } from './bot.entity';
import { Helper } from '@utils/app.helper';
import { CreateBotDto } from '@api/admin/bot/dto/create.dto';
import { IBotRepository } from '@domain/admin/bot/interface/bot-repo.interface';

@Injectable()
@EntityRepository(Bot)
export class BotRepository extends Repository<Bot> implements IBotRepository {
  private relations: string[] = ['bot_messages'];

  newBot = async (data: CreateBotDto): Promise<Bot> => {
    const photo = Helper.getRandomBotAvatar();
    const bot = await this.create({
      ...data,
      photo,
      active: data.active ?? false,
    });
    return this.save(bot);
  };

  receive = (): Promise<Bot[]> => {
    return this.find({ relations: this.relations });
  };

  findActive = (): Promise<Bot[]> => {
    return this.find({ where: { active: true }, relations: this.relations });
  };

  getById = (id: number): Promise<Bot> => {
    return this.findOne(id, { relations: this.relations });
  };

  editBot = async (id: number, data: UpdateBotDto): Promise<Bot> => {
    const bot = await this.findOne(id);

    Object.keys(data).forEach((key) => {
      if (data[key]) bot[key] = data[key];
    });

    return bot.save();
  };

  deleteOne = async (id: number): Promise<Bot> => {
    const bot = await this.findOne(id);
    return this.remove(bot);
  };

  clearAll = async (): Promise<Bot[]> => {
    const bots = await this.find();
    return this.remove(bots);
  };
}
