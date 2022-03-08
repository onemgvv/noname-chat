import { ICreateRole } from './interface/create.interface';
import { EntityRepository, Repository } from 'typeorm';
import { Role } from '@persistence/app/role/role.entity';
import { IRoleRepository } from '@domain/app/user/interface/role-repo.interface';

@EntityRepository(Role)
export class RoleRepository
  extends Repository<Role>
  implements IRoleRepository
{
  private allRelations = ['users'];

  async newRole(data: ICreateRole): Promise<Role> {
    const role = await this.create(data);

    return this.save(role);
  }

  async getByName(name: string, relations?: string[]): Promise<Role> {
    return this.findOneOrFail({
      where: { name },
      relations: relations ?? this.allRelations,
    });
  }

  async receive(relations?: string[]): Promise<Role[]> {
    return this.find({ relations: relations ?? this.allRelations });
  }

  async deleteOne(id: number): Promise<Role> {
    const role = await this.findOneOrFail(id);

    return this.remove(role);
  }

  async deleteAll(): Promise<Role[]> {
    const roles = await this.find();

    return this.remove(roles);
  }
}
