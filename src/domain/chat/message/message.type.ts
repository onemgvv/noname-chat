export type Message = {
  id?: number;
  text?: string;
  read: boolean;
  authorId?: number;
  targetId?: number;
  dialogId?: number;
  voice?: string;
  image?: string;
  created_at?: Date;
  updated_at?: Date;
};
