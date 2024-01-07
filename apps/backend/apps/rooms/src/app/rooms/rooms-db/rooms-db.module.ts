import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { RoomEntity } from '../entities/room.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        name: 'rooms-sql',
        entities: [RoomEntity],
        url: configService.get<string>('ROOMS_POSTGRES_URL'),
        keepConnectionAlive: true,
        synchronize: true,
        // subscribers: [UserSubscriber],
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mongodb',
    //     name: 'resources-nosql',
    //     entities: [RoomEntity],
    //     username: configService.get<string>('RESOURCES_MONGO_USER'),
    //     password: configService.get<string>('RESOURCES_MONGO_PASSWORD'),
    //     database: configService.get<string>('RESOURCES_MONGO_DATABASE'),
    //     host: configService.get<string>('RESOURCES_MONGO_HOST'),
    //     port: configService.get<number>('RESOURCES_MONGO_PORT'),
    //     // url: configService.get<string>('RESOURCES_MONGO_URL'),
    //     keepConnectionAlive: true,
    //     synchronize: true,
    //     // subscribers: [UserSubscriber],
    //   }),
    // }),
  ],
  providers: [
    {
      provide: 'ROOMS_DATABASE_SERVICE',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(RoomEntity),
      inject: [DataSource],
    },
  ],
  exports: ['ROOMS_DATABASE_SERVICE'],
})
export class RoomsDatabaseModule {}
