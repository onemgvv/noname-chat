import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';
import { ICreateBlacklist } from '@persistence/app/blacklist/interface/create.interface';

export interface IBlacklistRepository {
  create(data: ICreateBlacklist): Promise<Blacklist>;
  findAllByOwner(ownerId: number, relations?: string[]): Promise<Blacklist[]>;
  delete(ownerId: number, userId: number): Promise<Blacklist>;
  deleteAll(ownerId: number): Promise<Blacklist[]>;
}
