import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CHAT_CONNECTION } from '@config/constants';
import { DialogRepoProvider } from './dialog.provider';
import { Dialog } from '@persistence/chat/dialog/dialog.entity';
import { UserRepositoryModule } from '@persistence/app/user/user.module';
import { MessageRepositoryModule } from '@persistence/chat/message/message.module';
import { User } from '@persistence/app/user/user.entity';
import { DialogRepository } from './dialog.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Dialog, DialogRepository], CHAT_CONNECTION),
    UserRepositoryModule,
    MessageRepositoryModule,
  ],
  providers: [DialogRepoProvider],
  exports: [DialogRepoProvider],
})
export class DialogRepositoryModule {}
