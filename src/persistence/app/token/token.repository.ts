import { EntityRepository, Repository } from 'typeorm';
import { Token } from '@persistence/app/token/token.entity';
import { ITokenRepository } from '@domain/app/token/interface/token-repo.interface';

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
    return this.findOneOrFail({
      where: { userId },
      relations: relations ?? this.allRelations,
    });
  }

  async receiveAll(token: string, relations?: string[]): Promise<Token[]> {
    return this.find({
      where: { refreshToken: token },
      relations: relations ?? this.allRelations,
    });
  }

  async deleteOne(token: string): Promise<Token> {
    const tokenModel = await this.findOneOrFail({
      where: { refreshToken: token },
    });

    return this.remove(tokenModel);
  }
}
