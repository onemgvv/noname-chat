import { Module } from '@nestjs/common';
import { TokenModule } from './app/token/token.module';
import { UserModule } from './app/user/user.module';
import { TopicModule } from './app/topic/topic.module';
import { EliteModule } from './app/elite/elite.module';
import { FilterModule } from './app/filter/filter.module';
import { DialogModule } from './chat/dialog/dialog.module';
import { MessageModule } from './chat/message/message.module';

@Module({
  imports: [
    UserModule,
    TokenModule,
    TopicModule,
    EliteModule,
    FilterModule,
    DialogModule,
    MessageModule,
  ],
  exports: [
    UserModule,
    TokenModule,
    TopicModule,
    EliteModule,
    FilterModule,
    DialogModule,
    MessageModule,
  ],
})
export class DomainModule {}
