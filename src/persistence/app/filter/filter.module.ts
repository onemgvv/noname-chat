import { Filter } from '@persistence/app/filter/filter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterRepoProvider } from './filter.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Filter], 'default')],
  providers: [FilterRepoProvider],
  exports: [FilterRepoProvider],
})
export class FilterRepositoryModule {}
