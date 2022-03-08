import { IFindDialog } from './interface/find.interface';
import { Message } from '@persistence/chat/message/message.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Dialog } from '@persistence/chat/dialog/dialog.entity';
import { Inject } from '@nestjs/common';
import { User } from '@persistence/app/user/user.entity';
import { Dialog as DialogType } from '@domain/chat/dialog/dialog.type';
import { IDialogRepository } from '@domain/chat/dialog/interface/dialog-repo.interface';
import { MESSAGE_REPO, USER_REPO } from '@config/constants';
import { IUserRepository } from '@domain/app/user/interface/user-repo.interface';
import { IMessageRepository } from '@domain/chat/message/interface/message-repo.interface';

const UserRepo = () => Inject(USER_REPO);
const MessageRepo = () => Inject(MESSAGE_REPO);

@EntityRepository(Dialog)
export class DialogRepository
  extends Repository<Dialog>
  implements IDialogRepository
{
  constructor(
    @UserRepo() private userRepository: IUserRepository,
    @MessageRepo() private messageRepository: IMessageRepository,
  ) {
    super();
  }

  async newDialog(data: Partial<DialogType>): Promise<IFindDialog> {
    const dialog = await this.findByUsers(data.authorId, data.targetId);
    if (dialog) return dialog;

    const newDialog = await this.create(data);
    await this.save(newDialog);
    return this.getDialogDeps(
      newDialog.authorId,
      newDialog.targetId,
      newDialog.id,
    );
  }

  async findById(id: number): Promise<IFindDialog> {
    const dialog = await this.findOneOrFail(id);
    return this.getDialogDeps(dialog.authorId, dialog.targetId, dialog.id);
  }

  async findByAuthor(authorId: number): Promise<IFindDialog[]> {
    const dialogs = await this.find({ where: { authorId } });

    return Promise.all(
      dialogs.map(async (dialog) => {
        return this.getDialogDeps(dialog.authorId, dialog.targetId, dialog.id);
      }),
    );
  }

  async findByUsers(authorId: number, targetId: number): Promise<IFindDialog> {
    const dialog = await this.findOneOrFail({
      where: { authorId, targetId },
    });

    return this.getDialogDeps(authorId, targetId, dialog.id);
  }

  async setLastMessage(dialogId: number, messageId: number): Promise<Dialog> {
    const dialog = await this.findOneOrFail({
      where: { dialogId },
    });
    dialog.lastMessge = messageId;
    return this.save(dialog);
  }

  async deleteOne(id: number): Promise<Dialog> {
    const dialog = await this.findOneOrFail(id);
    return this.remove(dialog);
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
