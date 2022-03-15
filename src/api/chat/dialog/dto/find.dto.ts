import { ApiProperty } from '@nestjs/swagger';
import { User } from '@persistence/app/user/user.entity';
import { Message } from '@persistence/chat/message/message.entity';
import { Exclude, Expose } from 'class-transformer';
import { Equals, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@Exclude()
export class FindDialogDto {
  @ApiProperty({
    type: Number,
    description: 'Dialog id',
    example: 1,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: Number,
    description: 'Dialog author id',
    example: 123,
  })
  @Expose()
  @IsNotEmpty()
  @Equals(User)
  author: User;

  @ApiProperty({
    type: Number,
    description: 'Dialog target id',
    example: 123,
  })
  @Expose()
  @IsNotEmpty()
  @Equals(User)
  target: User;

  @ApiProperty({
    type: Number,
    description: 'Dialog last message id',
    example: 123,
  })
  @Expose()
  @IsOptional()
  @Equals(Message)
  lastMessage?: Message;
}
