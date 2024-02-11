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
      useFactory: (configService: ConfigService) => {
        const DATABASE_CONFIG = {
          DB: configService.get<string>('USERS_POSTGRES_DB'),
          USER: configService.get<string>('USERS_POSTGRES_USER'),
          PASSWORD: configService.get<string>('USERS_POSTGRES_PASSWORD'),
          HOST: configService.get<string>('USERS_POSTGRES_HOST'),
          PORT: configService.get<number>('USERS_POSTGRES_PORT'),
        };
        return {
          type: 'postgres',
          entities: [UserEntity],
          url: `postgres://${DATABASE_CONFIG.USER}:${DATABASE_CONFIG.PASSWORD}@${DATABASE_CONFIG.HOST}:${DATABASE_CONFIG.PORT}/${DATABASE_CONFIG.DB}`,
          synchronize: NODE_ENV !== Env.Production,
          keepConnectionAlive: true,
        };
      },
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
