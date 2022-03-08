import { Message as MessageType } from '@domain/chat/message/message.type';
import { Message } from '@persistence/chat/message/message.entity';

export interface IMessageService {
  create(data: Partial<MessageType>): Promise<Message>;
  findByDialogId(dialogId: number): Promise<Message[]>;
  deleteByDialogId(dialogId: number): Promise<Message>;
  deleteOne(id: number): Promise<Message>;
  getLastMessage(dialogId: number): Promise<Message>;
  markAsRead(dialogId: number): Promise<Message[]>;
}
