import { IFindDialog } from './interface/find.interface';
import { Message } from '@persistence/chat/message/message.entity';
import { MessageRepository } from '@persistence/chat/message/message.repository';
import { Repository } from 'typeorm';
import { Dialog } from '@persistence/chat/dialog/dialog.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@persistence/app/user/user.entity';
import { UserRepository } from '@persistence/app/user/user.repository';
import { ICreateDialog } from './interface/create.interface';

@Injectable()
export class DialogRepository {
  constructor(
    @InjectRepository(Dialog) private dialogModel: Repository<Dialog>,
    private userRepository: UserRepository,
    private messageRepository: MessageRepository,
  ) {}

  async create(data: ICreateDialog): Promise<IFindDialog> {
    const dialog = await this.findByUsers(data.authorId, data.targetId);
    if (dialog) return dialog;

    const newDialog = await this.dialogModel.create(data);
    await this.dialogModel.save(newDialog);
    return this.getDialogDeps(
      newDialog.authorId,
      newDialog.targetId,
      newDialog.id,
    );
  }

  async findById(id: number): Promise<IFindDialog> {
    const dialog = await this.dialogModel.findOneOrFail(id);
    return this.getDialogDeps(dialog.authorId, dialog.targetId, dialog.id);
  }

  async findByAuthor(authorId: number): Promise<IFindDialog[]> {
    const dialogs = await this.dialogModel.find({ where: { authorId } });

    return Promise.all(
      dialogs.map(async (dialog) => {
        return this.getDialogDeps(dialog.authorId, dialog.targetId, dialog.id);
      }),
    );
  }

  async findByUsers(authorId: number, targetId: number): Promise<IFindDialog> {
    const dialog = await this.dialogModel.findOneOrFail({
      where: { authorId, targetId },
    });

    return this.getDialogDeps(authorId, targetId, dialog.id);
  }

  async setLastMessage(dialogId: number, messageId: number): Promise<Dialog> {
    const dialog = await this.dialogModel.findOneOrFail({
      where: { dialogId },
    });
    dialog.lastMessge = messageId;
    return this.dialogModel.save(dialog);
  }

  async delete(id: number): Promise<Dialog> {
    const dialog = await this.dialogModel.findOneOrFail(id);
    return this.dialogModel.remove(dialog);
  }

  async getDialogDeps(
    authorId: number,
    targetId: number,
    dialogId: number,
  ): Promise<IFindDialog> {
    const author: User = await this.userRepository.getAttributes(
      ['id', 'name', 'photo', 'email'],
      authorId,
    );

    const target: User = await this.userRepository.getAttributes(
      ['id', 'name', 'photo', 'email'],
      targetId,
    );

    const lastMessage: Message = await this.messageRepository.getLastMessage(
      dialogId,
    );

    return { id: dialogId, author, target, lastMessage };
  }
}
