import { User as UserType } from '../user.type';
import { User } from '@persistence/app/user/user.entity';
import { UserRoles, UserSex } from '@common/types/user.types';
import { SocialIds } from '@common/types/app.types';
import { NewBlockInterface } from './new-block.interface';

export interface IUserService {
  create(data: Partial<UserType>): Promise<User>;
  setRole(userId: number, role: UserRoles): Promise<User>;
  deleteRole(userId: number, role: UserRoles): Promise<User>;
  givePremium(userId: number, expiresIn: number): Promise<User>;
  removePremium(userId: number): Promise<User>;
  findUser(field: keyof User, value: any): Promise<User>;
  checkExist(email: string): Promise<User>;
  changePassword(id: number, password: string): Promise<User>;
  changeRating(id: number, rating: number): Promise<User>;
  getBySocials(fieldId: SocialIds, userId: string): Promise<User>;
  update(userId: number, data: Partial<UserType>): Promise<User>;
  receiveUser(relations?: string[]): Promise<User[]>;
  getBlacklist(ownerId: number): Promise<NewBlockInterface[]>;
  block(ownerId: number, userId: number): Promise<NewBlockInterface>;
  deleteAccount(userId: number): Promise<User>;
  unblock(ownerId: number, targetId: number): Promise<{ message: string }>;
  ban(userId: number, expiresIn: number): Promise<User>;
  unban(userId: number): Promise<User>;
  getCountSex(sex: UserSex): Promise<[User[], number]>;
}
