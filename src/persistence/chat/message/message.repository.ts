import { Repository } from 'typeorm';
import { Message } from '@persistence/chat/message/message.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateMessage } from './interface/create.interface';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(Message) private messageModel: Repository<Message>,
  ) {}

  async create(data: ICreateMessage): Promise<Message> {
    const message = await this.messageModel.create(data);
    return this.messageModel.save(message);
  }

  async findByDialogId(dialogId: number): Promise<Message[]> {
    return this.messageModel.find({ where: { dialogId } });
  }

  async deleteByDialogId(dialogId: number): Promise<Message> {
    const message = await this.messageModel.findOneOrFail({
      where: { dialogId },
    });
    return this.messageModel.remove(message);
  }

  async delete(id: number): Promise<Message> {
    const message = await this.messageModel.findOneOrFail(id);
    return this.messageModel.remove(message);
  }

  async getLastMessage(dialogId: number): Promise<Message> {
    return this.messageModel.findOne({
      where: { dialogId },
      order: { created_at: 'DESC' },
    });
  }

  async markAsRead(dialogId: number): Promise<Message[]> {
    const messages = await this.messageModel.find({
      where: { dialogId, read: false },
    });

    messages.forEach((message) => {
      message.read = true;
    });

    return this.messageModel.save(messages);
  }
}
