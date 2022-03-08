import { Repository, EntityRepository } from 'typeorm';
// import { Message as MessageType } from '@domain/chat/message/message.type';
import { Message } from '@persistence/chat/message/message.entity';
import { IMessageRepository } from '@domain/chat/message/interface/message-repo.interface';
import { Message as MessageType } from '@domain/chat/message/message.type';

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
    return this.find({ where: { dialogId } });
  }

  async deleteByDialogId(dialogId: number): Promise<Message> {
    const message = await this.findOneOrFail({
      where: { dialogId },
    });
    return this.remove(message);
  }

  async deleteOne(id: number): Promise<Message> {
    const message = await this.findOneOrFail(id);
    return this.remove(message);
  }

  async getLastMessage(dialogId: number): Promise<Message> {
    return this.findOne({
      where: { dialogId },
      order: { created_at: 'DESC' },
    });
  }

  async markAsRead(dialogId: number): Promise<Message[]> {
    const messages = await this.find({
      where: { dialogId, read: false },
    });

    messages.forEach((message) => {
      message.read = true;
    });

    return this.save(messages);
  }
}
