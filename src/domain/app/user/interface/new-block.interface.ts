import { User } from '@domain/app/user/user.type';

export interface NewBlockInterface {
  id: number;
  ownerId: number;
  target: Partial<User>;
}
