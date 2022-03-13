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
  EMPTY_BLACKLIST,
  ROLE_REPO,
  USER_NOT_FOUND,
  USER_REPO,
  ROLE_NOT_FOUND,
  USERS_NOT_FOUND,
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
    @UserRepo() private userRepository: IUserRepository,
    @RoleRepo() private roleRepository: IRoleRepository,
    @BlacklistRepo()
    private blacklistRepository: IBlacklistRepository,
  ) {}

  async create(data: Partial<UserType>): Promise<User> {
    const role = await this.roleRepository.getByName(RolesList.USER);
    return this.userRepository.newUser({ ...data, roles: [role] });
  }

  async setRole(userId: number, role: UserRoles): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    const uRole = await this.roleRepository.getByName(role);
    if (!uRole) throw new NotFoundException(ROLE_NOT_FOUND);

    user.roles.push(uRole);
    return this.userRepository.updateProfile(userId, { roles: user.roles });
  }

  async deleteRole(userId: number, role: UserRoles): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    const fRole = await this.roleRepository.getByName(role);
    if (!fRole) throw new NotFoundException(ROLE_NOT_FOUND);

    user.roles = user.roles.filter((r: Role) => r.name !== fRole.name);
    return this.userRepository.updateProfile(userId, { roles: user.roles });
  }

  async givePremium(userId: number, expiresIn: number): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    const expiresDate = Helper.calculateDate(expiresIn);
    user.premium = expiresDate;
    return user.save();
  }

  async removePremium(userId: number): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return this.userRepository.updateProfile(userId, {
      premium: null,
    });
  }

  async findUser(field: keyof User, value: any): Promise<User> {
    const user = await this.userRepository.findByField(field, value);
    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return user;
  }

  async checkExist(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getBySocials(fieldId: SocialIds, userId: string): Promise<User> {
    return this.userRepository.findByField(fieldId, userId);
  }

  async changePassword(id: number, password: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    user.password = password;
    return user.save();
  }

  async changeRating(id: number, rating: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    user.rating = rating;
    return user.save();
  }

  async update(userId: number, data: Partial<UserType>): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return this.userRepository.updateProfile(userId, data);
  }

  async receiveUser(relations?: string[]): Promise<User[]> {
    const users = await this.userRepository.findAll(relations);
    if (users.length === 0) throw new NotFoundException(USERS_NOT_FOUND);

    return users;
  }

  async getBlacklist(ownerId: number): Promise<NewBlockInterface[]> {
    const user = await this.userRepository.findById(ownerId);
    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    if (user.blacklist.length === 0)
      throw new NotFoundException(EMPTY_BLACKLIST);

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

  async deleteAccount(userId: number): Promise<User> {
    const account = await this.userRepository.findById(userId);
    return this.userRepository.deleteOne(account);
  }

  async getCountSex(sex: UserSex): Promise<[User[], number]> {
    return this.userRepository.getCountSex(sex);
  }
}
