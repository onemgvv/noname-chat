import { Module } from '@nestjs/common';
import { TokenService } from '@auth/token/token.service';
import { TokenRepositoryModule } from '@persistence/app/token/token.module';
import { TokenServiceProvider } from './token.provider';

@Module({
  imports: [TokenRepositoryModule],
  providers: [TokenService, TokenServiceProvider],
  exports: [TokenServiceProvider],
})
export class TokenModule {}
