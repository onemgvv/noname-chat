import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { DomainModule } from './domain/domain.module';
import { PersistenceModule } from './persistence/persistence.module';
import { UtilsModule } from './utils/utils.module';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
    ApiModule,
    AuthModule,
    DomainModule,
    PersistenceModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
