import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { HashingModule } from '@backend/hashing';
import { Resource } from '../../../../apps/resources/src/app/entities/resource.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        entities: [Resource],
        username: configService.get<string>('RESOURCES_MONGO_USER'),
        password: configService.get<string>('RESOURCES_MONGO_PASSWORD'),
        database: configService.get<string>('RESOURCES_MONGO_DATABASE'),
        host: configService.get<string>('RESOURCES_MONGO_HOST'),
        port: configService.get<number>('RESOURCES_MONGO_PORT'),
        keepConnectionAlive: true,
        synchronize: true,
        // subscribers: [UserSubscriber],
      }),
    }),
    HashingModule,
  ],
  providers: [
    {
      provide: 'RESOURCES_DATABASE_SERVICE',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Resource),
      inject: [DataSource],
    },
  ],
  exports: ['RESOURCES_DATABASE_SERVICE'],
})
export class ResourcesDatabaseModule {}
