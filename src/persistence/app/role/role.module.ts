import { RoleRepository } from './role.repository';
import { Role } from '@persistence/app/role/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepoProvider } from './role.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleRepository], 'default')],
  providers: [RoleRepoProvider],
  exports: [RoleRepoProvider, TypeOrmModule],
})
export class RoleRepositoryModule {}
