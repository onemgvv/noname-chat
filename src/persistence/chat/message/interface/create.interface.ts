export interface ICreateMessage {
  authorId: number;
  targetId: number;
  dialogId: number;
  text: string;
  voice?: string;
  image?: string;
}
