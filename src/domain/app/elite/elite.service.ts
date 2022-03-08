import { Elite } from '@persistence/app/elite/elite.entity';
import { IEliteRepository } from './interface/elite-repo.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Elite as EliteType } from '@domain/app/elite/elite.type';
import { IEliteService } from './interface/elite-service.interface';
import { ELITE_REPO } from '@config/constants';

const EliteRepo = () => Inject(ELITE_REPO);

@Injectable()
export class EliteServiceImpl implements IEliteService {
  constructor(@EliteRepo() private eliteRepository: IEliteRepository) {}

  async create(data: Partial<EliteType>): Promise<Elite> {
    return this.eliteRepository.newElite(data);
  }

  async receiveActive(): Promise<Elite[]> {
    return this.eliteRepository.findActive();
  }

  async receive(): Promise<Elite[]> {
    return this.eliteRepository.receiveAll();
  }

  async getByUser(userId: number): Promise<Elite> {
    return this.eliteRepository.findByUserId(userId);
  }

  async deleteByUser(userId: number): Promise<Elite> {
    return this.eliteRepository.deleteByUserId(userId);
  }

  async deleteOne(id: number): Promise<Elite> {
    return this.eliteRepository.deleteOne(id);
  }

  async clear(): Promise<Elite[]> {
    return this.eliteRepository.deleteAll();
  }
}
