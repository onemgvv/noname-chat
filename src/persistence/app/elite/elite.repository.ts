import { ICreateElite } from './interface/create.dto';
import { Repository } from 'typeorm';
import { Elite } from '@persistence/app/elite/elite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EliteRepository {
  private allRelations = ['users'];

  constructor(@InjectRepository(Elite) private eliteModel: Repository<Elite>) {}

  async create(data: ICreateElite) {
    const elite = await this.eliteModel.create(data);
    return this.eliteModel.save(elite);
  }

  async findActive(relations?: string[]): Promise<Elite[]> {
    return this.eliteModel
      .find({ relations: relations ?? this.allRelations })
      .then((elites: Elite[]) => {
        const today = new Date();
        return elites.filter(
          async (elite) =>
            (await elite.expiresIn.getMilliseconds()) > today.getMilliseconds(),
        );
      });
  }

  async find(relations?: string[]): Promise<Elite[]> {
    return this.eliteModel.find({ relations: relations ?? this.allRelations });
  }

  async findByUserId(userId: number, relations?: string[]): Promise<Elite> {
    return this.eliteModel.findOneOrFail({
      where: { userId },
      relations: relations ?? this.allRelations,
    });
  }

  async deleteByUserId(userId: number): Promise<Elite> {
    const elite = await this.eliteModel.findOneOrFail({ where: { userId } });
    return this.eliteModel.remove(elite);
  }

  async delete(id: number): Promise<Elite> {
    const elite = await this.eliteModel.findOneOrFail(id);
    return this.eliteModel.remove(elite);
  }

  async clear(): Promise<Elite[]> {
    const elites = await this.eliteModel.find();
    return this.eliteModel.remove(elites);
  }
}
