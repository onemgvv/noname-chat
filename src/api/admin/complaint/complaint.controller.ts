import { COMPLAINT_SERVICE } from '@config/constants';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CustomAuthGuard } from '@common/guards/custom-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { Roles } from '@common/decorators/roles.decorator';
import { RolesList } from '@enums/roles.enum';
import { CreateComplaintsDto } from './dto/create.dto';
import { IComplaintService } from '@domain/admin/complaint/interface/complaint-service.interface';

const ComplaintService = () => Inject(COMPLAINT_SERVICE);

@Controller('complaints')
export class ComplaintsController {
  constructor(
    @ComplaintService() private readonly complaintService: IComplaintService,
  ) {}

  @Post()
  @HttpCode(201)
  @Roles(RolesList.USER)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async create(@Body() complaintsDto: CreateComplaintsDto) {
    return this.complaintService.create(complaintsDto);
  }

  @Patch(':id')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard)
  async decideComplaint(@Param('id') complaintId: number) {
    const complaint = await this.complaintService.makeDecided(complaintId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Жалоба рассмотрена',
      complaint,
    };
  }

  @Get()
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard)
  async findAll() {
    return this.complaintService.findAll();
  }

  @Get('active')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard)
  async findActive() {
    return this.complaintService.findActive();
  }

  @Get('decided')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard)
  async findDecided() {
    return this.complaintService.findDecided();
  }

  @Delete(':id')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard)
  async deleteById(@Param('id') id: number) {
    await this.complaintService.deleteById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Жалоба удалена!',
    };
  }

  @Delete()
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard)
  async clearAll(): Promise<void> {
    return this.complaintService.delete();
  }
}
