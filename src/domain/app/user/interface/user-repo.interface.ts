import { UserSex } from '@common/types/user.types';
import { User } from '@persistence/app/user/user.entity';
import { User as UserType } from '@domain/app/user/user.type';

export interface IUserRepository {
  newUser(data: Partial<UserType>): Promise<User>;
  updateProfile(id: number, data: Partial<UserType>): Promise<User>;
  changePassword(id: number, password: string): Promise<User>;
  changeRating(userId: number, rating: number): Promise<User>;
  findAll(relations?: string[]): Promise<User[]>;
  findById(id: number, relations?: string[]): Promise<User>;
  findByName(name: string, relations?: string[]): Promise<User>;
  findByEmail(email: string, relations?: string[]): Promise<User>;
  findByToken(token: string, relations?: string[]): Promise<User>;
  findByField(field: keyof User, value: any): Promise<User>;
  getAttributes(attributes: (keyof User)[], id: number): Promise<User>;
  getCountSex(sex: UserSex): Promise<[User[], number]>;
}
