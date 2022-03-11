import {
  DIALOG_NOT_FOUND,
  USER_HAVENT_DIALOGS,
} from '@common/config/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IFindDialog } from './interface/find.interface';
import { EntityRepository, Repository } from 'typeorm';
import { Dialog } from '@persistence/chat/dialog/dialog.entity';
import { Dialog as DialogType } from '@domain/chat/dialog/dialog.type';
import { IDialogRepository } from '@domain/chat/dialog/interface/dialog-repo.interface';
import { Helper } from '@utils/app.helper';

@Injectable()
@EntityRepository(Dialog)
export class DialogRepository
  extends Repository<Dialog>
  implements IDialogRepository
{
  async newDialog(data: Partial<DialogType>): Promise<IFindDialog> {
    const dialog = await this.findByUsers(data.authorId, data.targetId);
    if (dialog) return dialog;

    const newDialog = await this.create(data);
    await this.save(newDialog);
    return Helper.getDialogDeps(
      newDialog.authorId,
      newDialog.targetId,
      newDialog.id,
    );
  }

  async findById(id: number): Promise<IFindDialog> {
    let dialog: Dialog;
    try {
      dialog = await this.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(DIALOG_NOT_FOUND);
    }

    return Helper.getDialogDeps(dialog.authorId, dialog.targetId, dialog.id);
  }

  async findByAuthor(authorId: number): Promise<IFindDialog[]> {
    const dialogs = await this.find({ where: { authorId } });
    if (dialogs.length === 0) throw new NotFoundException(USER_HAVENT_DIALOGS);

    return Promise.all(
      dialogs.map(async (dialog) => {
        return Helper.getDialogDeps(
          dialog.authorId,
          dialog.targetId,
          dialog.id,
        );
      }),
    );
  }

  async findByUsers(authorId: number, targetId: number): Promise<IFindDialog> {
    let dialog: Dialog;
    try {
      dialog = await this.findOneOrFail({
        where: { authorId, targetId },
      });
    } catch (error) {
      throw new NotFoundException(DIALOG_NOT_FOUND);
    }

    return Helper.getDialogDeps(authorId, targetId, dialog.id);
  }

  async setLastMessage(dialogId: number, messageId: number): Promise<Dialog> {
    let dialog: Dialog;
    try {
      dialog = await this.findOneOrFail({
        where: { dialogId },
      });
    } catch (error) {
      throw new NotFoundException(DIALOG_NOT_FOUND);
    }
    dialog.lastMessge = messageId;
    return this.save(dialog);
  }

  async deleteOne(id: number): Promise<Dialog> {
    let dialog: Dialog;
    try {
      dialog = await this.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(DIALOG_NOT_FOUND);
    }
    return this.remove(dialog);
  }
}
