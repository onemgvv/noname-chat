import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '@persistence/app/user/user.module';
import { RoleRepositoryModule } from '@persistence/app/role/role.module';
import { TopicRepositoryModule } from '@persistence/app/topic/topic.module';
import { EliteRepositoryModule } from '@persistence/app/elite/elite.module';
import { FilterRepositoryModule } from '@persistence/app/filter/filter.module';
import { DialogRepositoryModule } from '@persistence/chat/dialog/dialog.module';
import { MessageRepositoryModule } from '@persistence/chat/message/message.module';
import { BlacklistRepositoryModule } from '@persistence/app/blacklist/blacklist.module';
import { CHAT_CONNECTION } from '@config/constants';
import { User } from './app/user/user.entity';
import { Role } from './app/role/role.entity';
import { Topic } from './app/topic/topic.entity';
import { Token } from './app/token/token.entity';
import { Elite } from './app/elite/elite.entity';
import { Filter } from './app/filter/filter.entity';
import { Dialog } from './chat/dialog/dialog.entity';
import { Message } from './chat/message/message.entity';
import { BotModule } from './admin/bot/bot.module';
import { CityModule } from './admin/city/city.module';
import { ComplaintModule } from './admin/complaint/complaint.module';
import { PaymentModule } from './admin/payment/payment.module';
import { TariffModule } from './admin/tariff/tariff.module';
import { StoryModule } from './admin/story/story.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Topic,
      Token,
      Elite,
      Filter,
      Blacklist,
    ]),
    TypeOrmModule.forFeature([Dialog, Message], CHAT_CONNECTION),
    UserRepositoryModule,
    TopicRepositoryModule,
    RoleRepositoryModule,
    FilterRepositoryModule,
    EliteRepositoryModule,
    DialogRepositoryModule,
    MessageRepositoryModule,
    BlacklistRepositoryModule,
    BotModule,
    CityModule,
    ComplaintModule,
    PaymentModule,
    TariffModule,
    StoryModule,
  ],
  exports: [
    TypeOrmModule,
    UserRepositoryModule,
    TopicRepositoryModule,
    RoleRepositoryModule,
    FilterRepositoryModule,
    EliteRepositoryModule,
    DialogRepositoryModule,
    MessageRepositoryModule,
    BlacklistRepositoryModule,
  ],
})
export class PersistenceModule {}
