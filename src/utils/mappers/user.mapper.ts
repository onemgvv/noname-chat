import { CreateUserDto } from '@api/app/user/dto/create.dto';
import { UpdateUserDto } from '@api/app/user/dto/update.dto';
import { User } from '@domain/app/user/user.type';

export class UserMapper {
  public static CreateToDomain(update: CreateUserDto): Partial<User> {
    const partialUser: Partial<User> = {
      name: update.name ?? undefined,
      email: update.email ?? undefined,
      age: update.age ?? undefined,
      sex: update.sex ?? undefined,
    };
    Object.keys(partialUser).forEach(
      (key) => partialUser[key] === undefined && delete partialUser[key],
    );

    return partialUser;
  }

  public static UpdateToDomain(update: UpdateUserDto): Partial<User> {
    const partialUser: Partial<User> = {
      name: update.name ?? undefined,
      email: update.email ?? undefined,
      age: update.age ?? undefined,
      sex: update.sex ?? undefined,
      city: update.city ?? undefined,
      photo: update.photo ?? undefined,
    };
    Object.keys(partialUser).forEach(
      (key) => partialUser[key] === undefined && delete partialUser[key],
    );

    return partialUser;
  }
}
