import { UserSex } from '@common/types/user.types';

export interface IUpdateFilter {
  sex?: UserSex;
  ageMin?: number;
  ageMax?: number;
  city?: string;
}
