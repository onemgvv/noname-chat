import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { DIALOG_SERVICE, MESSAGE_SERVICE } from '@config/constants';
import { IDialogService } from '@domain/chat/dialog/interface/dialog-service.interface';
import { IMessageService } from '@domain/chat/message/interface/message-service.interface';
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
import { Message } from '@persistence/chat/message/message.entity';
import { CreateMessageDto } from './dto/create.dto';

const DialogService = () => Inject(DIALOG_SERVICE);
const MessageService = () => Inject(MESSAGE_SERVICE);

@Controller('chat/messages')
export class MessageController {
  constructor(
    @DialogService() private dialogService: IDialogService,
    @MessageService() private messageService: IMessageService,
  ) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(new TransformInterceptor(CreateMessageDto))
  async create(@Body() messageDto: CreateMessageDto): Promise<Message> {
    const message: Message = await this.messageService.create(messageDto);
    await this.dialogService.setLastMessage(messageDto.dialogId, message.id);
    return message;
  }

  @Get('dialog/:id')
  async findByDialog(@Param('id') dialogId: number): Promise<Message[]> {
    return this.messageService.findByDialogId(dialogId);
  }

  @Delete(':id')
  async deleteById(@Param('id') messageId: number): Promise<Message> {
    return this.messageService.deleteOne(messageId);
  }

  @Delete('dialog/:id')
  async deleteByDialog(@Param('id') dialogId: number): Promise<Message> {
    return this.messageService.deleteByDialogId(dialogId);
  }
}
