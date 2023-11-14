import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';
import { MongoDatabaseService } from './mongo-database.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  DatabaseServices,
  IMongoDatabaseService,
} from 'src/core/abstracts/services/database-service.abstract';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        user: configService.get('MONGODB_USER'),
        pass: configService.get('MONGODB_PASS'),
        dbName: configService.get('MONGODB_DB'),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [MongoDatabaseService],
  exports: [MongoDatabaseService],
})
export class MongoDatabaseServiceModule { }
