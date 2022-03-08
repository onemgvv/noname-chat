import { EliteRepository } from './elite.repository';
import { User } from '@persistence/app/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EliteRepoProvider } from './elite.provider';
import { Module } from '@nestjs/common';
import { Elite } from './elite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Elite, EliteRepository], 'default'),
  ],
  providers: [EliteRepoProvider],
  exports: [EliteRepoProvider, TypeOrmModule],
})
export class EliteRepositoryModule {}
