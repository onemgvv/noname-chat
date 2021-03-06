import { IAuthService } from './../interface/auth-service.interface';
import * as bcrypt from 'bcrypt';
import { Helper } from '@utils/app.helper';
import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { SocialData } from '../interface/social-data.interface';
import { SocialIds } from '@common/types/app.types';
import { User } from '@persistence/app/user/user.entity';
import { IMailService } from '@auth/interface/mail.interface';
import { IUserService } from '@domain/app/user/interface/user-service.inerface';
import { LoginUserDto } from '@api/auth/dto/login.dto';
import { CreateUserDto } from '@api/app/user/dto/create.dto';
import { ITokenService } from '@domain/app/token/interface/token-service.interface';
import { IToken } from '@auth/interface/token.interface';
import { ILogin } from '@auth/interface/login.interface';
import { MAIL_SERVICE, TOKEN_SERVICE, USER_SERVICE } from '@config/constants';

const UserService = () => Inject(USER_SERVICE);
const MailService = () => Inject(MAIL_SERVICE);
const TokenService = () => Inject(TOKEN_SERVICE);

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @UserService() private readonly userService: IUserService,
    @TokenService() private readonly tokenService: ITokenService,
    @MailService() private readonly mailService: IMailService,
  ) {}

  /**
   * Validate user
   *
   * @param payload JwtPayload
   * @returns candidate User
   *
   */
  async validateUser(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const candidate = await this.userService.findUser('email', email);
    if (!candidate) return null;

    return candidate;
  }

  async authenticate(user: User): Promise<IToken> {
    const { accessToken, refreshToken } = await this.tokenService.createTokens(
      user,
    );
    await this.tokenService.saveToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  /**
   * Login user
   *
   * @param userDto LoginUserDto
   * @returns ILogin
   *
   */
  async login(userDto: LoginUserDto): Promise<ILogin> {
    const candidate = await this.userService.checkExist(userDto.email);
    if (!candidate) {
      throw new BadRequestException('???????????????????????? ?? ?????????? email ???? ????????????!');
    }

    if (candidate.password === 'null') {
      throw new UnprocessableEntityException(
        '?????? ???????????? ???????????? ???? ??????????????????, ?????????????? ??????!',
      );
    }

    const isMatch: boolean = await bcrypt.compare(
      userDto.password,
      candidate.password,
    );

    if (!isMatch) throw new BadRequestException('?????????????????? ?????????????????? ????????????');

    const { accessToken, refreshToken } = await this.authenticate(candidate);

    return {
      accessToken,
      refreshToken,
      user: candidate,
    };
  }

  /**
   * Register user
   *
   * @param userDto CreateUserDto
   * @returns ILogin
   */
  async register(userDto: CreateUserDto): Promise<ILogin> {
    const candidate = await this.userService.checkExist(userDto.email);
    if (candidate)
      throw new BadRequestException(
        '???????????????????????? ?? ?????????? Email ?????? ????????????????????',
      );

    const hashPassword: string = await bcrypt.hash(userDto.password, 7);
    let user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });

    user = await this.setRandomName(user);
    console.log('User with name: ', user);

    const { accessToken, refreshToken } = await this.authenticate(user);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  /**
   * Fast register
   *
   * @param email string
   * @returns ILogin
   */
  async fastRegister(email: string): Promise<ILogin> {
    const candidate = await this.userService.checkExist(email);
    if (candidate) {
      throw new BadRequestException(
        '???????????????????????? ?? ?????????? Email ?????? ????????????????????',
      );
    }

    const password: string = await Helper.generatePassword(10, true);

    let user = await this.userService.create({
      email,
      password: await bcrypt.hash(password, 7),
      age: 0,
      sex: 'default',
    });

    user = await this.setRandomName(user);
    console.log('User with name: ', user);

    this.mailService.sendWelcomeMail({ email: user.email, password });

    const { accessToken, refreshToken } = await this.authenticate(user);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async loginWithSocials(
    payload: SocialData,
    socialId: SocialIds,
  ): Promise<ILogin> {
    let user: User = await this.userService.getBySocials(socialId, payload.sub);
    const userByEmail: User = await this.userService.checkExist(payload.email);

    if (!user && !userByEmail) {
      const password: string = await Helper.generatePassword(10, true);
      user = await this.userService.create({
        email: payload.email || 'change@noname.fun',
        sex: payload.sex || 'default',
        age: payload.age || 0,
        password: await bcrypt.hash(password, 7),
      });

      user = await this.userService.update(user.id, {
        [socialId]: payload.sub,
        name: payload.name || (await Helper.generateRandomName()),
        city: payload.city || null,
      });

      this.mailService.sendWelcomeMail({ email: user.email, password });
    }

    if (userByEmail) {
      user = await this.userService.update(userByEmail.id, {
        [socialId]: payload.sub,
        name: payload.name || (await Helper.generateRandomName()),
        city: payload.city || null,
      });
    }

    const { accessToken, refreshToken } = await this.authenticate(user);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  /**
   *
   * @param email string
   * @returns { status: number, message: string }
   */
  async refreshPassword(
    email: string,
  ): Promise<{ status: number; message: string }> {
    const user: User = await this.userService.checkExist(email);
    if (!user) throw new NotFoundException('???????????????????????? ???? ????????????!');

    const code = await Helper.generateRefreshCode();
    await this.userService.update(user.id, { refreshCode: code });

    this.mailService.sendRefreshMail({
      email: user.email,
      refreshCode: user.refreshCode,
    });

    return {
      status: HttpStatus.OK,
      message: '?????? ?????????????????? ?????? ???? ??????????!',
    };
  }

  async setRandomName(user: User): Promise<User> {
    const name = await Helper.generateRandomName();
    this.userService.update(user.id, { name });

    return user;
  }
}
