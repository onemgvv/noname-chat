import { NotFoundException } from '@nestjs/common';
import { ICreateRole } from './interface/create.interface';
import { EntityRepository, Repository } from 'typeorm';
import { Role } from '@persistence/app/role/role.entity';
import { IRoleRepository } from '@domain/app/user/interface/role-repo.interface';
import { ROLES_NOT_FOUND, ROLE_NOT_FOUND } from '@config/constants';

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
    let role: Role;
    try {
      role = await this.findOneOrFail({
        where: { name },
        relations: relations ?? this.allRelations,
      });
    } catch (e) {
      console.log('role', e);
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async receive(relations?: string[]): Promise<Role[]> {
    const roles: Role[] = await this.find({
      relations: relations ?? this.allRelations,
    });
    if (roles.length === 0) throw new NotFoundException(ROLES_NOT_FOUND);

    return roles;
  }

  async deleteOne(id: number): Promise<Role> {
    let role: Role;
    try {
      role = await this.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(ROLE_NOT_FOUND);
    }

    return this.remove(role);
  }

  async deleteAll(): Promise<Role[]> {
    const roles = await this.find();
    if (roles.length === 0) throw new NotFoundException(ROLES_NOT_FOUND);

    return this.remove(roles);
  }
}
