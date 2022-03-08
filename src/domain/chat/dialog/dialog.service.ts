import { IDialogRepository } from '@domain/chat/dialog/interface/dialog-repo.interface';
import { DIALOG_REPO } from '@config/constants';
import { Inject } from '@nestjs/common';
import { Dialog as DialogType } from '@domain/chat/dialog/dialog.type';
import { Injectable } from '@nestjs/common';
import { IFindDialog } from '@persistence/chat/dialog/interface/find.interface';
import { Dialog } from '@persistence/chat/dialog/dialog.entity';
import { IDialogService } from './interface/dialog-service.interface';

const DialogRepo = () => Inject(DIALOG_REPO);

@Injectable()
export class DialogServiceImpl implements IDialogService {
  constructor(@DialogRepo() private dialogRepository: IDialogRepository) {}

  create(data: Partial<DialogType>): Promise<IFindDialog> {
    return this.dialogRepository.newDialog(data);
  }

  findOne(id: number): Promise<IFindDialog> {
    return this.dialogRepository.findById(id);
  }

  findByAuthor(authorId: number): Promise<IFindDialog[]> {
    return this.dialogRepository.findByAuthor(authorId);
  }

  findByUsers(authorId: number, targetId: number): Promise<IFindDialog> {
    return this.dialogRepository.findByUsers(authorId, targetId);
  }

  setLastMessage(dialogId: number, messageId: number): Promise<Dialog> {
    return this.dialogRepository.setLastMessage(dialogId, messageId);
  }

  deleteOne(id: number): Promise<Dialog> {
    return this.dialogRepository.deleteOne(id);
  }
}
