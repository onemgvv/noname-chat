import { Filter } from '@persistence/app/filter/filter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterRepoProvider } from './filter.provider';
import { Module } from '@nestjs/common';
import { FilterRepository } from './filter.repository';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Filter, User, FilterRepository], 'default'),
  ],
  providers: [FilterRepoProvider],
  exports: [FilterRepoProvider, TypeOrmModule],
})
export class FilterRepositoryModule {}
