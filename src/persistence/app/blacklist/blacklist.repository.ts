import { IBlacklistRepository } from '@domain/app/user/interface/blacklist-repo.interface';
import { EntityRepository, Repository } from 'typeorm';
import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';
import { ICreateBlacklist } from './interface/create.interface';

@EntityRepository(Blacklist)
export class BlacklistRepository
  extends Repository<Blacklist>
  implements IBlacklistRepository
{
  private allRelations = ['users'];

  async newBlacklist(data: ICreateBlacklist): Promise<Blacklist> {
    const blacklist = await this.create(data);
    return this.save(blacklist);
  }

  async findAllByOwner(
    ownerId: number,
    relations?: string[],
  ): Promise<Blacklist[]> {
    return this.find({
      where: { ownerId },
      relations: relations ?? this.allRelations,
    });
  }

  async deleteOne(ownerId: number, userId: number): Promise<Blacklist> {
    const blacklist = await this.findOneOrFail({
      where: { ownerId, userId },
    });
    return this.remove(blacklist);
  }

  async deleteAll(ownerId: number): Promise<Blacklist[]> {
    const blacklist = await this.find({ where: { ownerId } });
    return this.remove(blacklist);
  }
}
