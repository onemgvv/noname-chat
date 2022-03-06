import { Token } from '@persistence/app/token/token.entity';

export interface ITokenRepository {
  create(userId: number, refreshToken: string): Promise<Token>;
  findByUserId(userId: number, relations?: string[]): Promise<Token>;
  save(token: Token): Promise<Token>;
  find(token: string, relations?: string[]): Promise<Token[]>;
  remove(token: string): Promise<Token>;
}
