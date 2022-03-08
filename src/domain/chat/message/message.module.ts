import { Module } from '@nestjs/common';
import { MessageRepositoryModule } from '@persistence/chat/message/message.module';
import { MessageServiceProvider } from './message.provider';

@Module({
  imports: [MessageRepositoryModule],
  providers: [MessageServiceProvider],
  exports: [MessageServiceProvider],
})
export class MessageModule {}
