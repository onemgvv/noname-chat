import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistRepoProvider } from './blacklist.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Blacklist], 'default')],
  providers: [BlacklistRepoProvider],
  exports: [BlacklistRepoProvider],
})
export class BlacklistRepositoryModule {}
