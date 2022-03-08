import { Module } from '@nestjs/common';
import { TokenRepositoryModule } from '@persistence/app/token/token.module';
import { TokenServiceProvider } from './token.provider';
import { JwtModule } from '@nestjs/jwt';
import { UserRepositoryModule } from '@persistence/app/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    UserRepositoryModule,
    TokenRepositoryModule,
  ],
  providers: [TokenServiceProvider],
  exports: [TokenServiceProvider],
})
export class TokenModule {}
