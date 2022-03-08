import { Dialog } from '@persistence/chat/dialog/dialog.entity';
import { Dialog as DialogType } from '@domain/chat/dialog/dialog.type';
import { IFindDialog } from '@persistence/chat/dialog/interface/find.interface';

export interface IDialogRepository {
  newDialog(data: Partial<DialogType>): Promise<IFindDialog>;
  findById(id: number): Promise<IFindDialog>;
  findByAuthor(authorId: number): Promise<IFindDialog[]>;
  findByUsers(authorId: number, targetId: number): Promise<IFindDialog>;
  setLastMessage(dialogId: number, messageId: number): Promise<Dialog>;
  deleteOne(id: number): Promise<Dialog>;
}
