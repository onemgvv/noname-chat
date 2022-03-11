import { CountryRepository } from './country.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Country } from './country.entity';
import { ADMIN_CONNECTION } from '@config/constants';
import { CountryRepoProvider } from './country.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, CountryRepository], ADMIN_CONNECTION),
  ],
  providers: [CountryRepoProvider],
  exports: [CountryRepoProvider],
})
export class CountryRepositoryModule {}
