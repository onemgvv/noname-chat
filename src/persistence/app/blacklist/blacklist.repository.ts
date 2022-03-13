import { Injectable, NotFoundException } from '@nestjs/common';
import { IBlacklistRepository } from '@domain/app/user/interface/blacklist-repo.interface';
import { EntityRepository, Repository } from 'typeorm';
import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';
import { ICreateBlacklist } from './interface/create.interface';
import { EMPTY_BLACKLIST, USER_IS_NOT_BLOCKED } from '@config/constants';

@Injectable()
@EntityRepository(Blacklist)
export class BlacklistRepository
  extends Repository<Blacklist>
  implements IBlacklistRepository
{
  private allRelations = ['user'];

  async newBlacklist(data: ICreateBlacklist): Promise<Blacklist> {
    const blacklist = await this.create(data);
    return this.save(blacklist);
  }

  async findAllByOwner(
    ownerId: number,
    relations?: string[],
  ): Promise<Blacklist[]> {
    let blacklist: Blacklist[];
    try {
      blacklist = await this.find({
        where: { ownerId },
        relations: relations ?? this.allRelations,
      });
    } catch (error) {
      throw new NotFoundException(EMPTY_BLACKLIST);
    }

    return blacklist;
  }

  async deleteOne(ownerId: number, userId: number): Promise<Blacklist> {
    let blacklist: Blacklist;
    try {
      blacklist = await this.findOneOrFail({
        where: { ownerId, userId },
      });
    } catch (error) {
      throw new NotFoundException(USER_IS_NOT_BLOCKED);
    }

    return this.remove(blacklist);
  }

  async deleteAll(ownerId: number): Promise<Blacklist[]> {
    const blacklist = await this.find({ where: { ownerId } });
    if (blacklist.length === 0) throw new NotFoundException(EMPTY_BLACKLIST);

    return this.remove(blacklist);
  }
}
