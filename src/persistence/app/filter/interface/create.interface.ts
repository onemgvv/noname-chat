import { UserSex } from '@common/types/user.types';

export interface ICreateFilter {
  sex: UserSex;
  ageMin: number;
  ageMax: number;
  city: string;
}
