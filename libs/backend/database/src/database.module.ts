import { Module } from '@nestjs/common';
import { PrismaDatabaseService, PrismaDatabaseServiceModule } from './prisma';
import { DatabaseService } from '@core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PrismaDatabaseServiceModule, ConfigModule],
  providers: [
    {
      provide: DatabaseService,
      useFactory(prisma: PrismaDatabaseService, config: ConfigService) {
        return {
          sql: prisma.sql,
          users: TypeOrmModule.forRoot({
            type: 'postgres',
            url: config.get<string>('USERS_POSTGRES_DB'),
            synchronize: true,
          }),
        };
      },
      inject: [PrismaDatabaseService, ConfigService],
    },
  ],
  exports: [
    {
      provide: DatabaseService,
      useFactory(prisma: PrismaDatabaseService) {
        return {
          sql: prisma.sql,
        };
      },
    },
  ],
})
export class DatabaseModule {}
