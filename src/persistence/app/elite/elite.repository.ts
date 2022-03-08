import { Elite as EliteType } from '@domain/app/elite/elite.type';
import { EntityRepository, Repository } from 'typeorm';
import { Elite } from '@persistence/app/elite/elite.entity';
import { IEliteRepository } from '@domain/app/elite/interface/elite-repo.interface';

@EntityRepository(Elite)
export class EliteRepository
  extends Repository<Elite>
  implements IEliteRepository
{
  private allRelations = ['users'];

  async newElite(data: Partial<EliteType>): Promise<Elite> {
    const elite = await this.create(data);
    return this.save(elite);
  }

  async findActive(relations?: string[]): Promise<Elite[]> {
    return this.find({ relations: relations ?? this.allRelations }).then(
      (elites: Elite[]) => {
        const today = new Date();
        return elites.filter(
          async (elite) =>
            (await elite.expiresIn.getMilliseconds()) > today.getMilliseconds(),
        );
      },
    );
  }

  async receiveAll(relations?: string[]): Promise<Elite[]> {
    return this.find({ relations: relations ?? this.allRelations });
  }

  async findByUserId(userId: number, relations?: string[]): Promise<Elite> {
    return this.findOneOrFail({
      where: { userId },
      relations: relations ?? this.allRelations,
    });
  }

  async deleteByUserId(userId: number): Promise<Elite> {
    const elite = await this.findOneOrFail({ where: { userId } });
    return this.remove(elite);
  }

  async deleteOne(id: number): Promise<Elite> {
    const elite = await this.findOneOrFail(id);
    return this.remove(elite);
  }

  async deleteAll(): Promise<Elite[]> {
    const elites = await this.find();
    return this.remove(elites);
  }
}
