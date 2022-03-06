import { Token } from '@persistence/app/token/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenRepoProvider } from './token.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Token], 'default')],
  providers: [TokenRepoProvider],
  exports: [TokenRepoProvider],
})
export class TokenRepositoryModule {}
