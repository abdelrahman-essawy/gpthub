import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoDatabaseService } from './mongo-database.service';
import { Resource, ResourceSchema } from './model/resource.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        user: configService.get<string>('MONGODB_USER'),
        pass: configService.get<string>('MONGODB_PASS'),
        dbName: configService.get<string>('MONGODB_DB'),
      }),
    }),
    MongooseModule.forFeature([
      // {
      //   name: User.name,
      //   schema: UserSchema,
      // },
      {
        name: Resource.name,
        schema: ResourceSchema,
      },
    ]),
  ],
  providers: [MongoDatabaseService],
  exports: [MongoDatabaseService],
})
export class MongoDatabaseServiceModule { }
