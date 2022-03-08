import { BlacklistRepository } from './blacklist.repository';
import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistRepoProvider } from './blacklist.provider';
import { Module } from '@nestjs/common';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blacklist, User, BlacklistRepository], 'default'),
  ],
  providers: [BlacklistRepoProvider],
  exports: [BlacklistRepoProvider, TypeOrmModule],
})
export class BlacklistRepositoryModule {}
