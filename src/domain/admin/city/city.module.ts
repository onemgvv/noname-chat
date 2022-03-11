import { CityServiceProvider } from './city.provider';
import { Module } from '@nestjs/common';
import { CityRepositoryModule } from '@persistence/admin/city/city.module';

@Module({
  imports: [CityRepositoryModule],
  providers: [CityServiceProvider],
  exports: [CityServiceProvider],
})
export class CityModule {}
