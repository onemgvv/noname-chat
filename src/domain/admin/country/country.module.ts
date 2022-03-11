import { Module } from '@nestjs/common';
import { CountryRepositoryModule } from '@persistence/admin/country/country.module';
import { CountryServiceProvider } from './country.provider';

@Module({
  imports: [CountryRepositoryModule],
  providers: [CountryServiceProvider],
  exports: [CountryServiceProvider],
})
export class CountryModule {}
