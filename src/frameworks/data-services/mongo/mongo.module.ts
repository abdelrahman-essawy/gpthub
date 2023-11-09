import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';
import { IDatabaseService } from 'src/core/abstracts/data-service.abstract';
import { MongoDatabaseService } from './mongo-data-services.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost:27017/',
        user: 'admin',
        pass: 'pass',
        dbName: 'test',
      }),
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: IDatabaseService,
      useClass: MongoDatabaseService,
    },
  ],
  exports: [
    {
      provide: IDatabaseService,
      useClass: MongoDatabaseService,
    },
  ],
})
export class MongoDatabaseServiceModule {}
