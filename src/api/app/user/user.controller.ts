import { IFilestoreService } from '@utils/filestore/interface/filestore.interface';
import { IUserService } from '@domain/app/user/interface/user-service.inerface';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { USER_SERVICE, FILESTORE_SERVICE } from '@config/constants';
import { GivePremiumDto } from './dto/give-premium.dto';
import { UserRolesRequest } from './dto/user-roles.dto';
import { RolesGuard } from '@common/guards/roles.guard';
import { CustomAuthGuard } from '@common/guards/custom-auth.guard';
import { RolesList } from '@enums/roles.enum';
import { UpdateUserDto } from './dto/update.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Patch,
  UseInterceptors,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { User } from '@persistence/app/user/user.entity';
import { Roles } from '@common/decorators/roles.decorator';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { BanUserDto } from './dto/ban.dto';
import { Folder } from '@common/types/app.types';
import { CanEditInterceptor } from '@common/interceptors/can-edit.interceptor';
import { UserRoles } from '@common/types/user.types';
import { NewBlockInterface } from '@domain/app/user/interface/new-block.interface';

const UserService = () => Inject(USER_SERVICE);
const FilestoreService = () => Inject(FILESTORE_SERVICE);

@Controller('users')
export class UsersController {
  constructor(
    @UserService() private userService: IUserService,
    @FilestoreService() private readonly fsService: IFilestoreService, // private readonly chatGateway: ChatGateway,
  ) {}

  @Post('roles')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard)
  async setRole(@Body() data: UserRolesRequest) {
    const user: User = await this.userService.setRole(
      data.userId,
      data.roleName,
    );
    return {
      status: HttpStatus.OK,
      message: `Пользователю ${user.email} присвоена роль ${data.roleName}`,
      user,
    };
  }

  @Post(':userId/roles/premium')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async givePremium(
    @Param('userId') userId: number,
    @Body() data: GivePremiumDto,
  ) {
    await this.userService.givePremium(userId, data.expiresIn);
    const result = await this.userService.setRole(userId, RolesList.PREMIUM);

    return {
      status: HttpStatus.OK,
      message: 'Роль премиум выдана пользователю',
      result,
    };
  }

  @Delete(':userId/roles/:role')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteRole(
    @Param(':userId') userId: number,
    @Param('role') roleName: UserRoles,
  ) {
    const user: User = await this.userService.deleteRole(userId, roleName);
    return {
      status: HttpStatus.OK,
      message: `Роль ${roleName} снята с пользователя`,
      user,
    };
  }

  @Delete(':id/roles/premium')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async removeUsersPremium(@Param('id') id: number) {
    const user = await this.userService.removePremium(id);
    return { status: true, user };
  }

  @Delete('roles/premium')
  @UseGuards(CustomAuthGuard)
  async removePremium(@CurrentUser() currentUser: User) {
    const user = await this.userService.removePremium(currentUser.id);
    return { status: true, user };
  }

  @Post('blocklist/:userId')
  @UseGuards(CustomAuthGuard)
  async blockUser(
    @CurrentUser() currentUser: User,
    @Param('userId') targetId: number,
  ) {
    const result = await this.userService.block(currentUser.id, targetId);
    return {
      status: HttpStatus.OK,
      message: 'Вы успешно заблокировали пользователя',
      result,
    };
  }

  @Delete('blocklist/:userId')
  @UseGuards(CustomAuthGuard)
  async removeUserBlock(
    @CurrentUser() currentUser: User,
    @Param('userId') targetId: number,
  ) {
    const result = await this.userService.unblock(currentUser.id, targetId);

    return {
      status: HttpStatus.OK,
      message: 'Пользователь разблокирован',
      result,
    };
  }

  @Get('blocklist')
  @UseGuards(CustomAuthGuard)
  async getMyBlockList(@CurrentUser() currentUser: User) {
    const usersBlacklist: NewBlockInterface[] =
      await this.userService.getBlacklist(currentUser.id);

    return {
      status: HttpStatus.OK,
      blacklist: usersBlacklist,
    };
  }

  @Get('blocklist/:userId')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getUsersBlacklist(@Param('userId') userId: number) {
    const usersBlacklist: NewBlockInterface[] =
      await this.userService.getBlacklist(userId);

    return {
      status: HttpStatus.OK,
      message: 'Черный список пользователя загружен!',
      blacklist: usersBlacklist,
    };
  }

  @Get()
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getAll() {
    const users = await this.userService.receiveUser();
    return { message: 'Пользователи найдены', users };
  }

  @Get('email/:email')
  @UseGuards(CustomAuthGuard)
  async getUserByEmail(@Param('email') email: string) {
    const users = await this.userService.findUser('email', email);
    return { message: 'Пользователи найдены', users };
  }

  @Get('id/:id')
  @UseGuards(CustomAuthGuard)
  async getUserById(@Param('id') id: number) {
    const user = await this.userService.findUser('id', id);
    return { status: HttpStatus.OK, message: 'Пользователь найден', user };
  }

  @Get('code/:code')
  async getUserByCode(@Param('code') code: number) {
    const user = await this.userService.findUser('refreshCode', code);
    if (!user) throw new NotFoundException('Неверный код');
    return { status: HttpStatus.OK, message: 'Пользователь найден', user };
  }

  @Patch('profile')
  @UseGuards(CustomAuthGuard)
  @UseInterceptors(new CanEditInterceptor())
  async updateUser(
    @CurrentUser() currentUser: User,
    @Body() updateDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(currentUser.id, updateDto);
    return {
      status: HttpStatus.OK,
      message: 'Ваши данные успешно обновлены!',
      user,
    };
  }

  @Patch('password')
  @UseGuards(CustomAuthGuard)
  async updatePassword(
    @CurrentUser() currentUser: User,
    @Body('password') password: string,
  ) {
    await this.userService.changePassword(currentUser.id, password);
    return { status: HttpStatus.OK, message: 'Ваш пароль успешно обновлен' };
  }

  @Patch('rating')
  @UseGuards(CustomAuthGuard)
  async updateRating(@Body() data: { userId: number; rating: number }) {
    const user = await this.userService.changeRating(data.userId, data.rating);
    return { status: HttpStatus.OK, message: 'Рейтинг изменен', user };
  }

  @Get('memojies/:type')
  async getMemojies(@Param('type') type: Folder): Promise<any> {
    const images = await this.fsService.receiveImages(type);
    return { statusCode: HttpStatus.OK, images };
  }

  @Patch('photo')
  @UseGuards(CustomAuthGuard)
  updatePhoto(
    @CurrentUser() currentUser: User,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.userService.update(currentUser.id, updateDto);
  }

  @Delete('delete/account')
  @UseGuards(CustomAuthGuard)
  async deleteAccount(@CurrentUser() currentUser: User) {
    await this.userService.deleteAccount(currentUser.id);
    return { status: HttpStatus.OK, message: 'Ваш аккаунт удален успешно!' };
  }

  @Delete('delete/:userId')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteUser(@Param('userId') userId: number) {
    await this.userService.deleteAccount(userId);
    return { status: HttpStatus.OK, message: 'Пользователь успешно удален!' };
  }

  @Patch('ban')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async banUser(@Body() dto: BanUserDto) {
    const result = await this.userService.ban(dto.userId, dto.expiresIn);
    // this.chatGateway.server
    //   .to(`messages/${dto.userId}`)
    //   .emit('SERVER:USER_BANNED');
    return { status: 200, result };
  }

  @Patch('unban')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async unbanUser(@Body('userId') userId: number) {
    const result = await this.userService.unban(userId);
    return { status: 200, result };
  }

  @Get('data/age-groups')
  @HttpCode(200)
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getAgesGroups() {
    return this.userService.getAgesGroup();
  }

  @Get('data/gender-groups')
  @HttpCode(200)
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getGenderGroups() {
    const menCount = await this.userService.getCountSex('male');
    const womenCount = await this.userService.getCountSex('female');

    return { men: menCount, women: womenCount };
  }

  @Get('data/city-groups')
  @HttpCode(200)
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getCityGroups() {
    throw new InternalServerErrorException('Пока не работает!');
    // return this.userService.getGeoraphic();
  }
}
