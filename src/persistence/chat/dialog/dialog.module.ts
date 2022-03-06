import { Dialog } from '@persistence/chat/dialog/dialog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DialogRepoProvider } from './dialog.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Dialog], 'chat')],
  providers: [DialogRepoProvider],
  exports: [DialogRepoProvider],
})
export class DialogRepositoryModule {}
