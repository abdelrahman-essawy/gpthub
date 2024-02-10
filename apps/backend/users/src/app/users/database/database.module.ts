import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashingModule } from '@backend/hashing';

import { ConfigModule, ConfigService } from '@backend/config';

import { UserEntity } from '../entities/user.entity';
import { Env, NODE_ENV } from '@backend/utilities';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [UserEntity],
        url: configService.get<string>('USERS_POSTGRES_URL'),
        synchronize: NODE_ENV !== Env.Production,
        keepConnectionAlive: true,
      }),
    }),
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
