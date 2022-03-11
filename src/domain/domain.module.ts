import { Module } from '@nestjs/common';
import { TokenModule } from './app/token/token.module';
import { UserModule } from './app/user/user.module';
import { TopicModule } from './app/topic/topic.module';
import { EliteModule } from './app/elite/elite.module';
import { FilterModule } from './app/filter/filter.module';
import { DialogModule } from './chat/dialog/dialog.module';
import { MessageModule } from './chat/message/message.module';
import { BotModule } from './admin/bot/bot.module';
import { CityModule } from './admin/city/city.module';
import { ComplaintModule } from './admin/complaint/complaint.module';
import { PaymentModule } from './admin/payment/payment.module';
import { StoryModule } from './admin/story/story.module';
import { TariffModule } from './admin/tariff/tariff.module';
import { CountryModule } from './admin/country/country.module';

@Module({
  imports: [
    BotModule,
    CityModule,
    UserModule,
    TokenModule,
    TopicModule,
    StoryModule,
    EliteModule,
    TariffModule,
    FilterModule,
    DialogModule,
    CountryModule,
    MessageModule,
    PaymentModule,
    ComplaintModule,
  ],
  exports: [
    BotModule,
    CityModule,
    CountryModule,
    UserModule,
    TokenModule,
    TopicModule,
    StoryModule,
    EliteModule,
    TariffModule,
    FilterModule,
    DialogModule,
    MessageModule,
    PaymentModule,
    ComplaintModule,
  ],
})
export class DomainModule {}
