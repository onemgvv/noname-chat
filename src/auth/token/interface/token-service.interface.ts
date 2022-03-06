import { Token } from '@persistence/app/token/token.entity';
import { User } from '@persistence/app/user/user.entity';
import { ICreateToken } from './create.interface';
import { IToken } from './token.interface';

export interface ITokenService {
  validateToken(token: string): Promise<User | boolean>;
  createTokens(user: ICreateToken): Promise<IToken>;
  saveToken(userId: number, refreshToken: string): Promise<Token>;
  getUserByToken(token: string): Promise<User>;
}
