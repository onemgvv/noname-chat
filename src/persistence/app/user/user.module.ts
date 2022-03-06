import { User } from '@persistence/app/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepoProvider } from './user.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'default')],
  providers: [UserRepoProvider],
  exports: [UserRepoProvider],
})
export class UserRepositoryModule {}
