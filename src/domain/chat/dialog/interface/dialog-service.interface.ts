import { Dialog as DialogType } from '@domain/chat/dialog/dialog.type';
import { Dialog } from '@persistence/chat/dialog/dialog.entity';
import { IFindDialog } from '@persistence/chat/dialog/interface/find.interface';

export interface IDialogService {
  create(data: Partial<DialogType>): Promise<IFindDialog>;
  findOne(id: number): Promise<IFindDialog>;
  findByAuthor(authorId: number): Promise<IFindDialog[]>;
  findByUsers(authorId: number, targetId: number): Promise<IFindDialog>;
  setLastMessage(dialogId: number, messageId: number): Promise<Dialog>;
  deleteOne(id: number): Promise<Dialog>;
}
