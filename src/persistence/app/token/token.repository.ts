import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Token } from '@persistence/app/token/token.entity';
import { ITokenRepository } from '@domain/app/token/interface/token-repo.interface';
import { TOKENS_NOT_FOUND, TOKEN_NOT_FOUND } from '@config/constants';

@EntityRepository(Token)
export class TokenRepository
  extends Repository<Token>
  implements ITokenRepository
{
  private allRelations = ['users'];

  async newToken(userId: number, refreshToken: string): Promise<Token> {
    const token = await this.findOne({ where: { userId } });

    if (token) {
      token.refreshToken = refreshToken;
      return this.save(token);
    }

    const newToken = await this.create({ userId, refreshToken });
    return this.save(newToken);
  }

  async findByUserId(userId: number, relations?: string[]): Promise<Token> {
    let token: Token;
    try {
      token = await this.findOneOrFail({
        where: { userId },
        relations: relations ?? this.allRelations,
      });
    } catch (error) {
      throw new NotFoundException(TOKEN_NOT_FOUND);
    }
    return token;
  }

  async receiveAll(token: string, relations?: string[]): Promise<Token[]> {
    const tokens: Token[] = await this.find({
      where: { refreshToken: token },
      relations: relations ?? this.allRelations,
    });
    if (tokens.length === 0) throw new NotFoundException(TOKENS_NOT_FOUND);

    return tokens;
  }

  async deleteOne(token: string): Promise<Token> {
    let tokenModel: Token;
    try {
      tokenModel = await this.findOneOrFail({
        where: { refreshToken: token },
      });
    } catch (error) {
      throw new NotFoundException(TOKEN_NOT_FOUND);
    }

    return this.remove(tokenModel);
  }
}
