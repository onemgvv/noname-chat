import { RoleRepository } from './role.repository';
import { Provider } from '@nestjs/common';
import { ROLE_REPO } from '@config/constants';

export const RoleRepoProvider: Provider = {
  provide: ROLE_REPO,
  useClass: RoleRepository,
};
