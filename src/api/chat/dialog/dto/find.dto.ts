import { User } from '@persistence/app/user/user.entity';
import { Message } from '@persistence/chat/message/message.entity';
import { Exclude, Expose } from 'class-transformer';
import { Equals, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@Exclude()
export class FindDialogDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsNotEmpty()
  @Equals(User)
  author: User;

  @Expose()
  @IsNotEmpty()
  @Equals(User)
  target: User;

  @Expose()
  @IsOptional()
  @Equals(Message)
  lastMessage?: Message;
}
