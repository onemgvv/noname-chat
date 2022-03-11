import { Complaint } from './complaint.entity';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { IComplaintRepository } from '@domain/admin/complaint/interface/complaint-repo.interface';
import { CreateComplaintsDto } from '@api/admin/complaint/dto/create.dto';

@Injectable()
@EntityRepository(Complaint)
export class ComplaintRepository
  extends Repository<Complaint>
  implements IComplaintRepository
{
  async newComplaint(data: CreateComplaintsDto): Promise<Complaint> {
    const complaint = await this.create(data);
    return this.save(complaint);
  }

  receive(): Promise<Complaint[]> {
    return this.find();
  }

  findActive(): Promise<Complaint[]> {
    return this.find({ where: { active: true } });
  }

  findDecided(): Promise<Complaint[]> {
    return this.find({ where: { active: false } });
  }

  async makeDecided(id: number): Promise<Complaint> {
    const complaint = await this.findOne(id);

    complaint.active = false;
    return this.save(complaint);
  }

  async deleteById(id: number): Promise<Complaint> {
    const complaint = await this.findOne(id);
    return this.remove(complaint);
  }
}
