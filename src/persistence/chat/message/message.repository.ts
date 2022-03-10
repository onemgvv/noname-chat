import { NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { Message } from '@persistence/chat/message/message.entity';
import { IMessageRepository } from '@domain/chat/message/interface/message-repo.interface';
import { Message as MessageType } from '@domain/chat/message/message.type';
import { DIALOG_HAVENT_MESSAGES, MESSAGES_NOT_FOUND } from '@config/constants';

@EntityRepository(Message)
export class MessageRepository
  extends Repository<Message>
  implements IMessageRepository
{
  async newMessage(data: Partial<MessageType>): Promise<Message> {
    const message = await this.create(data);
    return this.save(message);
  }

  async findByDialogId(dialogId: number): Promise<Message[]> {
    const messages = await this.find({ where: { dialogId } });
    if (messages.length === 0)
      throw new NotFoundException(DIALOG_HAVENT_MESSAGES);

    return messages;
  }

  async deleteByDialogId(dialogId: number): Promise<Message> {
    let message: Message;
    try {
      message = await this.findOneOrFail({
        where: { dialogId },
      });
    } catch (error) {
      throw new NotFoundException(MESSAGES_NOT_FOUND);
    }

    return this.remove(message);
  }

  async deleteOne(id: number): Promise<Message> {
    let message: Message;
    try {
      message = await this.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(MESSAGES_NOT_FOUND);
    }
    return this.remove(message);
  }

  async getLastMessage(dialogId: number): Promise<Message> {
    let message: Message;
    try {
      message = await this.findOneOrFail({
        where: { dialogId },
        order: { created_at: 'DESC' },
      });
    } catch (error) {
      throw new NotFoundException(MESSAGES_NOT_FOUND);
    }

    return message;
  }

  async markAsRead(dialogId: number): Promise<Message[]> {
    const messages = await this.find({
      where: { dialogId, read: false },
    });
    if (messages.length === 0) throw new NotFoundException(MESSAGES_NOT_FOUND);

    messages.forEach((message) => {
      message.read = true;
    });

    return this.save(messages);
  }
}
