import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '@persistence/app/user/user.module';
import { RoleRepositoryModule } from '@persistence/app/role/role.module';
import { TopicRepositoryModule } from '@persistence/app/topic/topic.module';
import { EliteRepositoryModule } from '@persistence/app/elite/elite.module';
import { FilterRepositoryModule } from '@persistence/app/filter/filter.module';
import { DialogRepositoryModule } from '@persistence/chat/dialog/dialog.module';
import { MessageRepositoryModule } from '@persistence/chat/message/message.module';
import { BlacklistRepositoryModule } from '@persistence/app/blacklist/blacklist.module';
import { BotRepositoryModule } from './admin/bot/bot.module';
import { CityRepositoryModule } from './admin/city/city.module';
import { ComplaintRepositoryModule } from './admin/complaint/complaint.module';
import { PaymentRepositoryModule } from './admin/payment/payment.module';
import { TariffRepositoryModule } from './admin/tariff/tariff.module';
import { StoryRepositoryModule } from './admin/story/story.module';
import { BotMessagesRepositoryModule } from './admin/bm/bm.module';
import { StoryContentRepositoryModule } from './admin/story-content/story-content.module';
import { CountryRepositoryModule } from './admin/country/country.module';
@Module({
  imports: [
    UserRepositoryModule,
    TopicRepositoryModule,
    RoleRepositoryModule,
    FilterRepositoryModule,
    EliteRepositoryModule,
    DialogRepositoryModule,
    MessageRepositoryModule,
    BlacklistRepositoryModule,
    BotRepositoryModule,
    CityRepositoryModule,
    ComplaintRepositoryModule,
    PaymentRepositoryModule,
    TariffRepositoryModule,
    StoryRepositoryModule,
    BotMessagesRepositoryModule,
    StoryContentRepositoryModule,
    CountryRepositoryModule,
  ],
  exports: [
    UserRepositoryModule,
    TopicRepositoryModule,
    RoleRepositoryModule,
    FilterRepositoryModule,
    EliteRepositoryModule,
    DialogRepositoryModule,
    MessageRepositoryModule,
    BlacklistRepositoryModule,
    BotRepositoryModule,
    CityRepositoryModule,
    ComplaintRepositoryModule,
    PaymentRepositoryModule,
    TariffRepositoryModule,
    StoryRepositoryModule,
    BotMessagesRepositoryModule,
    StoryContentRepositoryModule,
    CountryRepositoryModule,
  ],
})
export class PersistenceModule {}
