import { UserServiceImpl } from './user.service';
import { Provider } from '@nestjs/common';
import { USER_SERVICE } from '@config/constants';

export const UserServiceProvider: Provider = {
  provide: USER_SERVICE,
  useClass: UserServiceImpl,
};
