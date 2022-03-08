import { UserRepository } from './user.repository';
import { Provider } from '@nestjs/common';
import { USER_REPO } from '@config/constants';

export const UserRepoProvider: Provider = {
  provide: USER_REPO,
  useClass: UserRepository,
};
