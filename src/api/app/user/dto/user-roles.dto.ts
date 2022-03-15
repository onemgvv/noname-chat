import { UserRoles } from '@common/types/user.types';
import { RolesList } from '@enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';

@Exclude()
export class UserRolesRequest {
  @ApiProperty({
    type: String,
    description: 'Users id',
    example: 3,
  })
  @Expose()
  @IsNumber({}, { message: 'Поле userId должно содержать только числа' })
  @IsNotEmpty({ message: 'Id пользователя не должно быть пустым' })
  readonly userId: number;

  @ApiProperty({
    type: String,
    description: 'Users id',
    example: 3,
  })
  @Expose()
  @IsIn([
    RolesList.USER,
    RolesList.PREMIUM,
    RolesList.MODERATOR,
    RolesList.ADMIN,
  ])
  @IsNotEmpty({ message: 'Поле roleName не должно быть пустымы' })
  readonly roleName: UserRoles;
}
