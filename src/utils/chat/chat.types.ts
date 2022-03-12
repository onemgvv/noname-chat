import { User } from '@persistence/app/user/user.entity';
import { IChatUser } from './interface/chat-user.interface';

export type SocketUser = {
  roomId: string;
  user: User | IChatUser;
};

export type SocketDate = {
  today: Date;
  userCreatedAt: Date;
};

export type DialogData = {
  partner: User;
  dialogId: number;
  message?: string;
  photo?: string;
  voice?: string;
};

export type NOT_FOUND = 'NOT_FOUND';

export type PARTNER_FOUND = SocketUser | NOT_FOUND;

export type TypingData = { type: string; socketRoom: string; typingId: string };
