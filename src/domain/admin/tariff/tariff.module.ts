import { Module } from '@nestjs/common';
import { TariffRepositoryModule } from '@persistence/admin/tariff/tariff.module';
import { TariffServiceProvider } from './tariff.provider';

@Module({
  imports: [TariffRepositoryModule],
  providers: [TariffServiceProvider],
  exports: [TariffServiceProvider],
})
export class TariffModule {}
