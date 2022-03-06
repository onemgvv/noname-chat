import { IToken } from './token.interface';
import { User } from '@persistence/app/user/user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { ILogin } from './login.interface';
import { LoginUserDto } from '@api/auth/dto/login.dto';
import { CreateUserDto } from '@api/app/user/dto/create.dto';
import { SocialData } from './social-data.interface';
import { SocialIds } from '@common/types/app.types';

export interface IAuthService {
  validateUser(payload: JwtPayload): Promise<User>;
  authenticate(user: User): Promise<IToken>;
  login(userDto: LoginUserDto): Promise<ILogin>;
  register(userDto: CreateUserDto): Promise<ILogin>;
  fastRegister(email: string): Promise<ILogin>;
  loginWithSocials(payload: SocialData, socialId: SocialIds): Promise<ILogin>;
  refreshPassword(email: string): Promise<{ status: number; message: string }>;
  setRandomName(user: User): Promise<User>;
}
