import { Injectable } from '@nestjs/common';
import { UserSex } from '@common/types/user.types';
import { IUserRepository } from '@domain/app/user/interface/user-repo.interface';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { User as UserType } from '@domain/app/user/user.type';

@Injectable()
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
    'elites',
    'blacklist',
  ];

  async newUser(data: Partial<UserType>): Promise<User> {
    const newUser = await this.create(data);
    return this.save(newUser);
  }

  async updateProfile(id: number, data: Partial<UserType>): Promise<User> {
    const user = await this.findOne(id);

    await Object.keys(data).forEach((key: any) => {
      if (data[key]) user[key] = data[key];
    });

    return this.save(user);
  }

  findAll(relations?: string[]): Promise<User[]> {
    return this.find({
      relations: relations ?? this.allRelations,
    });
  }

  async findById(id: number, relations?: string[]): Promise<User> {
    return this.findOne(id, {
      relations: relations ?? this.allRelations,
    });
  }

  async findByName(name: string, relations?: string[]): Promise<User> {
    return this.findOne({
      where: { name },
      relations: relations ?? this.allRelations,
    });
  }

  async findByEmail(email: string, relations?: string[]): Promise<User> {
    return this.findOne({
      where: { email },
      relations: relations ?? this.allRelations,
    });
  }

  async findByToken(token: string, relations?: string[]) {
    return this.findOne({
      where: { token },
      relations: relations ?? this.allRelations,
    });
  }

  async findByField(field: keyof User, value: any, relations?: string[]) {
    return this.findOne({
      where: { [field]: value },
      relations: relations ?? this.allRelations,
    });
  }

  async deleteOne(user: User): Promise<User> {
    return this.remove(user);
  }

  async getAttributes(attributes: (keyof User)[], id: number): Promise<User> {
    return this.findOneOrFail(id, { select: attributes });
  }

  async getCountSex(sex: UserSex): Promise<[User[], number]> {
    return this.findAndCount({ sex });
  }
}
