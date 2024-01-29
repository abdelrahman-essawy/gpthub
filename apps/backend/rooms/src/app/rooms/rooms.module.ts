import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StrategiesModule } from '@backend/strategies';

import { RoomService } from './services/room.service';
import { RoomsDatabaseModule } from './rooms-db/rooms-db.module';
import { RoomEntity } from './entities/room.entity';
import { RoomResolver } from './resolvers/room.resolver';
import { UserReferenceResolver } from './resolvers/user-refrence.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity]),

    StrategiesModule,

    RoomsDatabaseModule,
  ],
  providers: [RoomResolver, RoomService, UserReferenceResolver],
})
export class RoomModule {}
