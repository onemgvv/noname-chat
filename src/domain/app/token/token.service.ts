import { ITokenRepository } from '@domain/app/token/interface/token-repo.interface';
import { Token } from '@persistence/app/token/token.entity';
import { ICreateToken } from './interface/create.interface';
import { IToken } from '@auth/interface/token.interface';
import { User } from '@persistence/app/user/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '@domain/app/user/interface/user-repo.interface';
import { ITokenService } from './interface/token-service.interface';
import { TOKEN_REPO, USER_REPO } from '@config/constants';

const TokenRepo = () => Inject(TOKEN_REPO);
const UserRepo = () => Inject(USER_REPO);

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    @TokenRepo() private readonly tokenRepository: ITokenRepository,
    @UserRepo() private readonly userRepository: IUserRepository,
  ) {}

  async validateToken(token: string): Promise<User | boolean> {
    return (await this.jwtService.verify(token, {
      secret: process.env.PRIVATE_KEY,
    })) as User;
  }

  async createTokens(user: ICreateToken): Promise<IToken> {
    const payload = {
      id: user.id,
      email: user.email,
    };

    // this.tokenRepository.

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.PRIVATE_KEY,
      expiresIn: '24h',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.PRIVATE_KEY,
      expiresIn: '60d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: number, refreshToken: string): Promise<Token> {
    const token: Token = await this.tokenRepository.findByUserId(userId);
    if (token) {
      token.refreshToken = refreshToken;
      return this.tokenRepository.save(token);
    }

    return this.tokenRepository.newToken(userId, refreshToken);
  }

  async getUserByToken(token: string): Promise<User> {
    return this.userRepository.findByToken(token);
  }
}
