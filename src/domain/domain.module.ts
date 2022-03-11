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
    UserModule,
    TokenModule,
    TopicModule,
    EliteModule,
    FilterModule,
    DialogModule,
    MessageModule,
    BotModule,
    CityModule,
    StoryModule,
    TariffModule,
    PaymentModule,
    CountryModule,
    ComplaintModule,
  ],
  exports: [
    UserModule,
    TokenModule,
    TopicModule,
    EliteModule,
    FilterModule,
    DialogModule,
    MessageModule,
    BotModule,
    CityModule,
    StoryModule,
    TariffModule,
    PaymentModule,
    CountryModule,
    ComplaintModule,
  ],
})
export class DomainModule {}
