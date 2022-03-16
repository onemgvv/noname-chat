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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

const ComplaintService = () => Inject(COMPLAINT_SERVICE);

@ApiTags('Admin complaints')
@Controller('complaints')
export class ComplaintsController {
  constructor(
    @ComplaintService() private readonly complaintService: IComplaintService,
  ) {}

  @ApiOperation({ summary: 'Create new comlpaint' })
  @ApiResponse({
    status: 200,
    description: 'The comlpaint successfully created',
  })
  @ApiBody({ type: CreateComplaintsDto })
  @Post()
  @HttpCode(201)
  @Roles(RolesList.USER)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async create(@Body() complaintsDto: CreateComplaintsDto) {
    return this.complaintService.create(complaintsDto);
  }

  @ApiOperation({ summary: 'Decide comlpaint' })
  @ApiResponse({
    status: 200,
    description: 'The complaint decided',
  })
  @ApiResponse({
    status: 404,
    description: 'The bot not found in system',
  })
  @ApiParam({
    name: 'id',
    description: 'the comlpaint id',
    type: Number,
  })
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

  @ApiOperation({ summary: 'Receive all comlpaints' })
  @ApiResponse({
    status: 200,
    description: 'The complaints successfully received',
  })
  @ApiResponse({
    status: 404,
    description: 'The complaints dont exist in system',
  })
  @Get()
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard)
  async findAll() {
    return this.complaintService.findAll();
  }

  @ApiOperation({ summary: 'Receive active complaints' })
  @ApiResponse({
    status: 200,
    description: 'The active complaints found',
  })
  @ApiResponse({
    status: 404,
    description: 'In the system dont exist active complaints',
  })
  @Get('active')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard)
  async findActive() {
    return this.complaintService.findActive();
  }

  @ApiOperation({ summary: 'Receive decided complaints' })
  @ApiResponse({
    status: 200,
    description: 'The decided complaints found',
  })
  @ApiResponse({
    status: 404,
    description: 'In the system dont exist decided complaints',
  })
  @Get('decided')
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard)
  async findDecided() {
    return this.complaintService.findDecided();
  }

  @ApiOperation({ summary: 'Delete comlpaint by id' })
  @ApiResponse({
    status: 200,
    description: 'The complaint deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Complaint not found',
  })
  @ApiParam({
    name: 'id',
    description: 'the complaint id',
    type: Number,
  })
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

  @ApiOperation({ summary: 'Delete all comlpaint' })
  @ApiResponse({
    status: 200,
    description: 'The complaints deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'In the system dont exist complaints',
  })
  @Delete()
  @Roles(RolesList.ADMIN, RolesList.MODERATOR)
  @UseGuards(CustomAuthGuard)
  async clearAll(): Promise<void> {
    return this.complaintService.delete();
  }
}
