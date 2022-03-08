import { FilterRepositoryModule } from '@persistence/app/filter/filter.module';
import { Module } from '@nestjs/common';
import { FilterServiceProvider } from './filter.provider';

@Module({
  imports: [FilterRepositoryModule],
  providers: [FilterServiceProvider],
  exports: [FilterServiceProvider],
})
export class FilterModule {}
