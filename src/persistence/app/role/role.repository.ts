import { Injectable } from '@nestjs/common';
import { ICreateRole } from './interface/create.interface';
import { EntityRepository, Repository } from 'typeorm';
import { Role } from '@persistence/app/role/role.entity';
import { IRoleRepository } from '@domain/app/user/interface/role-repo.interface';

@Injectable()
@EntityRepository(Role)
export class RoleRepository
  extends Repository<Role>
  implements IRoleRepository
{
  async newRole(data: ICreateRole): Promise<Role> {
    const role = await this.create(data);
    return this.save(role);
  }

  getByName(name: string, relations?: string[]): Promise<Role> {
    return this.findOne({
      where: { name },
      relations: relations,
    });
  }

  receive(relations?: string[]): Promise<Role[]> {
    return this.find({
      relations: relations,
    });
  }
}
