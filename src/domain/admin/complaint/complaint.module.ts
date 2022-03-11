import { Module } from '@nestjs/common';
import { ComplaintRepositoryModule } from '@persistence/admin/complaint/complaint.module';
import { ComplaintServiceProvider } from './complaint.provider';

@Module({
  imports: [ComplaintRepositoryModule],
  providers: [ComplaintServiceProvider],
  exports: [ComplaintServiceProvider],
})
export class ComplaintModule {}
