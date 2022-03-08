import { UserSex } from '@common/types/user.types';
import { User } from '@persistence/app/user/user.entity';

export type Filter = {
  id?: number;
  sex?: UserSex;
  ageMin?: number;
  ageMax?: number;
  userId?: number;
  user?: User;
  created_at?: Date;
  updated_at?: Date;
};
