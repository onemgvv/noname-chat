import { Token } from '@persistence/app/token/token.entity';

export interface ITokenRepository {
  newToken(userId: number, refreshToken: string): Promise<Token>;
  findByUserId(userId: number, relations?: string[]): Promise<Token>;
  save(token: Token): Promise<Token>;
  receiveAll(token: string, relations?: string[]): Promise<Token[]>;
  deleteOne(token: string): Promise<Token>;
}
