import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import {
  User,
  UserSubscriber,
} from '../../../../apps/users/src/app/entities/user.entity';
import { HashingModule } from '@backend/hashing';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [User],
        url: configService.get<string>('USERS_POSTGRES_URL'),
        keepConnectionAlive: true,
        synchronize: true,
        subscribers: [UserSubscriber],
      }),
    }),
    HashingModule,
  ],
  providers: [
    {
      provide: 'USERS_DATABASE_SERVICE',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),

      inject: [DataSource],
    },
  ],
  exports: ['USERS_DATABASE_SERVICE'],
})
export class UsersDatabaseModule {}
