import { ICreateRole } from './interface/create.interface';
import { Repository } from 'typeorm';
import { Role } from '@persistence/app/role/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRoleRepository } from '@domain/app/user/interface/role-repo.interface';

@Injectable()
export class RoleRepository implements IRoleRepository {
  private allRelations = ['users'];

  constructor(@InjectRepository(Role) private roleModel: Repository<Role>) {}

  async create(data: ICreateRole): Promise<Role> {
    const role = await this.roleModel.create(data);

    return this.roleModel.save(role);
  }

  async getByName(name: string, relations?: string[]): Promise<Role> {
    return this.roleModel.findOneOrFail({
      where: { name },
      relations: relations ?? this.allRelations,
    });
  }

  async receive(relations?: string[]): Promise<Role[]> {
    return this.roleModel.find({ relations: relations ?? this.allRelations });
  }

  async delete(id: number): Promise<Role> {
    const role = await this.roleModel.findOneOrFail(id);

    return this.roleModel.remove(role);
  }

  async clear(): Promise<Role[]> {
    const roles = await this.roleModel.find();

    return this.roleModel.remove(roles);
  }
}
