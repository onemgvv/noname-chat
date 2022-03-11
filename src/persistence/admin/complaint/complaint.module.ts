import { ComplaintRepository } from './complaint.repository';
import { Complaint } from './complaint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ADMIN_CONNECTION } from '@config/constants';
import { ComplaintRepoProvider } from './complaint.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Complaint, ComplaintRepository],
      ADMIN_CONNECTION,
    ),
  ],
  providers: [ComplaintRepoProvider],
  exports: [ComplaintRepoProvider],
})
export class ComplaintRepositoryModule {}
