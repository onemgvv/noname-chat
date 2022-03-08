import { Elite } from '@persistence/app/elite/elite.entity';
import { Elite as EliteType } from '@domain/app/elite/elite.type';

export interface IEliteService {
  create(data: Partial<EliteType>): Promise<Elite>;
  receiveActive(): Promise<Elite[]>;
  receive(): Promise<Elite[]>;
  getByUser(userId: number): Promise<Elite>;
  deleteByUser(userId: number): Promise<Elite>;
  deleteOne(id: number): Promise<Elite>;
  clear(): Promise<Elite[]>;
}
