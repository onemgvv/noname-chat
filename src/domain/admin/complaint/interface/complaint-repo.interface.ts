import { CreateComplaintsDto } from '@api/admin/complaint/dto/create.dto';
import { Complaint } from '@persistence/admin/complaint/complaint.entity';
import { Repository } from 'typeorm';

export interface IComplaintRepository extends Repository<Complaint> {
  newComplaint(data: CreateComplaintsDto): Promise<Complaint>;
  receive(): Promise<Complaint[]>;
  findActive(): Promise<Complaint[]>;
  findDecided(): Promise<Complaint[]>;
  makeDecided(id: number): Promise<Complaint>;
  deleteById(id: number): Promise<Complaint>;
}
