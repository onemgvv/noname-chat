import { Module } from '@nestjs/common';
import { DialogRepositoryModule } from '@persistence/chat/dialog/dialog.module';
import { DialogServiceProvider } from './dialog.provider';

@Module({
  imports: [DialogRepositoryModule],
  providers: [DialogServiceProvider],
  exports: [DialogServiceProvider],
})
export class DialogModule {}
