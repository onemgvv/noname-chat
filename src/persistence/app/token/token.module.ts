import { TokenRepository } from './token.repository';
import { Token } from '@persistence/app/token/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenRepoProvider } from './token.provider';
import { Module } from '@nestjs/common';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token, User, TokenRepository], 'default'),
  ],
  providers: [TokenRepoProvider],
  exports: [TokenRepoProvider, TypeOrmModule],
})
export class TokenRepositoryModule {}
