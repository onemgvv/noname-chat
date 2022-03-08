import { MESSAGE_REPO } from '@config/constants';
import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { IMessageRepository } from './interface/message-repo.interface';
import { IMessageService } from './interface/message-service.interface';
import { Message as MessageType } from '@domain/chat/message/message.type';
import { Message } from '@persistence/chat/message/message.entity';

const MessageRepo = () => Inject(MESSAGE_REPO);

@Injectable()
export class MessageServiceImpl implements IMessageService {
  constructor(@MessageRepo() private messageRepository: IMessageRepository) {}

  create(data: Partial<MessageType>): Promise<Message> {
    return this.messageRepository.newMessage(data);
  }

  findByDialogId(dialogId: number): Promise<Message[]> {
    return this.messageRepository.findByDialogId(dialogId);
  }

  deleteByDialogId(dialogId: number): Promise<Message> {
    return this.messageRepository.deleteByDialogId(dialogId);
  }

  deleteOne(id: number): Promise<Message> {
    return this.messageRepository.deleteOne(id);
  }

  getLastMessage(dialogId: number): Promise<Message> {
    return this.messageRepository.getLastMessage(dialogId);
  }

  markAsRead(dialogId: number): Promise<Message[]> {
    return this.messageRepository.markAsRead(dialogId);
  }
}
