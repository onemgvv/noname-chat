import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepositoryModule } from '@persistence/chat/message/message.module';
import { DialogRepositoryModule } from '@persistence/chat/dialog/dialog.module';
import { BlacklistRepositoryModule } from '@persistence/app/blacklist/blacklist.module';
import { EliteRepositoryModule } from '@persistence/app/elite/elite.module';
import { FilterRepositoryModule } from '@persistence/app/filter/filter.module';
import { RoleRepositoryModule } from '@persistence/app/role/role.module';
import { TopicRepositoryModule } from '@persistence/app/topic/topic.module';
import { UserRepositoryModule } from '@persistence/app/user/user.module';
import { Token } from '@persistence/app/token/token.entity';
import { User } from '@persistence/app/user/user.entity';
import { Topic } from '@persistence/app/topic/topic.entity';
import { Role } from '@persistence/app/role/role.entity';
import { Elite } from '@persistence/app/elite/elite.entity';
import { Filter } from '@persistence/app/filter/filter.entity';
import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';
import { Dialog } from '@persistence/chat/dialog/dialog.entity';
import { Message } from '@persistence/chat/message/message.entity';

@Module({
  imports: [
    UserRepositoryModule,
    TopicRepositoryModule,
    RoleRepositoryModule,
    FilterRepositoryModule,
    EliteRepositoryModule,
    BlacklistRepositoryModule,
    DialogRepositoryModule,
    MessageRepositoryModule,
    TypeOrmModule.forFeature(
      [User, Role, Token, Topic, Elite, Filter, Blacklist],
      'default',
    ),
    TypeOrmModule.forFeature([Dialog, Message], 'chat'),
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
  ],
})
export class PersistenceModule {}
