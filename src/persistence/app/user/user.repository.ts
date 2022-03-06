import { UserSex } from '@common/types/user.types';
import { IUserRepository } from '@domain/app/user/interface/user-repo.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { User as UserType } from '@domain/app/user/user.type';

@Injectable()
export class UserRepository implements IUserRepository {
  private allRelations = [
    'topics',
    'tokens',
    'roles',
    'filter',
    'elites',
    'blacklist',
  ];

  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async create(data: Partial<UserType>): Promise<User> {
    const newUser = await this.userModel.create(data);
    return this.userModel.save(newUser);
  }

  async update(id: number, data: Partial<UserType>): Promise<User> {
    const user = await this.userModel.findOneOrFail(id);

    await Object.keys(data).forEach((key: any) => {
      if (data[key]) user[key] = data[key];
    });

    return this.userModel.save(user);
  }

  async changePassword(id: number, password: string): Promise<User> {
    const user = await this.userModel.findOneOrFail(id);
    user.password = password;

    return this.userModel.save(user);
  }

  async changeRating(userId: number, rating: number): Promise<User> {
    const user = await this.userModel.findOneOrFail(userId);
    user.rating = rating;
    return this.userModel.save(user);
  }

  async findAll(relations?: string[]): Promise<User[]> {
    return this.userModel.find({ relations: relations ?? this.allRelations });
  }

  async findById(id: number, relations?: string[]): Promise<User> {
    return this.userModel.findOneOrFail(id, {
      relations: relations ?? this.allRelations,
    });
  }

  async save(user: User): Promise<User> {
    return this.userModel.save(user);
  }

  async findByIds(ids: number[], relations?: string[]): Promise<User[]> {
    return this.userModel.findByIds(ids, {
      relations: relations ?? this.allRelations,
    });
  }

  async findByName(name: string, relations?: string[]): Promise<User> {
    return this.userModel.findOneOrFail({
      where: { name },
      relations: relations ?? this.allRelations,
    });
  }

  async findByEmail(email: string, relations?: string[]) {
    return this.userModel.findOneOrFail({
      where: { email },
      relations: relations ?? this.allRelations,
    });
  }

  async findByToken(token: string, relations?: string[]) {
    return this.userModel.findOneOrFail({
      where: { token },
      relations: relations ?? this.allRelations,
    });
  }

  async findByField(field: keyof User, value: any, relations?: string[]) {
    return this.userModel.findOneOrFail({
      where: { [field]: value },
      relations: relations ?? this.allRelations,
    });
  }

  async getAttributes(attributes: (keyof User)[], id: number): Promise<User> {
    return this.userModel.findOneOrFail(id, { select: attributes });
  }

  async getCountSex(sex: UserSex): Promise<[User[], number]> {
    return this.userModel.findAndCount({ sex });
  }
}
