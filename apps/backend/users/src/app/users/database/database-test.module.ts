import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@backend/config';
import { HashingModule } from '@backend/hashing';

import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [UserEntity],
        url: configService.get<string>('USERS_POSTGRES_URL'),
        keepConnectionAlive: true,
        synchronize: true,
      }),
    }),

    ConfigModule,
    HashingModule,
  ],
  providers: [
    {
      provide: 'USERS_DATABASE_SERVICE',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),

      inject: [DataSource],
    },
  ],
  exports: ['USERS_DATABASE_SERVICE'],
})
export class UsersDatabaseModule {}
