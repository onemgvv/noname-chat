import { User } from '@persistence/app/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EliteRepoProvider } from './elite.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'default')],
  providers: [EliteRepoProvider],
  exports: [EliteRepoProvider],
})
export class EliteRepositoryModule {}
