import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { ISocialAuthService } from '@auth/interface/sauth-service.interface';
import { IAuthService } from '@auth/interface/auth-service.interface';
import { LoginUserDto } from '@api/auth/dto/login.dto';
import { CreateUserDto } from '@api/app/user/dto/create.dto';
import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  HttpCode,
  BadRequestException,
  Patch,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from '@persistence/app/user/user.entity';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { FastRegisterDto } from './dto/fast-register.dto';
import { VKAuthDto } from './dto/vk-auth.dto';
import { AppleLoginDto } from './dto/apple-login.dto';
import { AppleSignDto } from './dto/apple-sign.dto';
import { IUserService } from '@domain/app/user/interface/user-service.inerface';
import {
  AUTH_SERVICE,
  SOC_AUTH_SERVICE,
  USER_SERVICE,
} from '@config/constants';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshPassword } from './dto/refresh-password.dto';

const UserService = () => Inject(USER_SERVICE);
const AuthService = () => Inject(AUTH_SERVICE);
const SocAuthService = () => Inject(SOC_AUTH_SERVICE);

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    @AuthService() private authService: IAuthService,
    @SocAuthService() private socialAuthService: ISocialAuthService,
    @UserService() private userService: IUserService,
  ) {}

  @ApiResponse({ status: 200, description: 'User logged successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: LoginUserDto })
  @Post('login')
  @HttpCode(200)
  @UseInterceptors(new TransformInterceptor(LoginUserDto))
  async login(@Res() response: Response, @Body() userDto: LoginUserDto) {
    const result = await this.authService.login(userDto);
    const { refreshToken, accessToken, user } = result;

    return response
      .cookie('access_token', accessToken)
      .cookie('refresh_token', refreshToken)
      .json({ message: 'Успешно авторизован!', user });
  }

  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'User already exist in system' })
  @ApiBody({ type: CreateUserDto })
  @Post('register/standard')
  @HttpCode(201)
  @UseInterceptors(new TransformInterceptor(CreateUserDto))
  async register(@Res() response: Response, @Body() userDto: CreateUserDto) {
    const result = await this.authService.register(userDto);
    const { refreshToken, accessToken, user } = result;

    return response
      .cookie('access_token', accessToken)
      .cookie('refresh_token', refreshToken)
      .json({ message: 'Ваш аккаунт был создан успешно!', user });
  }

  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'User already exist in system' })
  @ApiBody({ type: FastRegisterDto })
  @Post('register/fast')
  @HttpCode(201)
  @UseInterceptors(new TransformInterceptor(FastRegisterDto))
  async fastRegister(@Res() response: Response, @Body() dto: FastRegisterDto) {
    const result = await this.authService.fastRegister(dto.email);
    const { refreshToken, accessToken, user } = result;

    return response
      .cookie('access_token', accessToken)
      .cookie('refresh_token', refreshToken)
      .json({ message: 'Вы успешно прошли быструю регистрацию!', user });
  }

  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiBody({ type: typeof { id_token: String } })
  @Post('google')
  @HttpCode(201)
  async google(@Res() response: Response, @Body('id_token') token: string) {
    console.log(token);
    const googleUser = await this.socialAuthService.receiveGoogleUser(token);
    const result = await this.authService.loginWithSocials(
      {
        sub: googleUser.sub,
        email: googleUser.email,
        name: googleUser.given_name,
      },
      'googleId',
    );
    const { accessToken, refreshToken, user } = result;

    return response
      .cookie('access_token', accessToken)
      .cookie('refresh_token', refreshToken)
      .json({ message: 'Вы успешно авторизовались!', user });
  }

  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiBody({ type: AppleLoginDto })
  @Post('apple')
  @HttpCode(201)
  @UseInterceptors(new TransformInterceptor(AppleLoginDto))
  async apple(@Res() response: Response, @Body() loginData: AppleLoginDto) {
    const appleUser = await this.socialAuthService.receiveAppleUser(loginData);
    const result = await this.authService.loginWithSocials(
      {
        sub: appleUser.sub,
        email: appleUser.email,
      },
      'appleId',
    );
    const { accessToken, refreshToken, user } = result;

    return response
      .cookie('access_token', accessToken)
      .cookie('refresh_token', refreshToken)
      .json({ message: 'Вы успешно авторизовались!', user });
  }

  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiBody({ type: AppleSignDto })
  @Post('apple/mobile')
  @HttpCode(201)
  @UseInterceptors(new TransformInterceptor(AppleSignDto))
  async appleMobile(
    @Res() response: Response,
    @Body() appleSignDto: AppleSignDto,
  ) {
    const appleUId = appleSignDto.user.split('.').pop();
    const result = await this.authService.loginWithSocials(
      {
        sub: appleUId,
        email: appleSignDto.email,
      },
      'appleId',
    );

    const { accessToken, refreshToken, user } = result;
    return response
      .cookie('access_token', accessToken)
      .cookie('refresh_token', refreshToken)
      .json({ message: 'Вы успешно авторизовались!', user });
  }

  @ApiBody({ type: VKAuthDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @Post('vkontakte')
  @HttpCode(201)
  @UseInterceptors(new TransformInterceptor(VKAuthDto))
  async vkontakte(@Res() response: Response, @Body() data: VKAuthDto) {
    const { userId, email, profile } =
      await this.socialAuthService.receiveVkUser(data.token, data.platform);
    const bYear = Number(profile.bdate.split('.')[2]);
    const result = await this.authService.loginWithSocials(
      {
        sub: userId.toString(),
        email: email,
        age: new Date().getFullYear() - bYear,
        sex: profile.sex === 2 ? 'male' : 'female',
        city: profile.city.title,
        name: profile.first_name,
      },
      'vkId',
    );
    const { accessToken, refreshToken, user } = result;

    return response
      .cookie('access_token', accessToken)
      .cookie('refresh_token', refreshToken)
      .json({ message: 'Вы успешно авторизовались!', user });
  }

  @ApiResponse({
    status: 201,
    description: 'User refresh code created successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: String })
  @Post('restore')
  @HttpCode(200)
  async refreshPassword(@Body() data: RefreshPassword) {
    const result = await this.authService.refreshPassword(data.email);
    return result;
  }

  @ApiResponse({
    status: 201,
    description: 'User password updated successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: RestorePasswordDto })
  @Patch('restore')
  @HttpCode(200)
  async changePass(@Body() restoreData: RestorePasswordDto) {
    const { code, password, rPassword } = restoreData;
    const currentUser: User = await this.userService.findUser(
      'refreshCode',
      code,
    );

    if (!password || !rPassword)
      throw new BadRequestException('Все поля обязательны!');
    if (password !== rPassword)
      throw new BadRequestException('Пароли не сопадают!');

    const isMatch: boolean = currentUser.refreshCode === code;
    if (!isMatch) throw new BadRequestException('Неверный код!');

    await this.userService.update(currentUser.id, { password });
    return { status: HttpStatus.OK, message: 'Вы успешно сменили пароль!' };
  }
}
