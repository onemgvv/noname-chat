import { CreateComplaintsDto } from '@api/admin/complaint/dto/create.dto';
import { Complaint } from '@persistence/admin/complaint/complaint.entity';

export interface IComplaintService {
  create(complaintsDto: CreateComplaintsDto): Promise<Complaint>;
  findAll(): Promise<Complaint[]>;
  findActive(): Promise<Complaint[]>;
  findDecided(): Promise<Complaint[]>;
  makeDecided(id: number): Promise<Complaint>;
  deleteById(id: number): Promise<Complaint>;
  delete(): Promise<void>;
}
