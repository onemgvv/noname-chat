import { DatabaseModule } from '@database/database.module';
import { CheckPremiumInterceptor } from '@interceptors/premium.interceptor';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { DomainModule } from './domain/domain.module';
import { PersistenceModule } from './persistence/persistence.module';
import { UtilsModule } from './utils/utils.module';

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
  providers: [
    // {
    //   provide: CheckPremiumInterceptor,
    //   useFactory: () => {
    //     new CheckPremiumInterceptor();
    //   },
    //   inject: [],
    // },
  ],
})
export class AppModule {}
