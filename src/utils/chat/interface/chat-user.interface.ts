import { Filter } from '@persistence/app/filter/filter.entity';

export interface IChatUser {
  id: number;
  name: string;
  email: string;
  age: number;
  sex: 'male' | 'female' | 'default';
  photo: string;
  premium: Date | null | string;
  filter: Filter;
  city: string | null;
  rating: number;
  createdAt: Date | string;
}
