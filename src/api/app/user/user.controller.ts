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
import { Helper } from '@utils/app.helper';
import { AppGateway } from '@utils/gateways/app.gateway';
import { Server } from 'socket.io';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

const UserService = () => Inject(USER_SERVICE);
const FilestoreService = () => Inject(FILESTORE_SERVICE);

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private server: Server;

  constructor(
    @UserService() private userService: IUserService,
    @FilestoreService() private readonly fsService: IFilestoreService,
    private readonly appGateway: AppGateway,
  ) {
    this.server = appGateway.server;
  }

  @ApiOperation({ summary: 'Set role to user' })
  @ApiResponse({
    status: 200,
    description: 'Role [rolename] added to user [user.email]',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiBody({ type: UserRolesRequest })
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

  @ApiOperation({ summary: 'Give premium to user' })
  @ApiResponse({
    status: 200,
    description: 'Premium added to user',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiParam({
    name: 'userId',
    description: 'users id',
    required: true,
    type: Number,
  })
  @ApiBody({ type: GivePremiumDto })
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

  @ApiOperation({ summary: 'Delete users role' })
  @ApiResponse({
    status: 200,
    description: 'Role removed from user',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiParam({
    name: 'userId',
    description: 'users id',
    required: true,
    type: Number,
  })
  @ApiParam({
    name: 'role',
    description: 'role name',
    required: true,
    type: String,
  })
  @Delete(':userId/roles/:role')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteRole(
    @Param('userId') userId: number,
    @Param('role') roleName: UserRoles,
  ) {
    const user: User = await this.userService.deleteRole(userId, roleName);
    return {
      status: HttpStatus.OK,
      message: `Роль ${roleName} снята с пользователя`,
      user,
    };
  }

  @ApiOperation({ summary: 'Remove premium from user' })
  @ApiResponse({
    status: 200,
    description: 'Premium role removed from user',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'id',
    description: 'users id',
    required: true,
    type: Number,
  })
  @Delete(':id/roles/premium')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async removeUsersPremium(@Param('id') id: number) {
    const user = await this.userService.removePremium(id);
    return { status: true, user };
  }

  @ApiOperation({ summary: 'Remove role "Premium"' })
  @ApiResponse({
    status: 200,
    description: 'Role removed from user',
  })
  @Delete('roles/premium')
  @UseGuards(CustomAuthGuard)
  async removePremium(@CurrentUser() currentUser: User) {
    const user = await this.userService.removePremium(currentUser.id);
    return { status: true, user };
  }

  @ApiOperation({ summary: 'Block user' })
  @ApiResponse({
    status: 200,
    description: 'User blocked',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'userId',
    description: 'target users id',
    required: true,
    type: Number,
  })
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

  @ApiOperation({ summary: 'Unblock user' })
  @ApiResponse({
    status: 200,
    description: 'User unblocked',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'userId',
    description: 'target users id',
    required: true,
    type: Number,
  })
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

  @ApiOperation({ summary: 'Receive users blocklist' })
  @ApiResponse({
    status: 200,
    description: 'Blocklist received',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
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

  @ApiOperation({ summary: 'Find users blacklist' })
  @ApiResponse({
    status: 200,
    description: 'Users blocklist received',
  })
  @ApiResponse({ status: 404, description: 'blocklist is empty' })
  @ApiParam({
    name: 'userId',
    description: 'users id',
    required: true,
    type: Number,
  })
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

  @ApiOperation({ summary: 'Receive all users' })
  @ApiResponse({
    status: 200,
    description: 'Users received',
  })
  @ApiResponse({ status: 404, description: 'Users not found' })
  @Get()
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getAll() {
    const users = await this.userService.receiveUser();
    return { message: 'Пользователи найдены', users };
  }

  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({
    status: 200,
    description: 'User founded',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'email',
    description: '',
    required: true,
    type: String,
  })
  @Get('email/:email')
  @UseGuards(CustomAuthGuard)
  async getUserByEmail(@Param('email') email: string) {
    const users = await this.userService.findUser('email', email);
    return { message: 'Пользователи найдены', users };
  }

  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({
    status: 200,
    description: 'User founded',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'id',
    description: 'target users id',
    required: true,
    type: Number,
  })
  @Get('id/:id')
  @UseGuards(CustomAuthGuard)
  async getUserById(@Param('id') id: number) {
    const user = await this.userService.findUser('id', id);
    return { status: HttpStatus.OK, message: 'Пользователь найден', user };
  }

  @ApiOperation({ summary: 'Get user by code' })
  @ApiResponse({
    status: 200,
    description: 'User founded',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'code',
    description: 'target users id',
    required: true,
    type: Number,
  })
  @Get('code/:code')
  async getUserByCode(@Param('code') code: number) {
    const user = await this.userService.findUser('refreshCode', code);
    if (!user) throw new NotFoundException('Неверный код');
    return { status: HttpStatus.OK, message: 'Пользователь найден', user };
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User updated',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: UpdateUserDto })
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

  @ApiOperation({ summary: 'Change users password' })
  @ApiResponse({
    status: 200,
    description: 'Password updated',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: typeof { password: String } })
  @Patch('password')
  @UseGuards(CustomAuthGuard)
  async updatePassword(
    @CurrentUser() currentUser: User,
    @Body('password') password: string,
  ) {
    await this.userService.changePassword(currentUser.id, password);
    return { status: HttpStatus.OK, message: 'Ваш пароль успешно обновлен' };
  }

  @ApiOperation({ summary: 'Update users rating' })
  @ApiResponse({
    status: 200,
    description: 'rating updated',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: typeof { userId: Number, rating: Number } })
  @Patch('rating')
  @UseGuards(CustomAuthGuard)
  async updateRating(@Body() data: { userId: number; rating: number }) {
    const user = await this.userService.changeRating(data.userId, data.rating);
    return { status: HttpStatus.OK, message: 'Рейтинг изменен', user };
  }

  @ApiOperation({ summary: 'receive memojies' })
  @ApiResponse({
    status: 200,
    description: 'Memoji uploaded',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'userId',
    description: 'target users id',
    required: true,
    type: Number,
  })
  @Get('memojies/:type')
  async getMemojies(@Param('type') type: Folder): Promise<any> {
    const images = await this.fsService.receiveImages(type);
    return { statusCode: HttpStatus.OK, images };
  }

  @ApiOperation({ summary: 'Update users photo' })
  @ApiResponse({
    status: 200,
    description: 'Photo updated',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: UpdateUserDto })
  @Patch('photo')
  @UseGuards(CustomAuthGuard)
  updatePhoto(
    @CurrentUser() currentUser: User,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.userService.update(currentUser.id, updateDto);
  }

  @ApiOperation({ summary: 'Delete users account' })
  @ApiResponse({
    status: 200,
    description: 'Users account deleted',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete('delete/account')
  @UseGuards(CustomAuthGuard)
  async deleteAccount(@CurrentUser() currentUser: User) {
    await this.userService.deleteAccount(currentUser.id);
    return { status: HttpStatus.OK, message: 'Ваш аккаунт удален успешно!' };
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'userId',
    description: 'users id',
    required: true,
    type: Number,
  })
  @Delete('delete/:userId')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteUser(@Param('userId') userId: number) {
    await this.userService.deleteAccount(userId);
    return { status: HttpStatus.OK, message: 'Пользователь успешно удален!' };
  }

  @ApiOperation({ summary: 'ban user' })
  @ApiResponse({
    status: 200,
    description: 'User banned',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: BanUserDto })
  @Patch('ban')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async banUser(@Body() dto: BanUserDto) {
    const result = await this.userService.ban(dto.userId, dto.expiresIn);
    this.server.to(`messages/${dto.userId}`).emit('SERVER:USER_BANNED');
    return { status: 200, result };
  }

  @ApiOperation({ summary: 'unban user' })
  @ApiResponse({
    status: 200,
    description: 'User unbanned',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: typeof { userId: Number } })
  @Patch('unban')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async unbanUser(@Body('userId') userId: number) {
    const result = await this.userService.unban(userId);
    return { status: 200, result };
  }

  @ApiOperation({ summary: 'receive users by age groups' })
  @ApiResponse({
    status: 200,
    description: 'Users age groups received',
  })
  @Get('data/age-groups')
  @HttpCode(200)
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getAgesGroups() {
    const users = await this.userService.receiveUser();
    return Helper.sortByAgesGroups(users);
  }

  @ApiOperation({ summary: 'recevive users by gender groups' })
  @ApiResponse({
    status: 200,
    description: 'Users gender groups received',
  })
  @Get('data/gender-groups')
  @HttpCode(200)
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getGenderGroups() {
    const menCount = await this.userService.getCountSex('male');
    const womenCount = await this.userService.getCountSex('female');

    return { men: menCount, women: womenCount };
  }

  @ApiOperation({ summary: 'receive users by geo' })
  @ApiResponse({
    status: 200,
    description: 'Users geographic groups received',
  })
  @Get('data/city-groups')
  @HttpCode(200)
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getCityGroups() {
    throw new InternalServerErrorException('Пока не работает!');
    // TODO: get users list sorted by cities and/or countries
    // return this.userService.getGeoraphic();
  }
}
