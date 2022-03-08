import { User } from '@persistence/app/user/user.entity';

export type Topic = {
  id?: number;
  name: string;
  adult: boolean;
  pinned: boolean;
  userId?: number;
  user?: User;
  created_at?: Date;
  updated_at?: Date;
};
