import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class AppleSignDto {
  @ApiProperty({
    type: String,
    description: 'Email address',
    example: 'apple.example@icloud.com',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Users family name',
    example: 'Ivanov',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  familyName: string;

  @ApiProperty({
    type: String,
    description: 'Users given name',
    example: 'Ivan',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  givenName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  user: string;
}
