import { DriverType, StorageModule } from '@codebrew/nestjs-storage';
import { Module } from '@nestjs/common';
import { FilestoreServiceProvider } from './filestore.provider';

@Module({
  imports: [
    StorageModule.forRoot({
      default: 'local',
      disks: {
        local: {
          driver: DriverType.LOCAL,
          config: {
            root: process
              .cwd()
              .replace('/www/noname.fun/back', '/noname.fun/storage'),
          },
        },
      },
    }),
  ],
  providers: [FilestoreServiceProvider],
  exports: [FilestoreServiceProvider],
})
export class FilestoreModule {}
