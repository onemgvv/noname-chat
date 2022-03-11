import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { DomainModule } from './domain/domain.module';
import { DatabaseModule } from '@database/database.module';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
    PersistenceModule,
    ApiModule,
    DomainModule,
    UtilsModule,
    AuthModule,
  ],
})
export class AppModule {}
