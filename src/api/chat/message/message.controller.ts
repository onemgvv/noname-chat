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
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Message } from '@persistence/chat/message/message.entity';
import { CreateMessageDto } from './dto/create.dto';

const DialogService = () => Inject(DIALOG_SERVICE);
const MessageService = () => Inject(MESSAGE_SERVICE);

@ApiTags('Chat messages')
@Controller('chat/messages')
export class MessageController {
  constructor(
    @DialogService() private dialogService: IDialogService,
    @MessageService() private messageService: IMessageService,
  ) {}

  @ApiResponse({ status: 201, description: 'Messages created successfully' })
  @ApiBody({ type: CreateMessageDto })
  @Post()
  @HttpCode(201)
  @UseInterceptors(new TransformInterceptor(CreateMessageDto))
  async create(@Body() messageDto: CreateMessageDto): Promise<Message> {
    const message: Message = await this.messageService.create(messageDto);
    await this.dialogService.setLastMessage(messageDto.dialogId, message.id);
    return message;
  }

  @ApiResponse({ status: 200, description: 'Messages found' })
  @ApiResponse({ status: 404, description: 'Messages not found' })
  @ApiParam({
    name: 'id',
    description: 'dialogs id',
    type: Number,
    required: true,
  })
  @Get('dialog/:id')
  async findByDialog(@Param('id') dialogId: number): Promise<Message[]> {
    return this.messageService.findByDialogId(dialogId);
  }

  @ApiResponse({ status: 200, description: 'Message deleted' })
  @ApiResponse({ status: 404, description: 'Messages not found' })
  @ApiParam({
    name: 'id',
    description: 'message id',
    type: Number,
    required: true,
  })
  @Delete(':id')
  async deleteById(@Param('id') messageId: number): Promise<Message> {
    return this.messageService.deleteOne(messageId);
  }

  @ApiResponse({ status: 200, description: 'Messages deleted' })
  @ApiResponse({ status: 404, description: 'Dialog not found' })
  @ApiResponse({ status: 404, description: 'Messages not found' })
  @ApiParam({
    name: 'id',
    description: 'dialogs id',
    type: Number,
    required: true,
  })
  @Delete('dialog/:id')
  async deleteByDialog(@Param('id') dialogId: number): Promise<Message> {
    return this.messageService.deleteByDialogId(dialogId);
  }
}
