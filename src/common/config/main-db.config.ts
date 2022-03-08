import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { User } from '@persistence/app/user/user.entity';
import { Topic } from '@persistence/app/topic/topic.entity';
import { Token } from '@persistence/app/token/token.entity';
import { Elite } from '@persistence/app/elite/elite.entity';
import { Filter } from '@persistence/app/filter/filter.entity';
import { Role } from '@persistence/app/role/role.entity';
import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';

export class PostgresConfig {
  static getOrmConfig(configService: ConfigService): PostgresConnectionOptions {
    return {
      type: 'postgres',
      database: configService.get('DB_NAME'),
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      entities: [User, Topic, Token, Elite, Filter, Role, Blacklist],
      synchronize: false,
      migrations: ['/src/database/migrations/*.js'],
      cli: {
        migrationsDir: '/src/database/migrations',
      },
    };
  }
}

export const mainDbConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> =>
    PostgresConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
