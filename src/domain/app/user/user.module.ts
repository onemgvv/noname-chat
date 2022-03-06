import { UserRepositoryModule } from '@persistence/app/user/user.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserServiceProvider } from './user.provider';

@Module({
  imports: [UserRepositoryModule],
  providers: [UserService, UserServiceProvider],
  exports: [UserServiceProvider],
})
export class UserModule {}
