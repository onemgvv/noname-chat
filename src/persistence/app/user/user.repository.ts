import { USERS_NOT_FOUND, USER_NOT_FOUND } from '@config/constants';
import { NotFoundException } from '@nestjs/common';
import { UserSex } from '@common/types/user.types';
import { IUserRepository } from '@domain/app/user/interface/user-repo.interface';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { User as UserType } from '@domain/app/user/user.type';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  private allRelations = [
    'topics',
    'token',
    'roles',
    'filter',
    'elite',
    'blacklist',
  ];

  async newUser(data: Partial<UserType>): Promise<User> {
    const newUser = await this.create(data);
    return this.save(newUser);
  }

  async updateProfile(id: number, data: Partial<UserType>): Promise<User> {
    let user: User;

    try {
      user = await this.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    await Object.keys(data).forEach((key: any) => {
      if (data[key]) user[key] = data[key];
    });

    return this.save(user);
  }

  async changePassword(id: number, password: string): Promise<User> {
    let user: User;
    try {
      user = await this.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    user.password = password;

    return this.save(user);
  }

  async changeRating(id: number, rating: number): Promise<User> {
    let user: User;
    try {
      user = await this.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    user.rating = rating;
    return this.save(user);
  }

  async findAll(relations?: string[]): Promise<User[]> {
    const users = await this.find({
      relations: relations ?? this.allRelations,
    });
    if (users.length === 0) throw new NotFoundException(USERS_NOT_FOUND);

    return users;
  }

  async findById(id: number, relations?: string[]): Promise<User> {
    let user: User;
    try {
      user = await this.findOneOrFail(id, {
        relations: relations ?? this.allRelations,
      });
    } catch (e) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  async findByName(name: string, relations?: string[]): Promise<User> {
    let user: User;
    try {
      user = await this.findOneOrFail({
        where: { name },
        relations: relations ?? this.allRelations,
      });
    } catch (e) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  async findByEmail(email: string, relations?: string[]): Promise<User> {
    let user: User;
    try {
      user = await this.findOneOrFail({
        where: { email },
        relations: relations ?? this.allRelations,
      });
    } catch (e) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  async findByToken(token: string, relations?: string[]) {
    let user: User;
    try {
      user = await this.findOneOrFail({
        where: { token },
        relations: relations ?? this.allRelations,
      });
    } catch (e) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  async findByField(field: keyof User, value: any, relations?: string[]) {
    let user: User;
    try {
      user = await this.findOneOrFail({
        where: { [field]: value },
        relations: relations ?? this.allRelations,
      });
    } catch (e) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  async getAttributes(attributes: (keyof User)[], id: number): Promise<User> {
    let user: User;
    try {
      user = await this.findOneOrFail(id, { select: attributes });
    } catch (e) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  async getCountSex(sex: UserSex): Promise<[User[], number]> {
    return this.findAndCount({ sex });
  }
}
