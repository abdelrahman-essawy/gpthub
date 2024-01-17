import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { ResourceEntity } from '../entities/resource.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        name: 'resources-sql',
        entities: [ResourceEntity],
        url: configService.get<string>('RESOURCES_POSTGRES_URL'),
        keepConnectionAlive: true,
        synchronize: true,
        // subscribers: [UserSubscriber],
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        name: 'resources-nosql',
        entities: [ResourceEntity],
        username: configService.get<string>('RESOURCES_MONGO_USER'),
        password: configService.get<string>('RESOURCES_MONGO_PASSWORD'),
        database: configService.get<string>('RESOURCES_MONGO_DATABASE'),
        host: configService.get<string>('RESOURCES_MONGO_HOST'),
        port: configService.get<number>('RESOURCES_MONGO_PORT'),
        // url: configService.get<string>('RESOURCES_MONGO_URL'),
        keepConnectionAlive: true,
        synchronize: true,
        // subscribers: [UserSubscriber],
      }),
    }),
  ],
  providers: [
    {
      provide: 'RESOURCES_DATABASE_SERVICE',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ResourceEntity),
      inject: [DataSource],
    },
  ],
  exports: ['RESOURCES_DATABASE_SERVICE'],
})
export class ResourcesDatabaseModule {}
