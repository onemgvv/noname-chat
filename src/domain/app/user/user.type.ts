import { UserSex } from '@common/types/user.types';
import { Role } from '@persistence/app/role/role.entity';

export type User = {
  id?: number;
  name?: string;
  email: string;
  premium: Date;
  city?: string;
  age?: number;
  sex: UserSex;
  photo?: string;
  password: string;
  rating: number;
  ban?: Date;
  roles?: Role[];
  refreshCode?: number;
  vkId: string;
  googleId: string;
  appleId: string;
  lastUpdate?: Date;
  createdAt?: Date;
  updateAt?: Date;
};
