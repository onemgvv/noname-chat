import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class RefreshPassword {
  @ApiProperty({
    type: String,
    description: 'Email address',
    example: 'yourname@example.com',
  })
  @Exclude()
  @IsString()
  @IsNotEmpty()
  email: string;
}
