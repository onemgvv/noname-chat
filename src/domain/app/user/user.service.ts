import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';
import { IUserRepository } from './interface/user-repo.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserService } from './interface/user-service.inerface';
import { User } from '@persistence/app/user/user.entity';
import { User as UserType } from '@domain/app/user/user.type';
import { SocialIds } from '@common/types/app.types';
import { UserRoles, UserSex } from '@common/types/user.types';
import {
  BLACKLIST_REPO,
  ROLE_REPO,
  USER_NOT_FOUND,
  USER_REPO,
} from '@config/constants';
import { Helper } from '@utils/app.helper';
import { IBlacklistRepository } from './interface/blacklist-repo.interface';
import { NewBlockInterface } from './interface/new-block.interface';
import { Role } from '@persistence/app/role/role.entity';
import { RolesList } from '@enums/roles.enum';
import { IRoleRepository } from './interface/role-repo.interface';

const UserRepo = () => Inject(USER_REPO);
const RoleRepo = () => Inject(ROLE_REPO);
const BlacklistRepo = () => Inject(BLACKLIST_REPO);

@Injectable()
export class UserServiceImpl implements IUserService {
  constructor(
    @UserRepo() private readonly userRepository: IUserRepository,
    @RoleRepo() private readonly roleRepository: IRoleRepository,
    @BlacklistRepo() private readonly blacklistRepository: IBlacklistRepository,
  ) {}

  async create(data: Partial<UserType>): Promise<User> {
    const role = await this.roleRepository.getByName(RolesList.USER);
    return this.userRepository.newUser({ ...data, roles: [role] });
  }

  async setRole(userId: number, role: UserRoles): Promise<User> {
    const user = await this.userRepository.findById(userId);
    const uRole = await this.roleRepository.getByName(role);
    user.roles.push(uRole);
    return this.userRepository.updateProfile(userId, { roles: user.roles });
  }

  async deleteRole(userId: number, role: UserRoles): Promise<User> {
    const user = await this.userRepository.findById(userId);
    user.roles = user.roles.filter((r: Role) => r.name !== role);
    return this.userRepository.updateProfile(userId, { roles: user.roles });
  }

  async givePremium(userId: number, expiresIn: number): Promise<User> {
    const expiresDate = Helper.calculateDate(expiresIn);
    return this.userRepository.updateProfile(userId, { premium: expiresDate });
  }

  async removePremium(userId: number): Promise<User> {
    const user = await this.userRepository.findById(userId);
    user.roles = user.roles.filter(
      (role: Role) => role.name !== RolesList.PREMIUM,
    );
    return this.userRepository.updateProfile(userId, {
      premium: null,
      roles: user.roles,
    });
  }

  async findUser(field: keyof User, value: any): Promise<User> {
    return this.userRepository.findByField(field, value);
  }

  async getBySocials(fieldId: SocialIds, userId: string): Promise<User> {
    return this.userRepository.findByField(fieldId, userId);
  }

  async update(userId: number, data: Partial<UserType>): Promise<User> {
    if (data.password) {
      this.userRepository.changePassword(userId, data.password);
    }

    return this.userRepository.findById(userId);
  }

  async receiveUser(relations?: string[]): Promise<User[]> {
    return this.userRepository.findAll(relations);
  }

  async getBlacklist(ownerId: number): Promise<NewBlockInterface[]> {
    const user = await this.userRepository.findById(ownerId);

    return Promise.all(
      user.blacklist.map(async (block: Blacklist) => {
        const blockUser = await this.userRepository.getAttributes(
          ['id', 'name', 'photo'],
          block.userId,
        );

        return {
          id: block.id,
          ownerId: block.ownerId,
          target: blockUser,
        };
      }),
    );
  }

  async block(ownerId: number, userId: number): Promise<NewBlockInterface> {
    const target = await this.userRepository.getAttributes(
      ['id', 'name', 'photo'],
      userId,
    );
    if (!target) throw new NotFoundException(USER_NOT_FOUND);
    const newBlock = await this.blacklistRepository.newBlacklist({
      ownerId,
      userId,
    });

    return {
      id: newBlock.id,
      ownerId,
      target,
    };
  }

  async unblock(
    ownerId: number,
    targetId: number,
  ): Promise<{ message: string }> {
    const target: User = await this.userRepository.getAttributes(
      ['id', 'name'],
      targetId,
    );
    if (!target) throw new NotFoundException(USER_NOT_FOUND);
    await this.blacklistRepository.deleteOne(ownerId, targetId);
    return { message: `Пользователь ${target.name} разблокирован` };
  }

  async ban(userId: number, expiresIn: number): Promise<User> {
    const user: User = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    const expiresDate: Date = Helper.calculateDate(expiresIn);
    return this.userRepository.updateProfile(user.id, { ban: expiresDate });
  }

  async unban(userId: number): Promise<User> {
    const user: User = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException(USER_NOT_FOUND);
    return this.userRepository.updateProfile(user.id, { ban: null });
  }

  async getCountSex(sex: UserSex): Promise<number> {
    const result = await this.userRepository.getCountSex(sex);
    return result[1];
  }

  async getAgesGroup() {
    const users = await this.userRepository.findAll();

    const groups = [
      { title: '16-18', count: 0 },
      { title: '19-24', count: 0 },
      { title: '25-29', count: 0 },
      { title: '30+', count: 0 },
    ];

    users.forEach((user: User) => {
      if (user.age >= 16 && user.age <= 18) {
        groups[0].count += 1;
      } else if (user.age >= 19 && user.age <= 24) {
        groups[1].count += 1;
      } else if (user.age >= 25 && user.age <= 29) {
        groups[2].count += 1;
      } else if (user.age >= 30) {
        groups[3].count += 1;
      }
    });

    return groups;
  }

  // async getGeoraphic() {
  //   const cities: FindCityDto[] = await this.citiesService.findAll();
  //   const users: User[] = await this.userRepository.findAll();
  //   const data = [];

  //   await cities.map(async (city: Cities) => {
  //     console.log(city.name);
  //     const cityUsers = users.filter((user: User) => user.city === city.name);
  //     data.push({ name: city.name, count: cityUsers.length });
  //   });

  //   console.log(data);

  //   return data;
  // }
}
