import { Module } from '@nestjs/common';
import { EliteRepositoryModule } from '@persistence/app/elite/elite.module';
import { EliteServiceProvider } from './elite.provider';

@Module({
  imports: [EliteRepositoryModule],
  providers: [EliteServiceProvider],
  exports: [EliteServiceProvider],
})
export class EliteModule {}
