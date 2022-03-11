import { ICreateRole } from '@persistence/app/role/interface/create.interface';
import { Role } from '@persistence/app/role/role.entity';
import { Repository } from 'typeorm';

export interface IRoleRepository extends Repository<Role> {
  newRole(data: ICreateRole): Promise<Role>;
  getByName(name: string, relations?: string[]): Promise<Role>;
  receive(relations?: string[]): Promise<Role[]>;
  deleteOne(id: number): Promise<Role>;
  deleteAll(): Promise<Role[]>;
}
