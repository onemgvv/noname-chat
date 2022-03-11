import { CityRepositoryModule } from './../../../persistence/admin/city/city.module';
import { BlacklistRepositoryModule } from '@persistence/app/blacklist/blacklist.module';
import { UserRepositoryModule } from '@persistence/app/user/user.module';
import { Module } from '@nestjs/common';
import { UserServiceProvider } from './user.provider';
import { RoleRepositoryModule } from '@persistence/app/role/role.module';

@Module({
  imports: [
    UserRepositoryModule,
    RoleRepositoryModule,
    CityRepositoryModule,
    BlacklistRepositoryModule,
  ],
  providers: [UserServiceProvider],
  exports: [UserServiceProvider],
})
export class UserModule {}
