import { User } from '@persistence/app/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepoProvider } from './user.provider';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository], 'default')],
  providers: [UserRepoProvider],
  exports: [UserRepoProvider, TypeOrmModule],
})
export class UserRepositoryModule {}
