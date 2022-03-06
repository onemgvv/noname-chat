import { Repository } from 'typeorm';
import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateBlacklist } from './interface/create.interface';

@Injectable()
export class BlacklistRepository {
  private allRelations = ['users'];

  constructor(
    @InjectRepository(Blacklist) private blacklistModel: Repository<Blacklist>,
  ) {}

  async create(data: ICreateBlacklist): Promise<Blacklist> {
    const blacklist = await this.blacklistModel.create(data);
    return this.blacklistModel.save(blacklist);
  }

  async findAllByOwner(
    ownerId: number,
    relations?: string[],
  ): Promise<Blacklist[]> {
    return this.blacklistModel.find({
      where: { ownerId },
      relations: relations ?? this.allRelations,
    });
  }

  async delete(ownerId: number, userId: number): Promise<Blacklist> {
    const blacklist = await this.blacklistModel.findOneOrFail({
      where: { ownerId, userId },
    });
    return this.blacklistModel.remove(blacklist);
  }

  async deleteAll(ownerId: number): Promise<Blacklist[]> {
    const blacklist = await this.blacklistModel.find({ where: { ownerId } });
    return this.blacklistModel.remove(blacklist);
  }
}
