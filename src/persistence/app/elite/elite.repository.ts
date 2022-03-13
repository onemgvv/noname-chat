import { NotFoundException, Injectable } from '@nestjs/common';
import { Elite as EliteType } from '@domain/app/elite/elite.type';
import { EntityRepository, Repository } from 'typeorm';
import { Elite } from '@persistence/app/elite/elite.entity';
import { IEliteRepository } from '@domain/app/elite/interface/elite-repo.interface';
import {
  ACTIVE_ELITES_NOT_FOUND,
  ELITES_NOT_FOUND,
  ELITE_NOT_FOUND,
} from '@config/constants';

@Injectable()
@EntityRepository(Elite)
export class EliteRepository
  extends Repository<Elite>
  implements IEliteRepository
{
  private allRelations = ['user'];

  async newElite(data: Partial<EliteType>): Promise<Elite> {
    const elite = await this.create(data);
    return this.save(elite);
  }

  async findActive(relations?: string[]): Promise<Elite[]> {
    const elites = await this.find({
      relations: relations ?? this.allRelations,
    });
    if (elites.length === 0)
      throw new NotFoundException(ACTIVE_ELITES_NOT_FOUND);

    const today = new Date();
    return elites.filter(
      async (elite) =>
        (await elite.expiresIn.getMilliseconds()) > today.getMilliseconds(),
    );
  }

  async receiveAll(relations?: string[]): Promise<Elite[]> {
    const elites = await this.find({
      relations: relations ?? this.allRelations,
    });
    if (elites.length === 0) throw new NotFoundException(ELITES_NOT_FOUND);

    return elites;
  }

  async findByUserId(userId: number, relations?: string[]): Promise<Elite> {
    let elite: Elite;
    try {
      elite = await this.findOneOrFail({
        where: { userId },
        relations: relations ?? this.allRelations,
      });
    } catch (error) {
      throw new NotFoundException(ELITE_NOT_FOUND);
    }

    return elite;
  }

  async deleteByUserId(userId: number): Promise<Elite> {
    let elite: Elite;
    try {
      elite = await this.findOneOrFail({ where: { userId } });
    } catch (error) {
      throw new NotFoundException(ELITE_NOT_FOUND);
    }

    return this.remove(elite);
  }

  async deleteOne(id: number): Promise<Elite> {
    let elite: Elite;
    try {
      elite = await this.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(ELITE_NOT_FOUND);
    }

    return this.remove(elite);
  }

  async deleteAll(): Promise<Elite[]> {
    const elites = await this.find();
    if (elites.length === 0) throw new NotFoundException(ELITES_NOT_FOUND);

    return this.remove(elites);
  }
}
