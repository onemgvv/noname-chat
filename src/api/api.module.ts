import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { DomainModule } from './../domain/domain.module';
import { AuthController } from '@api/auth/auth.controller';
import { TopicController } from './app/topic/topic.controller';
import { EliteController } from './app/elite/elite.controller';
import { FilterController } from './app/filter/filter.controller';
import { DialogController } from './chat/dialog/dialog.controller';
import { MessageController } from './chat/message/message.controller';
import { FilestoreController } from './utils/filestore/filestore.controller';
import { UsersController } from './app/user/user.controller';
import { BotController } from './admin/bot/bot.controller';
import { CityController } from './admin/city/city.controller';
import { ComplaintsController } from './admin/complaint/complaint.controller';
import { PaymentController } from './admin/payments/payment.controller';
import { StoryController } from './admin/story/story.controller';
import { TariffsController } from './admin/tariff/tariff.controller';
import { UtilsModule } from '@utils/utils.module';

@Module({
  imports: [DomainModule, AuthModule, UtilsModule],
  controllers: [
    BotController,
    AuthController,
    CityController,
    UsersController,
    TopicController,
    FilterController,
    PaymentController,
    EliteController,
    DialogController,
    TariffsController,
    StoryController,
    MessageController,
    FilestoreController,
    ComplaintsController,
  ],
})
export class ApiModule {}
