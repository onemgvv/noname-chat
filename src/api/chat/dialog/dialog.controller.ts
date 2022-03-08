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

@Controller('chat/dialogs')
export class DialogController {
  constructor(@DialogService() private dialogService: IDialogService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(new TransformInterceptor(CreateDialogDto))
  async create(@Body() dialogDto: CreateDialogDto): Promise<FindDialogDto> {
    return this.dialogService.create(dialogDto);
  }

  @Get('user/:id')
  async findByUserId(
    @Param('id') userId: number,
  ): Promise<FindDialogDto[] | void> {
    return this.dialogService.findByAuthor(userId);
  }

  @Get(':id')
  async findById(@Param('id') dialogId: number): Promise<FindDialogDto> {
    return this.dialogService.findOne(dialogId);
  }

  @Delete(':id')
  async deleteById(@Param('id') dialogId: number): Promise<Dialog> {
    return this.dialogService.deleteOne(dialogId);
  }
}
