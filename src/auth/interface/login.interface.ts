import { User } from '@persistence/app/user/user.entity';

export interface ILogin {
  accessToken: string;
  refreshToken: string;
  user: User;
}
