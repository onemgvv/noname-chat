import { Repository } from 'typeorm';
import { Token } from '@persistence/app/token/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ITokenRepository } from '@auth/token/interface/token-repo.interface';

@Injectable()
export class TokenRepository implements ITokenRepository {
  private allRelations = ['users'];

  constructor(@InjectRepository(Token) private tokenModel: Repository<Token>) {}

  async create(userId: number, refreshToken: string): Promise<Token> {
    const token = await this.tokenModel.findOne({ where: { userId } });

    if (token) {
      token.refreshToken = refreshToken;
      return this.tokenModel.save(token);
    }

    const newToken = await this.tokenModel.create({ userId, refreshToken });
    return this.tokenModel.save(newToken);
  }

  async findByUserId(userId: number, relations?: string[]): Promise<Token> {
    return this.tokenModel.findOneOrFail({
      where: { userId },
      relations: relations ?? this.allRelations,
    });
  }

  async save(token: Token): Promise<Token> {
    return this.tokenModel.save(token);
  }

  async find(token: string, relations?: string[]): Promise<Token[]> {
    return this.tokenModel.find({
      where: { refreshToken: token },
      relations: relations ?? this.allRelations,
    });
  }

  async remove(token: string): Promise<Token> {
    const tokenModel = await this.tokenModel.findOneOrFail({
      where: { refreshToken: token },
    });

    return this.tokenModel.remove(tokenModel);
  }
}
