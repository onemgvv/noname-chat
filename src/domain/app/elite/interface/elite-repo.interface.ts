import { Elite as EliteType } from '@domain/app/elite/elite.type';
import { Elite } from '@persistence/app/elite/elite.entity';

export interface IEliteRepository {
  newElite(data: Partial<EliteType>): Promise<Elite>;
  findActive(relations?: string[]): Promise<Elite[]>;
  receiveAll(relations?: string[]): Promise<Elite[]>;
  findByUserId(userId: number, relations?: string[]): Promise<Elite>;
  deleteByUserId(userId: number): Promise<Elite>;
  deleteOne(id: number): Promise<Elite>;
  deleteAll(): Promise<Elite[]>;
}
