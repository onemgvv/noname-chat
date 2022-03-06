import { RoleRepository } from './role.repository';
import { Provider } from '@nestjs/common';

export const RoleRepoProvider: Provider = {
  provide: 'RoleRepo',
  useClass: RoleRepository,
};
