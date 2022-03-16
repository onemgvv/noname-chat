import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateDialogDto } from './dto/create.dto';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { DIALOG_SERVICE } from '@config/constants';
import { IDialogService } from '@domain/chat/dialog/interface/dialog-service.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FindDialogDto } from './dto/find.dto';
import { Dialog } from '@persistence/chat/dialog/dialog.entity';

const DialogService = () => Inject(DIALOG_SERVICE);

@ApiTags('Chat dialog')
@Controller('chat/dialogs')
export class DialogController {
  constructor(@DialogService() private dialogService: IDialogService) {}

  @ApiOperation({ summary: 'Create dialog' })
  @ApiResponse({ status: 201, description: 'Dialog created successfully' })
  @ApiBody({ type: CreateDialogDto })
  @Post()
  @HttpCode(201)
  @UseInterceptors(new TransformInterceptor(CreateDialogDto))
  async create(@Body() dialogDto: CreateDialogDto): Promise<FindDialogDto> {
    return this.dialogService.create(dialogDto);
  }

  @ApiOperation({ summary: 'Find dialogs by author' })
  @ApiResponse({ status: 200, description: 'Dialogs found by author' })
  @ApiResponse({ status: 404, description: 'Dialogs not found' })
  @ApiParam({
    name: 'id',
    description: 'users id',
    type: Number,
    required: true,
  })
  @Get('user/:id')
  async findByUserId(
    @Param('id') userId: number,
  ): Promise<FindDialogDto[] | void> {
    return this.dialogService.findByAuthor(userId);
  }

  @ApiOperation({ summary: 'Find dialog by id' })
  @ApiResponse({ status: 200, description: 'Dialog found' })
  @ApiResponse({ status: 404, description: 'Dialog not found' })
  @ApiParam({
    name: 'id',
    description: 'dialog id',
    type: Number,
    required: true,
  })
  @Get(':id')
  async findById(@Param('id') dialogId: number): Promise<FindDialogDto> {
    return this.dialogService.findOne(dialogId);
  }

  @ApiOperation({ summary: 'Delete dialog by id' })
  @ApiResponse({ status: 200, description: 'Dialog deleted successfully' })
  @ApiResponse({ status: 404, description: 'Dialog not found' })
  @ApiParam({
    name: 'id',
    description: 'dialog id',
    type: Number,
    required: true,
  })
  @Delete(':id')
  async deleteById(@Param('id') dialogId: number): Promise<Dialog> {
    return this.dialogService.deleteOne(dialogId);
  }
}
