import { ICreateRole } from '@persistence/app/role/interface/create.interface';
import { Role } from '@persistence/app/role/role.entity';

export interface IRoleRepository {
  newRole(data: ICreateRole): Promise<Role>;
  getByName(name: string, relations?: string[]): Promise<Role>;
  receive(relations?: string[]): Promise<Role[]>;
  deleteOne(id: number): Promise<Role>;
  deleteAll(): Promise<Role[]>;
}
