import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';
import { ICreateBlacklist } from '@persistence/app/blacklist/interface/create.interface';
import { Repository } from 'typeorm';

export interface IBlacklistRepository extends Repository<Blacklist> {
  newBlacklist(data: ICreateBlacklist): Promise<Blacklist>;
  findAllByOwner(ownerId: number, relations?: string[]): Promise<Blacklist[]>;
  deleteOne(ownerId: number, userId: number): Promise<Blacklist>;
  deleteAll(ownerId: number): Promise<Blacklist[]>;
}
