import { CityRepoProvider } from './city.provider';
import { ADMIN_CONNECTION } from '@config/constants';
import { CityRepository } from './city.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { City } from './city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, CityRepository], ADMIN_CONNECTION)],
  providers: [CityRepoProvider],
  exports: [CityRepoProvider],
})
export class CityRepositoryModule {}
