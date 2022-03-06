import { UserRepository } from './user.repository';
import { Provider } from '@nestjs/common';

export const UserRepoProvider: Provider = {
  provide: 'UserRepo',
  useClass: UserRepository,
};
