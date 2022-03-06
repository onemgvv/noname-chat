import { RolesList } from './../enums/roles.enum';

export type UserSex = 'male' | 'female' | 'default';
export type UserRoles =
  | RolesList.USER
  | RolesList.PREMIUM
  | RolesList.MODERATOR
  | RolesList.ADMIN;
