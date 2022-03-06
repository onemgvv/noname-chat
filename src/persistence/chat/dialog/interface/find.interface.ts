import { User } from '@persistence/app/user/user.entity';
import { Message } from '@persistence/chat/message/message.entity';

export interface IFindDialog {
  id: number;
  author: User;
  target: User;
  lastMessage?: Message;
}
