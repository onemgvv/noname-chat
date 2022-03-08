import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { DomainModule } from './../domain/domain.module';
import { AuthController } from '@api/auth/auth.controller';
import { TopicController } from './app/topic/topic.controller';
import { EliteController } from './app/elite/elite.controller';
import { FilterController } from './app/filter/filter.controller';
import { DialogController } from './chat/dialog/dialog.controller';
import { MessageController } from './chat/message/message.controller';

@Module({
  imports: [DomainModule, AuthModule],
  controllers: [
    AuthController,
    TopicController,
    FilterController,
    EliteController,
    DialogController,
    MessageController,
  ],
})
export class ApiModule {}
