import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Tariff } from './tariff.entity';
import { TariffRepository } from './tariff.repository';
import { ADMIN_CONNECTION } from '@config/constants';
import { TariffRepoProvider } from './tariff.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tariff, TariffRepository], ADMIN_CONNECTION),
  ],
  providers: [TariffRepoProvider],
  exports: [TariffRepoProvider],
})
export class TariffRepositoryModule {}
