import { IComplaintRepository } from '@domain/admin/complaint/interface/complaint-repo.interface';
import { COMPLAINT_REPO } from '@config/constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IComplaintService } from './interface/complaint-service.interface';
import { CreateComplaintsDto } from '@api/admin/complaint/dto/create.dto';
import { Complaint } from '@persistence/admin/complaint/complaint.entity';

const ComplaintRepo = () => Inject(COMPLAINT_REPO);

@Injectable()
export class ComplaintServiceImpl implements IComplaintService {
  constructor(
    @ComplaintRepo() private complaintRepository: IComplaintRepository,
  ) {}

  async create(complaintsDto: CreateComplaintsDto): Promise<Complaint> {
    return this.complaintRepository.newComplaint(complaintsDto);
  }

  async findAll(): Promise<Complaint[]> {
    const complaints = await this.complaintRepository.find();
    if (complaints.length === 0) throw new NotFoundException('TODO: constants');

    return complaints;
  }

  async findActive(): Promise<Complaint[]> {
    const active = await this.complaintRepository.find({
      where: { active: true },
    });
    if (!active) throw new NotFoundException('');

    return active;
  }

  async findDecided(): Promise<Complaint[]> {
    const decided = await this.complaintRepository.find({
      where: { active: false },
    });
    if (!decided) throw new NotFoundException('Нет закрытых жалоб!');

    return decided;
  }

  async makeDecided(id: number): Promise<Complaint> {
    const complaint: Complaint = await this.complaintRepository.findOne({
      where: { id, active: true },
    });
    if (!complaint)
      throw new NotFoundException('Жалоба не найдена или уже решена');

    complaint.active = false;
    return complaint.save();
  }

  async deleteById(id: number): Promise<Complaint> {
    const complaint = await this.complaintRepository.findOne(id);
    if (!complaint) throw new NotFoundException('Жалоба уже удалена!');

    return complaint.remove();
  }

  async delete(): Promise<void> {
    return this.complaintRepository.clear();
  }
}
